import type { ChatChunk, ChatRequest } from '../../../../shared/ipc'
import { store } from '../../../services/store'

export async function* openaiChatStream(req: ChatRequest): AsyncGenerator<ChatChunk> {
  const settings = store.getAll()
  const apiKey = settings.apiKeys.openai
  // Allow overriding base URL if user sets it (e.g. for proxy or compatible API)
  // For now let's assume standard OpenAI or maybe we add baseUrl to settings later.
  // We can treat 'model' as the full model string.
  
  if (!apiKey) {
    yield { sessionId: req.sessionId, delta: '', error: 'OpenAI API Key not found in settings.', done: true }
    return
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: req.model || 'gpt-3.5-turbo',
      messages: req.messages,
      stream: true,
      temperature: req.options?.temperature ?? 0.7,
      top_p: req.options?.top_p ?? 1
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    yield { sessionId: req.sessionId, delta: '', error: `OpenAI Error ${response.status}: ${errorText}`, done: true }
    return
  }

  if (!response.body) {
    yield { sessionId: req.sessionId, delta: '', error: 'No response body from OpenAI', done: true }
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? '' // Keep the incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data: ')) continue
        
        const data = trimmed.slice(6)
        if (data === '[DONE]') continue
        
        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta?.content ?? ''
          if (delta) {
             yield { sessionId: req.sessionId, delta }
          }
        } catch (e) {
          // ignore parse error for partial chunks if any
        }
      }
    }
  } catch (error: any) {
    yield { sessionId: req.sessionId, delta: '', error: error.message, done: true }
  } finally {
    reader.releaseLock()
    yield { sessionId: req.sessionId, delta: '', done: true }
  }
}
