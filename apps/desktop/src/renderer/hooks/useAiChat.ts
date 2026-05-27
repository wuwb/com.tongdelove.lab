import { useEffect, useRef, useState } from 'react'
import type { ChatMessage, ChatStreamRequest, ChatChunk, ProviderName } from '@/shared/ipc'

export function useAiChat(conversationId: string, onFinish?: (content: string) => void) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const fullRef = useRef('')
  const messageAddedRef = useRef(false)

  useEffect(() => {
    const off = window.api.ai.onChunk((chunk: ChatChunk) => {
      if (chunk.conversationId !== conversationId) return
      if (chunk.error) {
        setLoading(false)
        return
      }
      if (chunk.delta) {
        fullRef.current += chunk.delta
        setText(fullRef.current)
      }
      if (chunk.done) {
        setLoading(false)
        // Only call onFinish once to prevent duplicate messages
        if (!messageAddedRef.current && onFinish && fullRef.current) {
          messageAddedRef.current = true
          onFinish(fullRef.current)
        }
      }
    })
    return () => {
      off()
    }
  }, [conversationId, onFinish])

  const start = async (
    model: string,
    messages: ChatMessage[],
    provider?: ProviderName,
    conversationIdOverride?: string
  ) => {
    fullRef.current = ''
    setText('')
    messageAddedRef.current = false
    setLoading(true)
    const req: ChatStreamRequest = {
      conversationId: conversationIdOverride || conversationId,
      model,
      provider,
      messages
    }
    await window.ai.start(req)
  }

  const cancel = async () => {
    await window.ai.cancel(conversationId)
    setLoading(false)
    messageAddedRef.current = true
  }

  return { text, loading, start, cancel }
}
