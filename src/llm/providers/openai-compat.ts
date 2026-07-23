import OpenAI from 'openai';
import { LLMProvider, LLMMessage, LLMToolDefinition, LLMResponse, LLMStreamChunk } from '../types';

export class OpenAICompatProvider implements LLMProvider {
  id: string;
  name: string;
  private client: OpenAI;
  private modelId: string;

  constructor(id: string, name: string, baseURL: string, apiKey: string, modelId: string) {
    this.id = id;
    this.name = name;
    this.modelId = modelId;
    this.client = new OpenAI({
      baseURL,
      apiKey: apiKey || 'dummy',
      dangerouslyAllowBrowser: true,
    });
  }

  private convertMessages(messages: LLMMessage[]): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
    return messages.map(msg => {
      if (msg.role === 'tool') {
        return {
          role: 'tool' as const,
          content: msg.content,
          tool_call_id: msg.tool_call_id!,
        };
      }
      if (msg.role === 'assistant' && msg.tool_calls) {
        return {
          role: 'assistant' as const,
          content: msg.content || null,
          tool_calls: msg.tool_calls.map(tc => ({
            id: tc.id,
            type: 'function' as const,
            function: {
              name: tc.function.name,
              arguments: tc.function.arguments,
            },
          })),
        };
      }
      return {
        role: msg.role as 'system' | 'user' | 'assistant',
        content: msg.content,
      };
    });
  }

  private convertTools(tools?: LLMToolDefinition[]): OpenAI.Chat.Completions.ChatCompletionTool[] | undefined {
    if (!tools || tools.length === 0) return undefined;
    return tools.map(tool => ({
      type: 'function' as const,
      function: {
        name: tool.function.name,
        description: tool.function.description,
        parameters: tool.function.parameters,
      },
    }));
  }

  async chat(messages: LLMMessage[], tools?: LLMToolDefinition[]): Promise<LLMResponse> {
    const response = await this.client.chat.completions.create({
      model: this.modelId,
      messages: this.convertMessages(messages),
      tools: this.convertTools(tools),
      max_tokens: 4096,
    });

    const choice = response.choices[0];
    const message = choice.message;

    return {
      content: message.content || '',
      tool_calls: message.tool_calls?.map(tc => ({
        id: tc.id,
        type: 'function' as const,
        function: {
          name: tc.function.name,
          arguments: tc.function.arguments,
        },
      })),
      finish_reason: choice.finish_reason as LLMResponse['finish_reason'],
      usage: response.usage ? {
        prompt_tokens: response.usage.prompt_tokens,
        completion_tokens: response.usage.completion_tokens,
        total_tokens: response.usage.total_tokens,
      } : undefined,
    };
  }

  async *chatStream(messages: LLMMessage[], tools?: LLMToolDefinition[]): AsyncGenerator<LLMStreamChunk> {
    const stream = await this.client.chat.completions.create({
      model: this.modelId,
      messages: this.convertMessages(messages),
      tools: this.convertTools(tools),
      max_tokens: 4096,
      stream: true,
    });

    for await (const chunk of stream) {
      const choice = chunk.choices[0];
      if (!choice) continue;

      const delta = choice.delta;
      const result: LLMStreamChunk = {};

      if (delta.content) {
        result.content = delta.content;
      }

      if (delta.tool_calls) {
        result.tool_calls = delta.tool_calls.map(tc => ({
          id: tc.id,
          type: 'function' as const,
          function: {
            name: tc.function?.name,
            arguments: tc.function?.arguments,
          },
        }));
      }

      if (choice.finish_reason) {
        result.finish_reason = choice.finish_reason as LLMStreamChunk['finish_reason'];
      }

      if (result.content || result.tool_calls || result.finish_reason) {
        yield result;
      }
    }
  }
}
