import { LLMProvider, LLMMessage, LLMToolDefinition, LLMResponse, LLMStreamChunk } from './types';
import { OpenAICompatProvider } from './providers/openai-compat';
import { XYZAIConfig, getProviderById, parseModelString } from '../config/schema';

export class ProviderRegistry {
  private providers: Map<string, LLMProvider> = new Map();

  constructor(config: XYZAIConfig) {
    for (const providerCfg of config.providers) {
      if (providerCfg.apiKey || providerCfg.id === 'mimo') {
        const modelIds = Object.keys(providerCfg.models);
        if (modelIds.length > 0) {
          const defaultModel = modelIds[0];
          const provider = new OpenAICompatProvider(
            providerCfg.id,
            providerCfg.name,
            providerCfg.baseURL,
            providerCfg.apiKey || '',
            defaultModel,
          );
          this.providers.set(providerCfg.id, provider);
        }
      }
    }
  }

  getProvider(providerId: string): LLMProvider | undefined {
    return this.providers.get(providerId);
  }

  get(modelStr: string): { provider: LLMProvider; modelId: string } | undefined {
    const { provider: providerId, model } = parseModelString(modelStr);
    const provider = this.providers.get(providerId);
    if (!provider) return undefined;

    // Create a new provider instance with the specific model
    const config = this.getConfigForProvider(providerId);
    if (!config) return undefined;

    const modelConfig = config.models[model];
    if (!modelConfig) return { provider, modelId: model };

    const specificProvider = new OpenAICompatProvider(
      providerId,
      config.name,
      config.baseURL,
      config.apiKey || '',
      model,
    );

    return { provider: specificProvider, modelId: model };
  }

  private getConfigForProvider(providerId: string) {
    // This is a simplified lookup - in real code, pass config
    return undefined;
  }

  listProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}

export function createProvider(config: XYZAIConfig, providerId: string, modelId: string): LLMProvider | undefined {
  const providerCfg = getProviderById(config, providerId);
  if (!providerCfg) return undefined;

  return new OpenAICompatProvider(
    providerCfg.id,
    providerCfg.name,
    providerCfg.baseURL,
    providerCfg.apiKey || '',
    modelId,
  );
}
