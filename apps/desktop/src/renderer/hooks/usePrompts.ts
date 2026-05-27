import { useState, useEffect } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CHANNELS, type Prompt, type InsertPrompt } from '@/shared/ipc'

interface UsePromptsReturn {
  prompts: Prompt[]
  loading: boolean
  error: string | null
  createPrompt: (prompt: InsertPrompt) => Promise<void>
  updatePrompt: (id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>) => Promise<void>
  deletePrompt: (id: string) => Promise<void>
  movePromptToCategory: (id: string, categoryId: string) => Promise<void>
  reload: () => Promise<void>
}

export function usePrompts(): UsePromptsReturn {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ipc = useIpc()

  const loadPrompts = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ipc.invoke(IPC_CHANNELS.DATABASE_PROMPTS_GET_ALL)
      setPrompts(result || [])
    } catch (err) {
      console.error('Failed to load prompts:', err)
      setError('加载提示词失败')
      setPrompts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPrompts()
  }, [])

  const createPrompt = async (prompt: InsertPrompt) => {
    try {
      setLoading(true)
      setError(null)
      const newPrompt = await ipc.invoke(IPC_CHANNELS.DATABASE_PROMPT_CREATE, prompt)
      setPrompts((prev) => [...prev, newPrompt])
    } catch (err) {
      console.error('Failed to create prompt:', err)
      setError('创建提示词失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePrompt = async (id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>) => {
    try {
      setLoading(true)
      setError(null)
      const success = await ipc.invoke(IPC_CHANNELS.DATABASE_PROMPT_UPDATE, id, updates)
      if (success) {
        setPrompts((prev) =>
          prev.map((prompt) => (prompt.id === id ? { ...prompt, ...updates, updatedAt: Date.now() } : prompt))
        )
      }
    } catch (err) {
      console.error('Failed to update prompt:', err)
      setError('更新提示词失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deletePrompt = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const success = await ipc.invoke(IPC_CHANNELS.DATABASE_PROMPT_DELETE, id)
      if (success) {
        setPrompts((prev) => prev.filter((prompt) => prompt.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete prompt:', err)
      setError('删除提示词失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const movePromptToCategory = async (id: string, categoryId: string) => {
    try {
      setLoading(true)
      setError(null)
      const newCategoryId = categoryId.trim() === '' ? undefined : categoryId
      const success = await ipc.invoke(IPC_CHANNELS.DATABASE_PROMPT_UPDATE, id, {
        categoryId: newCategoryId
      })
      if (success) {
        setPrompts((prev) =>
          prev.map((prompt) =>
            prompt.id === id ? { ...prompt, categoryId: newCategoryId, updatedAt: Date.now() } : prompt
          )
        )
      }
    } catch (err) {
      console.error('Failed to move prompt:', err)
      setError('移动提示词失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const reload = loadPrompts

  return {
    prompts,
    loading,
    error,
    createPrompt,
    updatePrompt,
    deletePrompt,
    movePromptToCategory,
    reload
  }
}
