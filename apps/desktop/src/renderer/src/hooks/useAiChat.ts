import { useEffect, useRef, useState } from 'react'
import type { ChatMessage, ChatStreamRequest, ChatChunk, ProviderName } from '../../../shared/ipc'

export function useAiChat(sessionId: string, onFinish?: (content: string) => void) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const fullRef = useRef('')
  const messageAddedRef = useRef(false)

  useEffect(() => {
    const off = window.ai.onChunk((chunk: ChatChunk) => {
      if (chunk.sessionId !== sessionId) return
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
    return () => off()
  }, [sessionId, onFinish])

  const start = async (
    model: string,
    messages: ChatMessage[],
    provider?: ProviderName,
    sessionIdOverride?: string
  ) => {
    fullRef.current = ''
    setText('')
    messageAddedRef.current = false
    setLoading(true)
    const req: ChatStreamRequest = {
      sessionId: sessionIdOverride || sessionId,
      model,
      provider,
      messages
    }
    await window.ai.start(req)
  }

  const cancel = async () => {
    await window.ai.cancel(sessionId)
    setLoading(false)
    messageAddedRef.current = true
  }

  return { text, loading, start, cancel }
}
