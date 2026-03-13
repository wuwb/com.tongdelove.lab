import { useState, useEffect } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CANNELS } from '@/shared/ipc'
import { Plus, Edit2, Trash2, Folder, FolderOpen } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon?: string
  color?: string
  description?: string
  order?: number
  createdAt: number
  updatedAt: number
}

interface CategoriesListProps {
  onSelectCategory?: (category: any) => void
  onEditCategory?: (category: any) => void
  selectedCategoryId?: string
}

export function CategoriesList({ onSelectCategory, onEditCategory, selectedCategoryId }: CategoriesListProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const ipc = useIpc()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await ipc.database.getAllCategories()
      setCategories(result || [])
    } catch (err) {
      console.error('Failed to load categories:', err)
      setError('加载分类失败')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = () => {
    const newCategory: Category = {
      id: `category_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      name: '新分类',
      icon: '📁',
      color: 'gray',
      description: '',
      order: categories.length + 1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    if (onEditCategory) {
      onEditCategory(newCategory)
    }
  }

  const handleDeleteCategory = async (category: any) => {
    if (!confirm(`确定要删除分类 "${category.name}" 吗？`)) {
      return
    }

    try {
      await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORY_DELETE, category.id)
      await loadCategories()
    } catch (err) {
      console.error('Failed to delete category:', err)
      alert('删除分类失败')
    }
  }

  const getColorClass = (color?: string) => {
    const colorMap: Record<string, string> = {
      gray: 'bg-gray-100 text-gray-800 border-gray-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    }
    return colorMap[color || 'gray'] || colorMap.gray
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">分类管理</h3>
        <button
          onClick={handleCreateCategory}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          新建分类
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedCategoryId === category.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => onSelectCategory?.(category)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{category?.icon || '📁'}</span>
                  <h4 className="font-medium text-gray-900 truncate">{category?.name}</h4>
                </div>
                {category?.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColorClass(category?.color)}`}>
                    {category?.color || 'gray'}
                  </span>
                  {category?.order !== undefined && (
                    <span className="text-xs text-gray-500">排序: {category.order}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditCategory?.(category)
                  }}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="编辑分类"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteCategory(category)
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="删除分类"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FolderOpen size={48} className="mx-auto mb-2 opacity-50" />
          <p>还没有任何分类</p>
          <p className="text-sm mt-1">点击上方按钮创建第一个分类</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-2">快速操作</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={loadCategories}
            disabled={loading}
            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            刷新列表
          </button>
          <button
            onClick={handleCreateCategory}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            新建分类
          </button>
        </div>
      </div>
    </div>
  )
}
