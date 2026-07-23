export interface LLMMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: LLMToolCall[];
}

export interface LLMToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface LLMToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface LLMResponse {
  content: string;
  tool_calls?: LLMToolCall[];
  finish_reason: 'stop' | 'tool_calls' | 'length';
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface LLMStreamChunk {
  content?: string;
  tool_calls?: Partial<LLMToolCall>[];
  finish_reason?: 'stop' | 'tool_calls' | 'length';
}

export interface LLMProvider {
  id: string;
  name: string;
  chat(messages: LLMMessage[], tools?: LLMToolDefinition[]): Promise<LLMResponse>;
  chatStream(messages: LLMMessage[], tools?: LLMToolDefinition[]): AsyncGenerator<LLMStreamChunk>;
}
