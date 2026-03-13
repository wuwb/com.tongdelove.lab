import { useState, useEffect } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CANNELS } from '@/shared/ipc'

export interface Assistant {
  id: string
  name: string
  avatar?: string
  icon?: string
  description?: string
  systemPrompt?: string
  knowledgeBaseIds?: string[]
  defaultModel?: string
  temperature?: number
  topP?: number
  contextWindow?: number
  maxTokens?: number
  streamingEnabled?: boolean
  toolCallMethod?: 'function' | 'prompt'
  customParameters?: any[]
  mcpServerMode?: 'disabled' | 'auto' | 'manual'
  quickPhrases?: any[]
  globalMemoryEnabled?: boolean
  categoryId?: string
  createdAt: number
  updatedAt: number
}

interface UseAssistantsReturn {
  assistants: Assistant[]
  loading: boolean
  error: string | null
  createAssistant: (assistant: Omit<Assistant, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateAssistant: (id: string, updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>) => Promise<void>
  deleteAssistant: (id: string) => Promise<void>
  reload: () => Promise<void>
}

export function useAssistants(): UseAssistantsReturn {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ipc = useIpc()

  useEffect(() => {
    reload()
  }, [])

  const loadAssistants = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ipc.invoke(IPC_CANNELS.DATABASE_ASSISTANTS_GET_ALL)
      setAssistants(result || [])
    } catch (err) {
      console.error('Failed to load assistants:', err)
      setError('加载助手失败')
      setAssistants([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAssistants()
  }, [])

  const createAssistant = async (assistant: Omit<Assistant, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      setError(null)
      const newAssistant = await ipc.invoke(IPC_CANNELS.DATABASE_ASSISTANT_CREATE, assistant)
      setAssistants(prev => [...prev, newAssistant])
    } catch (err) {
      console.error('Failed to create assistant:', err)
      setError('创建助手失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateAssistant = async (id: string, updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>) => {
    try {
      setLoading(true)
      setError(null)
      const success = await ipc.invoke(IPC_CANNELS.DATABASE_ASSISTANT_UPDATE, id, updates)
      if (success) {
        setAssistants(prev =>
          prev.map(assistant =>
            assistant.id === id ? { ...assistant, ...updates, updatedAt: Date.now() } : assistant
          )
        )
      }
    } catch (err) {
      console.error('Failed to update assistant:', err)
      setError('更新助手失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteAssistant = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const success = await ipc.invoke(IPC_CANNELS.DATABASE_ASSISTANT_DELETE, id)
      if (success) {
        setAssistants(prev => prev.filter(assistant => assistant.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete assistant:', err)
      setError('删除助手失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reload = loadAssistants

  return {
    assistants,
    loading,
    error,
    createAssistant,
    updateAssistant,
    deleteAssistant,
    reload
  }
}
