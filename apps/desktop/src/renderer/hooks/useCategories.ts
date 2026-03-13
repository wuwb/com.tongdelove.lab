import { useState, useEffect } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CANNELS } from '@/shared/ipc'

export interface Category {
  id?: string
  name?: string
  icon?: string
  color?: string
  description?: string
  order?: number
  createdAt?: number
  updatedAt?: number
}

interface UseCategoriesReturn {
  categories: Category[]
  loading: boolean
  error: string | null
  createCategory: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id' | 'createdAt'>>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  getCategory: (id: string) => Category | undefined
  refreshCategories: () => Promise<void>
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ipc = useIpc()

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORIES_GET_ALL)
      setCategories(result || [])
    } catch (err) {
      console.error('Failed to load categories:', err)
      setError('加载分类失败')
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const createCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      setError(null)
      const newCategory = await ipc.database.createCategory(category)
      setCategories(prev => [...prev, newCategory])
    } catch (err) {
      console.error('Failed to create category:', err)
      setError('创建分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCategory = async (id: string, updates: Partial<Omit<Category, 'id' | 'createdAt'>>) => {
    try {
      setLoading(true)
      setError(null)
      const success = await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORY_UPDATE, id, updates)
      if (success) {
        setCategories(prev =>
          prev.map(cat =>
            cat.id === id ? { ...cat, ...updates, updatedAt: Date.now() } : cat
          )
        )
      }
    } catch (err) {
      console.error('Failed to update category:', err)
      setError('更新分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const success = await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORY_DELETE, id)
      if (success) {
        setCategories(prev => prev.filter(cat => cat.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete category:', err)
      setError('删除分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getCategory = (id: string): Category | undefined => {
    return categories.find(cat => cat.id === id)
  }

  const refreshCategories = loadCategories

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    refreshCategories
  }
}
