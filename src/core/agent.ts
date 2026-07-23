import { XYZAIConfig, parseModelString } from '../config/schema';
import { createProvider } from '../llm/provider';
import { LLMMessage, LLMToolDefinition, LLMToolCall } from '../llm/types';
import { ToolRegistry, ToolContext, ToolResult } from '../tools/registry';
import { SessionManager, Session } from './session';
import chalk from 'chalk';

const SYSTEM_PROMPT = `You are XYZAI, an AI coding assistant. You help users with software engineering tasks.

You have access to tools for:
- Reading and writing files
- Executing shell commands
- Searching code (grep, glob)
- Fetching web content

When you need to use a tool, respond with a tool_call. Always explain what you're doing before and after using tools.

Be helpful, concise, and accurate. When writing code, follow best practices.`;

export interface AgentCallbacks {
  onThinking?: () => void;
  onToken?: (token: string) => void;
  onToolCall?: (name: string, args: Record<string, unknown>) => void;
  onToolResult?: (name: string, result: ToolResult) => void;
  onPermission?: (tool: string, detail: string) => Promise<boolean>;
  onDone?: (response: string) => void;
  onError?: (error: string) => void;
}

export class Agent {
  private config: XYZAIConfig;
  private toolRegistry: ToolRegistry;
  private sessionManager: SessionManager;
  private session: Session;

  constructor(config: XYZAIConfig) {
    this.config = config;
    this.toolRegistry = new ToolRegistry();
    this.sessionManager = new SessionManager();
    this.session = this.sessionManager.create(config.model);
  }

  getConfig(): XYZAIConfig {
    return this.config;
  }

  setLanguage(lang: 'en' | 'fa'): void {
    this.config.language = lang;
  }

  async chat(userInput: string, callbacks: AgentCallbacks): Promise<void> {
    // Add user message to session
    this.sessionManager.addMessage(this.session, 'user', userInput);

    // Build messages array
    const messages: LLMMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...this.session.messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    // Get provider
    const { provider: providerId, model } = parseModelString(this.config.model);
    const provider = createProvider(this.config, providerId, model);

    if (!provider) {
      callbacks.onError?.(`Provider not found: ${providerId}`);
      return;
    }

    // Get tool definitions
    const toolDefs = this.toolRegistry.getDefinitions() as LLMToolDefinition[];

    let maxIterations = 10;
    while (maxIterations-- > 0) {
      callbacks.onThinking?.();

      try {
        const response = await provider.chat(messages, toolDefs);

        // If there are tool calls, execute them
        if (response.tool_calls && response.tool_calls.length > 0) {
          // Add assistant message with tool calls
          messages.push({
            role: 'assistant',
            content: response.content || '',
            tool_calls: response.tool_calls,
          });

          // Execute each tool call
          for (const toolCall of response.tool_calls) {
            const toolName = toolCall.function.name;
            const toolArgs = JSON.parse(toolCall.function.arguments);

            callbacks.onToolCall?.(toolName, toolArgs);

            // Check permission
            const tool = this.toolRegistry.get(toolName);
            if (tool) {
              const permission = tool.checkPermission(toolArgs, this.config);
              if (permission === 'ask') {
                const allowed = await callbacks.onPermission?.(toolName, JSON.stringify(toolArgs));
                if (!allowed) {
                  const result: ToolResult = { output: '', error: 'Permission denied by user' };
                  messages.push({
                    role: 'tool',
                    content: JSON.stringify(result),
                    tool_call_id: toolCall.id,
                  });
                  callbacks.onToolResult?.(toolName, result);
                  continue;
                }
              } else if (permission === 'deny') {
                const result: ToolResult = { output: '', error: 'Permission denied by config' };
                messages.push({
                  role: 'tool',
                  content: JSON.stringify(result),
                  tool_call_id: toolCall.id,
                });
                callbacks.onToolResult?.(toolName, result);
                continue;
              }
            }

            // Execute tool
            const ctx: ToolContext = {
              workDir: process.cwd(),
              config: this.config,
              askPermission: async () => true,
            };

            let result: ToolResult;
            if (tool) {
              result = await tool.execute(toolArgs, ctx);
            } else {
              result = { output: '', error: `Unknown tool: ${toolName}` };
            }

            callbacks.onToolResult?.(toolName, result);

            // Add tool result to messages
            messages.push({
              role: 'tool',
              content: JSON.stringify(result),
              tool_call_id: toolCall.id,
            });
          }

          // Continue loop for next LLM response
          continue;
        }

        // No tool calls - we have a final response
        const finalContent = response.content || '';
        this.sessionManager.addMessage(this.session, 'assistant', finalContent);
        callbacks.onDone?.(finalContent);
        return;

      } catch (error: any) {
        callbacks.onError?.(error.message || 'Unknown error');
        return;
      }
    }

    callbacks.onError?.('Max iterations reached');
  }

  async chatStream(userInput: string, callbacks: AgentCallbacks): Promise<void> {
    this.sessionManager.addMessage(this.session, 'user', userInput);

    const messages: LLMMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...this.session.messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    const { provider: providerId, model } = parseModelString(this.config.model);
    const provider = createProvider(this.config, providerId, model);

    if (!provider) {
      callbacks.onError?.(`Provider not found: ${providerId}`);
      return;
    }

    const toolDefs = this.toolRegistry.getDefinitions() as LLMToolDefinition[];
    let fullContent = '';
    let toolCalls: LLMToolCall[] = [];

    callbacks.onThinking?.();

    try {
      for await (const chunk of provider.chatStream(messages, toolDefs)) {
        if (chunk.content) {
          fullContent += chunk.content;
          callbacks.onToken?.(chunk.content);
        }
        if (chunk.tool_calls) {
          // Accumulate tool calls
          for (const tc of chunk.tool_calls) {
            const existing = toolCalls.find(t => t.id === tc.id);
            if (existing) {
              if (tc.function?.name) existing.function.name = tc.function.name;
              if (tc.function?.arguments) existing.function.arguments += tc.function.arguments;
            } else if (tc.id) {
              toolCalls.push({
                id: tc.id,
                type: 'function',
                function: {
                  name: tc.function?.name || '',
                  arguments: tc.function?.arguments || '',
                },
              });
            }
          }
        }
      }

      if (toolCalls.length > 0) {
        // Handle tool calls similar to non-streaming
        this.sessionManager.addMessage(this.session, 'assistant', fullContent);
        // For now, just notify about tool calls
        for (const tc of toolCalls) {
          callbacks.onToolCall?.(tc.function.name, JSON.parse(tc.function.arguments || '{}'));
        }
      } else {
        this.sessionManager.addMessage(this.session, 'assistant', fullContent);
        callbacks.onDone?.(fullContent);
      }
    } catch (error: any) {
      callbacks.onError?.(error.message || 'Unknown error');
    }
  }

  getSession(): Session {
    return this.session;
  }

  getSessionManager(): SessionManager {
    return this.sessionManager;
  }

  clearConversation(): void {
    this.sessionManager.clearMessages(this.session);
  }
}
