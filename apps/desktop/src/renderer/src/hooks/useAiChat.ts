import { useEffect, useRef, useState } from 'react'
import type { ChatMessage, ChatRequest, ChatChunk } from '../../../shared/ipc'

export function useAiChat(sessionId: string, onFinish?: (content: string) => void) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const fullRef = useRef('')

  useEffect(() => {
    const off = window.ai.onChunk((chunk: ChatChunk) => {
      if (chunk.sessionId !== sessionId) return
      if (chunk.error) {
        setLoading(false)
        // Optionally handle error
        return
      }
      if (chunk.delta) {
        fullRef.current += chunk.delta
        setText(fullRef.current)
      }
      if (chunk.done) {
        setLoading(false)
        if (onFinish) onFinish(fullRef.current)
      }
    })
    return () => off()
  }, [sessionId, onFinish])

  const start = async (model: string, messages: ChatMessage[], provider?: 'mock' | 'openai' | 'ollama', sessionIdOverride?: string) => {
    fullRef.current = ''
    setText('')
    setLoading(true)
    const req: ChatRequest = { sessionId: sessionIdOverride || sessionId, model, messages }
    await window.ai.start({ ...req, provider })
  }

  const cancel = async () => {
    await window.ai.cancel(sessionId)
    setLoading(false)
  }

  return { text, loading, start, cancel }
}