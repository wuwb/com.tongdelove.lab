/**
 * Provider Registry - Provider 注册中心
 * 参考 Cherry Studio 的 Provider 工厂模式
 */

import type {
  Provider,
  ProviderConfig,
  ProviderRegistryEntry,
  ChatStreamRequest,
  ChatStreamChunk
} from './types'
import { resolveProviderAlias } from './types'
import { openaiChatStream } from './providers/openai.factory'
import { anthropicChatStream } from './providers/anthropic.factory'
import { googleChatStream } from './providers/google.factory'
import { ollamaChatStream } from './providers/ollama.factory'
import { mockChatStream } from './providers/mock.factory'

// Default configurations for each provider
const DEFAULT_CONFIGS: Record<string, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    apiKey: undefined,
    requiresAuth: true,
    supportsStreaming: true,
    availableModels: [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-4',
      'gpt-3.5-turbo',
      'o1-mini',
      'o1-preview'
    ]
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com',
    apiKey: undefined,
    requiresAuth: true,
    supportsStreaming: true,
    availableModels: [
      'claude-3-7-sonnet-20250219',
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307'
    ]
  },
  google: {
    id: 'google',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: undefined,
    requiresAuth: true,
    supportsStreaming: true,
    availableModels: [
      'gemini-2.5-flash-preview-04-17',
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.0-pro'
    ]
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama',
    baseUrl: 'http://localhost:11434',
    apiKey: undefined,
    requiresAuth: false,
    supportsStreaming: true,
    availableModels: ['llama3.2', 'llama3.1', 'llama2', 'qwen3:8b', 'mistral', 'codellama']
  },
  mock: {
    id: 'mock',
    name: 'Mock',
    baseUrl: undefined,
    apiKey: undefined,
    requiresAuth: false,
    supportsStreaming: true,
    availableModels: ['mock-model']
  }
}

export const PROVIDER_REGISTRY: ProviderRegistryEntry[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    creator: (config) => createProvider('openai', openaiChatStream, config),
    defaultConfig: DEFAULT_CONFIGS.openai
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    creator: (config) => createProvider('anthropic', anthropicChatStream, config),
    defaultConfig: DEFAULT_CONFIGS.anthropic
  },
  {
    id: 'google',
    name: 'Google Gemini',
    creator: (config) => createProvider('google', googleChatStream, config),
    defaultConfig: DEFAULT_CONFIGS.google
  },
  {
    id: 'ollama',
    name: 'Ollama',
    creator: (config) => createProvider('ollama', ollamaChatStream, config),
    defaultConfig: DEFAULT_CONFIGS.ollama
  },
  {
    id: 'mock',
    name: 'Mock',
    creator: (config) => createProvider('mock', mockChatStream, config),
    defaultConfig: DEFAULT_CONFIGS.mock
  }
]

function createProvider(
  providerId: string,
  streamFn: (req: ChatStreamRequest, config: ProviderConfig) => AsyncGenerator<ChatStreamChunk>,
  userConfig?: Partial<ProviderConfig>
): Provider {
  const defaultConfig = DEFAULT_CONFIGS[providerId]
  const config: ProviderConfig = {
    ...defaultConfig,
    ...userConfig
  }

  return {
    name: providerId as any,
    config,
    chatStream: (req: ChatStreamRequest) => streamFn(req, config)
  }
}

/**
 * Get provider configuration by ID
 */
export function getProviderConfig(providerId: string): ProviderConfig | undefined {
  const resolvedId = resolveProviderAlias(providerId)
  return PROVIDER_REGISTRY.find((p) => p.id === resolvedId)?.defaultConfig
}

/**
 * Get available models for a provider
 */
export function getProviderModels(providerId: string): string[] {
  const config = getProviderConfig(providerId)
  return config?.availableModels || []
}

/**
 * Check if provider supports streaming
 */
export function isStreamingSupported(providerId: string): boolean {
  const config = getProviderConfig(providerId)
  return config?.supportsStreaming || false
}

export { resolveProviderAlias }
