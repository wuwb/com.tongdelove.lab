import type { ChatStreamRequest, ChatStreamChunk, ProviderConfig } from '../types'

export async function* mockChatStream(req: ChatStreamRequest, config: ProviderConfig): AsyncGenerator<ChatStreamChunk> {
  const last = req.messages.at(-1)?.content ?? ''
  const text = `${config.name} (${req.model}): ${last}`

  for (let i = 0; i < text.length; i++) {
    await new Promise((r) => setTimeout(r, 20))
    yield { conversationId: req.conversationId, delta: text[i] }
  }
  yield {
    conversationId: req.conversationId,
    delta: '',
    done: true,
    usage: {
      promptTokens: last.length,
      completionTokens: text.length,
      totalTokens: last.length + text.length
    }
  }
}
