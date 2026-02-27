import { useState, useEffect } from 'react'
import type { Assistant, InsertAssistant, AssistantCategory } from '../../shared/ipc'

export function useAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await (window as any).assistants.getAllAssistants()
      setAssistants(data || [])
    } catch (err) {
      console.error('Failed to load assistants:', err)
      setError('加载助手失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
  }, [])

  const createAssistant = async (assistant: InsertAssistant): Promise<Assistant | null> => {
    try {
      const created = await (window as any).assistants.createAssistant(assistant)
      if (created) {
        setAssistants((prev) => [...prev, created])
        return created
      }
      return null
    } catch (err) {
      console.error('Failed to create assistant:', err)
      throw err
    }
  }

  const updateAssistant = async (
    id: string,
    updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>
  ) => {
    try {
      const success = await (window as any).assistants.updateAssistant(id, updates)
      if (success) {
        setAssistants((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: Date.now() } : a))
        )
        return true
      }
      return false
    } catch (err) {
      console.error('Failed to update assistant:', err)
      throw err
    }
  }

  const deleteAssistant = async (id: string) => {
    try {
      const success = await (window as any).assistants.deleteAssistant(id)
      if (success) {
        setAssistants((prev) => prev.filter((a) => a.id !== id))
        return true
      }
      return false
    } catch (err) {
      console.error('Failed to delete assistant:', err)
      throw err
    }
  }

  const getAssistant = async (id: string): Promise<Assistant | null> => {
    try {
      return await (window as any).assistants.getAssistant(id)
    } catch (err) {
      console.error('Failed to get assistant:', err)
      return null
    }
  }

  return {
    assistants,
    loading,
    error,
    reload,
    createAssistant,
    updateAssistant,
    deleteAssistant,
    getAssistant
  }
}
