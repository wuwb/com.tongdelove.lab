import { useState, useEffect } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CANNELS } from '@/shared/ipc'
import { X, Save, Palette, Folder } from 'lucide-react'

interface Category {
  id?: string
  name?: string
  icon?: string
  color?: string
  description?: string
  order?: number
  createdAt?: number
  updatedAt?: number
}

interface CategoryEditorProps {
  category?: any | null
  isOpen: boolean
  onClose: () => void
  onSave: (category: any) => void
  onDelete?: (category: any) => void
}

const AVAILABLE_COLORS = [
  { value: 'gray', label: '灰色', class: 'bg-gray-100 text-gray-800' },
  { value: 'blue', label: '蓝色', class: 'bg-blue-100 text-blue-800' },
  { value: 'green', label: '绿色', class: 'bg-green-100 text-green-800' },
  { value: 'yellow', label: '黄色', class: 'bg-yellow-100 text-yellow-800' },
  { value: 'red', label: '红色', class: 'bg-red-100 text-red-800' },
  { value: 'purple', label: '紫色', class: 'bg-purple-100 text-purple-800' },
  { value: 'pink', label: '粉色', class: 'bg-pink-100 text-pink-800' },
  { value: 'indigo', label: '靛蓝', class: 'bg-indigo-100 text-indigo-800' },
]

const COMMON_ICONS = [
  '📁', '💼', '🎯', '🔧', '📚', '🎨', '🚀', '⚡',
  '🤖', '🧠', '💡', '🎪', '🎭', '🎵', '📊', '🔍',
  '🛠️', '📝', '✏️', '🗂️', '📋', '📌', '🔖', '🏷️'
]

export function CategoryEditor({ category, isOpen, onClose, onSave, onDelete }: CategoryEditorProps) {
  const [formData, setFormData] = useState<any>({
    name: '',
    icon: '📁',
    color: 'gray',
    description: '',
    order: 100,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const ipc = useIpc()

  useEffect(() => {
    if (category) {
      setFormData(category)
    } else {
      setFormData({
        name: '',
        icon: '📁',
        color: 'gray',
        description: '',
        order: 100,
      })
    }
    setErrors({})
  }, [category, isOpen])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = '分类名称不能为空'
    }

    if (formData.order !== undefined && formData.order < 0) {
      newErrors.order = '排序值必须大于等于0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !formData.name?.trim()) {
      return
    }

    try {
      setLoading(true)

      if (category) {
        // 更新现有分类
        await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORY_UPDATE, category.id, {
          name: formData.name.trim(),
          icon: formData.icon,
          color: formData.color,
          description: formData.description?.trim(),
          order: formData.order,
        })
        onSave({ ...category, ...formData })
      } else {
        // 创建新分类
        const newCategory = {
          id: `category_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
          name: formData.name!.trim(),
          icon: formData.icon!,
          color: formData.color!,
          description: formData.description?.trim() || undefined,
          order: formData.order,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
        await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORY_CREATE, newCategory)
        onSave(newCategory)
      }

      onClose()
    } catch (err) {
      console.error('Failed to save category:', err)
      alert('保存分类失败')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!category || !onDelete) return

    if (!confirm(`确定要删除分类 "${category.name}" 吗？此操作不可撤销。`)) {
      return
    }

    try {
      setLoading(true)
      await ipc.invoke(IPC_CANNELS.DATABASE_CATEGORY_DELETE, category.id)
      onDelete(category)
      onClose()
    } catch (err) {
      console.error('Failed to delete category:', err)
      alert('删除分类失败')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {category ? '编辑分类' : '新建分类'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分类名称 *
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="请输入分类名称"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              图标
            </label>
            <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto">
              {COMMON_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-2 text-lg rounded-md border transition-colors ${
                    formData.icon === icon
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              颜色主题
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                    formData.color === color.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${color.class}`}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="请输入分类描述（可选）"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              排序
            </label>
            <input
              type="number"
              value={formData.order || 100}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.order ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.order && (
              <p className="mt-1 text-sm text-red-600">{errors.order}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              {category && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <Folder size={16} />
                  删除
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={loading || !formData.name?.trim()}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                {loading ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}