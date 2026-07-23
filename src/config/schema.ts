import * as fs from 'fs';
import * as path from 'path';
import { getConfigDir, getDataDir, ensureDir } from '../utils/paths';

export interface ProviderConfig {
  id: string;
  name: string;
  baseURL: string;
  apiKey?: string;
  models: Record<string, { name: string; maxTokens?: number; free?: boolean }>;
}

export interface PermissionRule {
  tool: string;
  pattern: string;
  action: 'allow' | 'ask' | 'deny';
}

export interface XYZAIConfig {
  model: string;
  provider: string;
  language: 'en' | 'fa';
  providers: ProviderConfig[];
  permissions: PermissionRule[];
  maxTokens: number;
  temperature: number;
}

const DEFAULT_PROVIDERS: ProviderConfig[] = [
  {
    id: 'mimo',
    name: 'MiMo Auto',
    baseURL: 'https://api.mimo.xiaomi.com/v1',
    models: {
      'mimo-auto': { name: 'MiMo Auto (Free)', free: true, maxTokens: 4096 },
      'mimo-v2.5-pro': { name: 'MiMo V2.5 Pro', free: true, maxTokens: 8192 },
    },
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    baseURL: 'https://api.deepseek.com/v1',
    models: {
      'deepseek-chat': { name: 'DeepSeek Chat', maxTokens: 4096 },
      'deepseek-coder': { name: 'DeepSeek Coder', maxTokens: 4096 },
    },
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai',
    models: {
      'gemini-2.0-flash': { name: 'Gemini 2.0 Flash', free: true, maxTokens: 8192 },
      'gemini-2.5-flash': { name: 'Gemini 2.5 Flash', free: true, maxTokens: 8192 },
    },
  },
  {
    id: 'qwen',
    name: 'Alibaba Qwen',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: {
      'qwen-turbo': { name: 'Qwen Turbo', maxTokens: 4096 },
      'qwen-plus': { name: 'Qwen Plus', maxTokens: 8192 },
    },
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
    models: {
      'meta-llama/llama-3.3-70b-instruct': { name: 'Llama 3.3 70B', free: true, maxTokens: 4096 },
      'mistralai/mistral-7b-instruct': { name: 'Mistral 7B', free: true, maxTokens: 4096 },
    },
  },
];

const DEFAULT_PERMISSIONS: PermissionRule[] = [
  { tool: 'bash', pattern: '*', action: 'ask' },
  { tool: 'bash', pattern: 'git *', action: 'allow' },
  { tool: 'bash', pattern: 'npm *', action: 'allow' },
  { tool: 'bash', pattern: 'npx *', action: 'allow' },
  { tool: 'bash', pattern: 'node *', action: 'allow' },
  { tool: 'bash', pattern: 'rm -rf *', action: 'deny' },
  { tool: 'bash', pattern: 'rm -r *', action: 'deny' },
  { tool: 'bash', pattern: 'format *', action: 'deny' },
  { tool: 'file-write', pattern: '*', action: 'ask' },
  { tool: 'file-read', pattern: '*', action: 'allow' },
  { tool: 'glob', pattern: '*', action: 'allow' },
  { tool: 'grep', pattern: '*', action: 'allow' },
  { tool: 'webfetch', pattern: '*', action: 'allow' },
  { tool: 'websearch', pattern: '*', action: 'allow' },
];

const DEFAULT_CONFIG: XYZAIConfig = {
  model: 'mimo/mimo-auto',
  provider: 'mimo',
  language: 'en',
  providers: DEFAULT_PROVIDERS,
  permissions: DEFAULT_PERMISSIONS,
  maxTokens: 4096,
  temperature: 0.7,
};

export function getConfigPath(): string {
  return path.join(getConfigDir(), 'config.json');
}

export function loadConfig(): XYZAIConfig {
  const configPath = getConfigPath();
  ensureDir(getConfigDir());

  if (fs.existsSync(configPath)) {
    try {
      const raw = fs.readFileSync(configPath, 'utf-8');
      const userConfig = JSON.parse(raw);
      return { ...DEFAULT_CONFIG, ...userConfig };
    } catch {
      return DEFAULT_CONFIG;
    }
  }

  saveConfig(DEFAULT_CONFIG);
  return DEFAULT_CONFIG;
}

export function saveConfig(config: XYZAIConfig): void {
  const configPath = getConfigPath();
  ensureDir(getConfigDir());
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

export function getProviderById(config: XYZAIConfig, providerId: string): ProviderConfig | undefined {
  return config.providers.find(p => p.id === providerId);
}

export function parseModelString(modelStr: string): { provider: string; model: string } {
  const parts = modelStr.split('/');
  if (parts.length >= 2) {
    return { provider: parts[0], model: parts.slice(1).join('/') };
  }
  return { provider: 'mimo', model: modelStr };
}
