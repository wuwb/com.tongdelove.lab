import { useState, useEffect, useCallback } from 'react'
import type { Prompt, InsertPrompt } from '@/shared/ipc'

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPrompts()
  }, [])

  const loadPrompts = async () => {
    try {
      setIsLoading(true)
      const dbPrompts = await window.database.getAllPrompts()
      setPrompts(dbPrompts)
    } catch (e) {
      console.error('Failed to load prompts from database', e)
    } finally {
      setIsLoading(false)
    }
  }

  const createPrompt = async (prompt: InsertPrompt): Promise<Prompt | null> => {
    try {
      const newPrompt = await window.database.createPrompt(prompt)
      setPrompts((prev) => [newPrompt, ...prev])
      return newPrompt
    } catch (e) {
      console.error('Failed to create prompt', e)
      return null
    }
  }

  const updatePrompt = async (id: string, updates: Partial<Prompt>): Promise<boolean> => {
    try {
      const { createdAt, ...otherUpdates } = updates
      const success = await window.database.updatePrompt(id, otherUpdates)
      if (success) {
        setPrompts((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...otherUpdates, updatedAt: Date.now() } : a))
        )
      }
      return success
    } catch (e) {
      console.error('Failed to update prompt', id, e)
      return false
    }
  }

  const deletePrompt = async (id: string): Promise<boolean> => {
    try {
      const success = await window.database.deletePrompt(id)
      if (success) {
        setPrompts((prev) => prev.filter((a) => a.id !== id))
      }
      return success
    } catch (e) {
      console.error('Failed to delete prompt', id, e)
      return false
    }
  }

  const getPrompt = useCallback(
    (id: string): Prompt | undefined => {
      return prompts.find((a) => a.id === id)
    },
    [prompts]
  )

  return {
    prompts,
    isLoading,
    loadPrompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    getPrompt
  }
}
