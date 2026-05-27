import { useState, useEffect, useCallback } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CHANNELS, PromptCategory } from '@/shared/ipc'

export type Category = PromptCategory

export interface CategoryWithChildren extends PromptCategory {
  children?: CategoryWithChildren[]
}

interface UseCategoriesReturn {
  categories: Category[]
  categoryTree: CategoryWithChildren[]
  loading: boolean
  error: string | null
  createCategory: (category: Partial<Category>) => Promise<Category>
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  moveCategory: (id: string, targetParentId: string | null) => Promise<void>
  getCategory: (id: string) => Category | undefined
  refreshCategories: () => Promise<void>
  flattenTree: (tree: CategoryWithChildren[]) => Category[]
}

export function useCategories(): UseCategoriesReturn {
  const ipc = useIpc()

  const [categories, setCategories] = useState<Category[]>([])
  const [categoryTree, setCategoryTree] = useState<CategoryWithChildren[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [listResult, treeResult] = await Promise.all([
        ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORIES_GET_ALL),
        ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORIES_GET_TREE)
      ])
      
      setCategories(listResult || [])
      setCategoryTree(treeResult || [])
    } catch (err) {
      console.error('Failed to load categories:', err)
      setError('加载分类失败')
      setCategories([])
      setCategoryTree([])
    } finally {
      setLoading(false)
    }
  }

  const createCategory = async (category: Partial<Category>): Promise<Category> => {
    try {
      setLoading(true)
      setError(null)
      
      const newCategory = await ipc.invoke(
        IPC_CHANNELS.DATABASE_CATEGORY_CREATE,
        {
          name: category.name || '新建分类',
          icon: category.icon || '📁',
          color: category.color || 'gray',
          description: category.description || '',
          order: category.order ?? 100,
          parentId: category.parentId || null,
        }
      )
      
      await loadCategories()
      return newCategory
    } catch (err) {
      console.error('Failed to create category:', err)
      setError('创建分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    try {
      setLoading(true)
      setError(null)
      
      await ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORY_UPDATE, id, {
        name: updates.name,
        icon: updates.icon,
        color: updates.color,
        description: updates.description,
        order: updates.order,
        parentId: updates.parentId,
      })
      
      await loadCategories()
    } catch (err) {
      console.error('Failed to update category:', err)
      setError('更新分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const moveCategory = async (id: string, targetParentId: string | null) => {
    try {
      setLoading(true)
      setError(null)
      
      await ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORY_MOVE, id, targetParentId)
      await loadCategories()
    } catch (err) {
      console.error('Failed to move category:', err)
      setError('移动分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      await ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORY_DELETE, id)
      await loadCategories()
    } catch (err) {
      console.error('Failed to delete category:', err)
      setError('删除分类失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getCategory = useCallback((id: string): Category | undefined => {
    return categories.find((cat) => cat.id === id)
  }, [categories])

  const flattenTree = useCallback((tree: CategoryWithChildren[]): Category[] => {
    const result: Category[] = []
    
    const traverse = (nodes: CategoryWithChildren[], level: number = 0) => {
      for (const node of nodes) {
        result.push({ ...node, level: node.level || `L${level + 1}` })
        if (node.children && node.children.length > 0) {
          traverse(node.children, level + 1)
        }
      }
    }
    
    traverse(tree)
    return result
  }, [])

  useEffect(() => {
    loadCategories()
  }, [])

  return {
    categories,
    categoryTree,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    moveCategory,
    getCategory,
    refreshCategories: loadCategories,
    flattenTree,
  }
}
