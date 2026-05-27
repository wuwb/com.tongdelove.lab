import { useState, useEffect, useMemo } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CHANNELS, type PromptCategory } from '@/shared/ipc'
import { X, Save, Folder, ChevronRight } from 'lucide-react'

export interface Category extends PromptCategory {
    children?: Category[]
}

export interface CategoryWithChildren extends PromptCategory {
    children?: CategoryWithChildren[]
}

interface CategoryEditorProps {
    category?: Category | null
    isOpen: boolean
    onClose: () => void
    onSave: (category: Partial<Category>) => void
    onDelete?: (category: Category) => void
    allCategories?: CategoryWithChildren[]
    initialParentId?: string | null
}

const AVAILABLE_COLORS = [
    { value: 'gray', label: '灰色', class: 'bg-gray-100 text-gray-800' },
    { value: 'blue', label: '蓝色', class: 'bg-blue-100 text-blue-800' },
    { value: 'green', label: '绿色', class: 'bg-green-100 text-green-800' },
    { value: 'yellow', label: '黄色', class: 'bg-yellow-100 text-yellow-800' },
    { value: 'red', label: '红色', class: 'bg-red-100 text-red-800' },
    { value: 'purple', label: '紫色', class: 'bg-purple-100 text-purple-800' },
    { value: 'pink', label: '粉色', class: 'bg-pink-100 text-pink-800' },
    { value: 'indigo', label: '靛蓝', class: 'bg-indigo-100 text-indigo-800' }
]

const COMMON_ICONS = [
    '📁',
    '💼',
    '🎯',
    '🔧',
    '📚',
    '🎨',
    '🚀',
    '⚡',
    '🤖',
    '🧠',
    '💡',
    '🎪',
    '🎭',
    '🎵',
    '📊',
    '🔍',
    '🛠️',
    '📝',
    '✏️',
    '🗂️',
    '📋',
    '📌',
    '🔖',
    '🏷️'
]

export function CategoryEditor({
    category,
    isOpen,
    onClose,
    onSave,
    onDelete,
    allCategories = [],
    initialParentId
}: CategoryEditorProps) {
    const [formData, setFormData] = useState<any>({
        name: '',
        icon: '📁',
        color: 'gray',
        description: '',
        order: 100,
        parentId: null
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const ipc = useIpc()

    const parentOptions = useMemo(() => {
        const options: { id: string | null; name: string; level: number }[] = [
            { id: null, name: '根目录（无父分类）', level: 0 }
        ]

        const flatten = (nodes: CategoryWithChildren[], level: number = 1) => {
            for (const node of nodes) {
                if (category && node.id === category.id) {
                    continue
                }
                options.push({ id: node.id, name: node.name || '', level })
                if (node.children && node.children.length > 0) {
                    flatten(node.children, level + 1)
                }
            }
        }

        flatten(allCategories)
        return options
    }, [allCategories, category])

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

            const categoryData: Partial<Category> = {
                name: formData.name?.trim(),
                icon: formData.icon,
                color: formData.color,
                description: formData.description?.trim(),
                order: formData.order,
                parentId: formData.parentId || null
            }

            onSave(categoryData)

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

        const hasChildren = category.children && category.children.length > 0

        if (hasChildren) {
            alert(`无法删除分类 "${category.name}"：\n\n该分类包含 ${category.children!.length} 个子分类。\n请先删除或移动所有子分类后再删除此分类。`)
            return
        }

        if (!confirm(`确定要删除分类 "${category.name}" 吗？此操作不可撤销。`)) {
            return
        }

        try {
            setLoading(true)
            await ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORY_DELETE, category.id)
            onDelete(category)
            onClose()
        } catch (err: any) {
            console.error('Failed to delete category:', err)
            alert(`删除分类失败：${err?.message || '未知错误'}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                icon: category.icon || '📁',
                color: category.color || 'gray',
                description: category.description || '',
                order: category.order ?? 100,
                parentId: category.parentId || null
            })
        } else {
            setFormData({
                name: '',
                icon: '📁',
                color: 'gray',
                description: '',
                order: 100,
                parentId: initialParentId || null
            })
        }
        setErrors({})
    }, [category, isOpen, initialParentId])

    if (!isOpen) {
        return null
    }

    const selectedParent = parentOptions.find((p) => p.id === formData.parentId)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                <div className="flex items-center justify-between border-gray-200 border-b p-4">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                            {category ? '编辑分类' : '新建分类'}
                        </h3>
                        {initialParentId && !category && (
                            <span className="rounded bg-blue-100 px-2 py-0.5 text-blue-700 text-xs">
                                创建子分类
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-1 text-gray-400 transition-colors hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div>
                        <label className="mb-1 block font-medium text-gray-700 text-sm">分类名称 *</label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="请输入分类名称"
                            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.name && <p className="mt-1 text-red-600 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium text-gray-700 text-sm">父分类</label>
                        <select
                            value={formData.parentId || ''}
                            onChange={(e) => setFormData({ ...formData, parentId: e.target.value || null })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {parentOptions.map((option) => (
                                <option key={option.id || 'root'} value={option.id || ''}>
                                    {'　'.repeat(Math.max(0, option.level - 1) * 2)}
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        {selectedParent && selectedParent.id !== null && (
                            <p className="mt-1 text-gray-500 text-xs">
                                当前选择: {selectedParent.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block font-medium text-gray-700 text-sm">图标</label>
                        <div className="grid max-h-32 grid-cols-8 gap-2 overflow-y-auto">
                            {COMMON_ICONS.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon })}
                                    className={`rounded-md border p-2 text-lg transition-colors ${formData.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block font-medium text-gray-700 text-sm">颜色主题</label>
                        <div className="grid grid-cols-4 gap-2">
                            {AVAILABLE_COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color: color.value })}
                                    className={`rounded-md border px-3 py-2 font-medium text-sm transition-colors ${formData.color === color.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        } ${color.class}`}>
                                    {color.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block font-medium text-gray-700 text-sm">描述</label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="请输入分类描述（可选）"
                            rows={3}
                            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium text-gray-700 text-sm">排序</label>
                        <input
                            type="number"
                            value={formData.order ?? 100}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    order: parseInt(e.target.value) || 0
                                })
                            }
                            min="0"
                            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.order ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.order && <p className="mt-1 text-red-600 text-sm">{errors.order}</p>}
                    </div>

                    <div className="flex items-center justify-between border-gray-200 border-t pt-4">
                        <div className="flex items-center gap-2">
                            {category && onDelete && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-red-600 text-sm transition-colors hover:bg-red-50 disabled:opacity-50">
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
                                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50 disabled:opacity-50">
                                取消
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !formData.name?.trim()}
                                className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
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
