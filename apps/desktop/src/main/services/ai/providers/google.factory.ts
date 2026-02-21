import type { ChatStreamRequest, ChatStreamChunk, ProviderConfig } from '../types'
import { store } from '../../../services/store'

export async function* googleChatStream(
  req: ChatStreamRequest,
  config: ProviderConfig
): AsyncGenerator<ChatStreamChunk> {
  const settings = store.getAll()
  const apiKey = config.apiKey || settings.apiKeys.google
  const baseUrl = config.baseUrl || 'https://generativelanguage.googleapis.com/v1beta'

  if (!apiKey && config.requiresAuth) {
    yield {
      sessionId: req.sessionId,
      delta: '',
      error: `${config.name} API Key not found in settings.`,
      done: true
    }
    return
  }

  const response = await fetch(
    `${baseUrl}/models/${req.model}:streamGenerateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: req.messages.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          temperature: req.options?.temperature ?? 0.7,
          topP: req.options?.top_p ?? 1,
          topK: req.options?.top_k,
          maxOutputTokens: req.options?.max_tokens
        }
      })
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    yield {
      sessionId: req.sessionId,
      delta: '',
      error: `${config.name} Error ${response.status}: ${errorText}`,
      done: true
    }
    return
  }

  if (!response.body) {
    yield {
      sessionId: req.sessionId,
      delta: '',
      error: 'No response body from API',
      done: true
    }
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
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data: ')) continue

        const data = trimmed.slice(6)
        if (data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data)
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            yield { sessionId: req.sessionId, delta: text }
          }
        } catch (e) {}
      }
    }
  } catch (error: any) {
    yield {
      sessionId: req.sessionId,
      delta: '',
      error: error.message,
      done: true
    }
  } finally {
    reader.releaseLock()
    yield { sessionId: req.sessionId, delta: '', done: true }
  }
}
