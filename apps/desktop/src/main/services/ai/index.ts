/**
 * AI Provider System Main Entry
 * 统一的 LLM Provider 抽象层 - 参考 Cherry Studio 架构
 */

import type { ChatStreamRequest, ChatStreamChunk, ProviderName } from './types'
import { PROVIDER_REGISTRY, getProviderConfig, resolveProviderAlias } from './registry'

export { resolveProviderAlias }
export { getProviderConfig, getProviderModels, isStreamingSupported } from './registry'

export type { ProviderName } from './types'
export type { ChatStreamRequest, ChatStreamChunk, ProviderConfig } from './types'

export function createChatStream(
  provider: ProviderName,
  req: ChatStreamRequest
): AsyncGenerator<ChatStreamChunk> {
  const resolvedProvider = resolveProviderAlias(provider)
  const config = getProviderConfig(resolvedProvider)

  if (!config) {
    return (async function* () {
      yield {
        conversationId: req.conversationId,
        delta: '',
        error: `Unknown provider: ${provider}`,
        done: true
      }
    })()
  }

  const entry = PROVIDER_REGISTRY.find((p) => p.id === resolvedProvider)
  if (!entry) {
    return (async function* () {
      yield {
        conversationId: req.conversationId,
        delta: '',
        error: `Provider not registered: ${resolvedProvider}`,
        done: true
      }
    })()
  }

  const providerInstance = entry.creator({
    ...config,
    apiKey: undefined,
    baseUrl: config.baseUrl
  })

  return providerInstance.chatStream(req)
}
