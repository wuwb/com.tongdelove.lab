import type { ChatStreamRequest, ChatStreamChunk, ProviderConfig } from '../types'
import { store } from '../../../services/store'

export async function* ollamaChatStream(
  req: ChatStreamRequest,
  config: ProviderConfig
): AsyncGenerator<ChatStreamChunk> {
  const settings = store.getAll()
  const baseUrl = config.baseUrl || settings.providers.ollama?.baseUrl || 'http://localhost:11434'
  const model = req.model || 'llama3.2'

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: req.messages,
        stream: true,
        options: {
          temperature: req.options?.temperature ?? 0.7,
          top_p: req.options?.top_p ?? 1,
          num_predict: req.options?.max_tokens || 2048
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      yield {
        conversationId: req.conversationId,
        delta: '',
        error: `Ollama Error ${response.status}: ${errorText}. Please ensure Ollama is running.`,
        done: true
      }
      return
    }

    if (!response.body) {
      yield {
        conversationId: req.conversationId,
        delta: '',
        error: 'No response body from Ollama',
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
          if (!trimmed) continue

          try {
            const parsed = JSON.parse(trimmed)
            const content = parsed.message?.content
            if (content && parsed.done === false) {
              yield { conversationId: req.conversationId, delta: content }
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
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      yield {
        conversationId: req.conversationId,
        delta: '',
        error: `Cannot connect to Ollama at ${baseUrl}. Please ensure Ollama is installed and running.`,
        done: true
      }
    } else {
      yield {
        conversationId: req.conversationId,
        delta: '',
        error: error.message,
        done: true
      }
    }
  }
}
