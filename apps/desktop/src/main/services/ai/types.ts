/**
 * Provider System - 统一的 LLM Provider 抽象层
 * 参考 Cherry Studio 的架构设计
 */

import type { ChatMessage } from '@/shared/ipc'

// Provider 标识符
export type ProviderName = 'openai' | 'anthropic' | 'google' | 'ollama' | 'mock'

// Provider 配置选项
export interface ProviderConfig {
  id: ProviderName
  name: string
  baseUrl?: string
  apiKey?: string
  requiresAuth: boolean
  supportsStreaming: boolean
  availableModels: string[]
}

// Provider 创建接口
export interface Provider {
  name: ProviderName
  config: ProviderConfig
  chatStream: (req: ChatStreamRequest) => AsyncGenerator<ChatStreamChunk>
}

// 聊天请求
export interface ChatStreamRequest {
  conversationId: string
  model: string
  messages: ChatMessage[]
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    max_tokens?: number
    [key: string]: any
  }
}

// 聊天响应分块
export interface ChatStreamChunk {
  conversationId: string
  delta: string
  done?: boolean
  error?: string
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
  }
}

// Provider 工厂函数
export type ProviderCreator = (config: Partial<ProviderConfig>) => Provider

// Provider 注册表项
export interface ProviderRegistryEntry {
  id: ProviderName
  name: string
  creator: ProviderCreator
  defaultConfig: ProviderConfig
  configSchema?: any // Zod schema 或类似验证
}

// 静态 Provider 映射（处理别名）
export const PROVIDER_ALIASES: Record<string, ProviderName> = {
  claude: 'anthropic',
  gemini: 'google',
  llama: 'ollama',
  mistral: 'openai', // 可以通过 baseUrl 配置
  azure: 'openai'
}

export function resolveProviderAlias(alias: string): ProviderName {
  const normalized = alias.toLowerCase().trim()
  return PROVIDER_ALIASES[normalized] || (normalized as ProviderName)
}
