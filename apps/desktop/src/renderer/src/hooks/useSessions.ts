import { useState, useEffect, useCallback } from 'react'
import type { Session, CreateSessionParams } from '../types/chat'
import type { ChatMessage } from '../../../shared/ipc'

const STORAGE_KEY = 'chat_sessions_v1'

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setSessions(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse sessions', e)
      }
    }
  }, [])

  const saveSessions = useCallback((newSessions: Session[]) => {
    setSessions(newSessions)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions))
  }, [])

  const createSession = (params: CreateSessionParams) => {
    const newSession: Session = {
      id: Math.random().toString(36).slice(2, 10),
      title: 'New Chat',
      model: params.model,
      provider: params.provider,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const newSessions = [newSession, ...sessions]
    saveSessions(newSessions)
    setActiveSessionId(newSession.id)
    return newSession.id
  }

  const deleteSession = (id: string) => {
    const newSessions = sessions.filter(s => s.id !== id)
    saveSessions(newSessions)
    if (activeSessionId === id) {
      setActiveSessionId(null)
    }
  }

  const updateSession = (id: string, updates: Partial<Session>) => {
    const newSessions = sessions.map(s => (s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s))
    saveSessions(newSessions)
  }

  const addMessage = (sessionId: string, message: ChatMessage) => {
    const session = sessions.find(s => s.id === sessionId)
    if (!session) return

    const newMessages = [...session.messages, message]
    // Update title if it's the first user message
    let title = session.title
    if (session.messages.length === 0 && message.role === 'user') {
      title = message.content.slice(0, 30)
    }

    updateSession(sessionId, { messages: newMessages, title })
  }

  const activeSession = sessions.find(s => s.id === activeSessionId)

  return {
    sessions,
    activeSessionId,
    activeSession,
    setActiveSessionId,
    createSession,
    deleteSession,
    updateSession,
    addMessage
  }
}
