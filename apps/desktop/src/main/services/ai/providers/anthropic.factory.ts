import type { ChatStreamRequest, ChatStreamChunk, ProviderConfig } from '../types'
import { store } from '../../../services/store'

export async function* anthropicChatStream(
  req: ChatStreamRequest,
  config: ProviderConfig
): AsyncGenerator<ChatStreamChunk> {
  const settings = store.getAll()
  const apiKey = config.apiKey || settings.apiKeys.anthropic
  const baseUrl = config.baseUrl || 'https://api.anthropic.com'

  if (!apiKey && config.requiresAuth) {
    yield {
      conversationId: req.conversationId,
      delta: '',
      error: `${config.name} API Key not found in settings.`,
      done: true
    }
    return
  }

  const response = await fetch(`${baseUrl}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey || '',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: req.model || 'claude-3-5-sonnet-20241022',
      messages: req.messages,
      stream: true,
      max_tokens: req.options?.max_tokens || 4096,
      temperature: req.options?.temperature ?? 0.7,
      top_p: req.options?.top_p ?? 1
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
          if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
            yield {
              conversationId: req.conversationId,
              delta: parsed.delta.text
            }
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
