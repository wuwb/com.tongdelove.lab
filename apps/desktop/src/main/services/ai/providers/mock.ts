import type { ChatChunk, ChatRequest } from '../../../../shared/ipc'

export async function* mockChatStream(req: ChatRequest): AsyncGenerator<ChatChunk> {
  const last = req.messages.at(-1)?.content ?? ''
  const text = `Echo(${req.model}): ${last}`
  for (let i = 0; i < text.length; i++) {
    await new Promise((r) => setTimeout(r, 10))
    yield { sessionId: req.sessionId, delta: text[i] }
  }
  yield { sessionId: req.sessionId, delta: '', done: true, usage: { totalTokens: text.length } }
}