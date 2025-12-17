import type { ChatRequest } from '../../../shared/ipc'
import { mockChatStream } from './providers/mock'
import { openaiChatStream } from './providers/openai'

type ProviderName = 'mock' | 'openai' | 'ollama'

export function createChatStream(provider: ProviderName, req: ChatRequest) {
  if (provider === 'openai') return openaiChatStream(req)
  // TODO: add ollamaChatStream
  return mockChatStream(req)
}