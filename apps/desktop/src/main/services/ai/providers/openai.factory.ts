import type { ChatStreamRequest, ChatStreamChunk, ProviderConfig } from '../types'
import { store } from '../../../services/store'

export async function* openaiChatStream(
  req: ChatStreamRequest,
  config: ProviderConfig
): AsyncGenerator<ChatStreamChunk> {
  const settings = store.getAll()
  const apiKey = config.apiKey || settings.apiKeys.openai
  const baseUrl = config.baseUrl || 'https://api.openai.com/v1'

  if (!apiKey && config.requiresAuth) {
    yield {
      conversationId: req.conversationId,
      delta: '',
      error: `${config.name} API Key not found in settings.`,
      done: true
    }
    return
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey && { Authorization: `Bearer ${apiKey}` })
    },
    body: JSON.stringify({
      model: req.model || 'gpt-3.5-turbo',
      messages: req.messages,
      stream: true,
      temperature: req.options?.temperature ?? 0.7,
      top_p: req.options?.top_p ?? 1,
      max_tokens: req.options?.max_tokens
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    yield {
      conversationId: req.conversationId,
      delta: '',
      error: `${config.name} Error ${response.status}: ${errorText}`,
      done: true
    }
    return
  }

  if (!response.body) {
    yield {
      conversationId: req.conversationId,
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
          const delta = parsed.choices?.[0]?.delta?.content ?? ''
          if (delta) {
            yield { conversationId: req.conversationId, delta }
          }
        } catch (e) {}
      }
    }
  } catch (error: any) {
    yield {
      conversationId: req.conversationId,
      delta: '',
      error: error.message,
      done: true
    }
  } finally {
    reader.releaseLock()
    yield { conversationId: req.conversationId, delta: '', done: true }
  }
}
