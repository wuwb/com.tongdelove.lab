import { useState, useCallback, useMemo } from 'react'
import { useIpc } from '@/renderer/lib/ipc'
import { IPC_CHANNELS } from '@/shared/ipc'
import { Edit2, Trash2, FolderOpen, ChevronRight, ChevronDown, Folder, FolderPlus, ArrowRight } from 'lucide-react'
import type { PromptCategory } from '@/shared/ipc'

export interface Category extends PromptCategory {
  children?: Category[]
}

export interface CategoryWithChildren extends PromptCategory {
  children?: CategoryWithChildren[]
}

interface CategoriesListProps {
  categories: CategoryWithChildren[]
  loading?: boolean
  onSelectCategory?: (category: Category) => void
  onEditCategory?: (category: Category) => void
  onDeleteCategory?: (category: Category) => void
  onCreateCategory?: (parentId?: string | null) => void
  onMoveCategory?: (category: Category, targetParentId: string | null) => void
  onRefresh?: () => void
  selectedCategoryId?: string
}

export function CategoriesList({
  categories,
  loading = false,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
  onCreateCategory,
  onMoveCategory,
  onRefresh,
  selectedCategoryId
}: CategoriesListProps) {
  const ipc = useIpc()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [movingCategory, setMovingCategory] = useState<Category | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  const toggleExpand = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    const allIds = new Set<string>()
    const collectIds = (nodes: CategoryWithChildren[]) => {
      for (const node of nodes) {
        allIds.add(node.id)
        if (node.children && node.children.length > 0) {
          collectIds(node.children)
        }
      }
    }
    collectIds(categories)
    setExpandedNodes(allIds)
  }, [categories])

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set())
  }, [])

  const handleCreateCategory = (parentId?: string | null) => {
    if (onCreateCategory) {
      onCreateCategory(parentId || null)
    }
  }

  const handleDeleteCategory = async (category: Category, e: React.MouseEvent) => {
    e.stopPropagation()
    
    const hasChildren = category.children && category.children.length > 0
    
    if (hasChildren) {
      alert(`无法删除分类 "${category.name}"：\n\n该分类包含 ${category.children!.length} 个子分类。\n请先删除或移动所有子分类后再删除此分类。`)
      return
    }
    
    if (!confirm(`确定要删除分类 "${category.name}" 吗？此操作不可撤销。`)) {
      return
    }

    if (onDeleteCategory) {
      onDeleteCategory(category)
    } else {
      try {
        await ipc.invoke(IPC_CHANNELS.DATABASE_CATEGORY_DELETE, category.id)
        onRefresh?.()
      } catch (err: any) {
        console.error('Failed to delete category:', err)
        alert(`删除分类失败：${err?.message || '未知错误'}`)
      }
    }
  }

  const handleStartMove = (category: Category, e: React.MouseEvent) => {
    e.stopPropagation()
    setMovingCategory(movingCategory?.id === category.id ? null : category)
  }

  const handleDrop = (targetCategory: Category | null, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (!movingCategory) return
    
    if (movingCategory.id === targetCategory?.id) {
      setMovingCategory(null)
      setDropTargetId(null)
      return
    }
    
    if (targetCategory && isDescendant(movingCategory, targetCategory)) {
      alert('不能将分类移动到其子分类中')
      setMovingCategory(null)
      setDropTargetId(null)
      return
    }
    
    if (onMoveCategory) {
      onMoveCategory(movingCategory, targetCategory?.id || null)
    }
    
    setMovingCategory(null)
    setDropTargetId(null)
  }

  const isDescendant = (ancestor: Category, target: Category): boolean => {
    if (!ancestor.children || ancestor.children.length === 0) return false
    for (const child of ancestor.children) {
      if (child.id === target.id) return true
      if (isDescendant(child, target)) return true
    }
    return false
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
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
    return colorMap[color || 'gray'] || colorMap.gray
  }

  const flattenForMoveOptions = useCallback((nodes: CategoryWithChildren[], excludeId?: string): Category[] => {
    const result: Category[] = []
    const traverse = (items: CategoryWithChildren[], level: number = 0) => {
      for (const item of items) {
        if (excludeId && (item.id === excludeId || isDescendantById(nodes, item.id, excludeId))) {
          continue
        }
        result.push({ ...item, level: item.level || `L${level + 1}` })
        if (item.children && item.children.length > 0) {
          traverse(item.children, level + 1)
        }
      }
    }
    traverse(nodes)
    return result
  }, [])

  const isDescendantById = (nodes: CategoryWithChildren[], nodeId: string, excludeId: string): boolean => {
    const findNode = (items: CategoryWithChildren[], id: string): CategoryWithChildren | null => {
      for (const item of items) {
        if (item.id === id) return item
        if (item.children) {
          const found = findNode(item.children, id)
          if (found) return found
        }
      }
      return null
    }
    
    const node = findNode(nodes, nodeId)
    if (!node || !node.children) return false
    
    const checkChildren = (items: CategoryWithChildren[]): boolean => {
      for (const item of items) {
        if (item.id === excludeId) return true
        if (item.children && checkChildren(item.children)) return true
      }
      return false
    }
    
    return checkChildren(node.children)
  }

  const moveOptions = useMemo(() => {
    if (!movingCategory) return []
    return [
      { id: null, name: '根目录', level: 'L0' },
      ...flattenForMoveOptions(categories, movingCategory.id)
    ]
  }, [movingCategory, categories, flattenForMoveOptions])

  const renderCategoryNode = (category: CategoryWithChildren, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expandedNodes.has(category.id)
    const isSelected = selectedCategoryId === category.id
    const isMoving = movingCategory?.id === category.id
    const isDropTarget = dropTargetId === category.id

    const indentStyle = { paddingLeft: `${level * 20 + 8}px` }

    return (
      <div key={category.id}>
        <div
          className={`cursor-pointer rounded-lg border p-3 transition-all ${
            isSelected
              ? 'border-blue-500 bg-blue-50'
              : isMoving
              ? 'border-yellow-400 bg-yellow-50'
              : isDropTarget
              ? 'border-green-400 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          style={indentStyle}
          onClick={() => onSelectCategory?.(category)}
          onMouseEnter={() => movingCategory && setDropTargetId(category.id)}
          onMouseLeave={() => setDropTargetId(null)}>
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                {hasChildren ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand(category.id)
                    }}
                    className="flex h-5 w-5 items-center justify-center text-gray-400 hover:text-gray-600">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                ) : (
                  <div className="w-5" />
                )}
                
                <span className="text-lg">
                  {category?.icon || (hasChildren ? '📁' : '📄')}
                </span>
                
                <h4 className="truncate font-medium text-gray-900">
                  {category?.name}
                </h4>
                
                {hasChildren && (
                  <span className="text-gray-400 text-xs">
                    ({category.children!.length})
                  </span>
                )}
                
                {isMoving && (
                  <span className="rounded bg-yellow-100 px-2 py-0.5 text-yellow-700 text-xs">
                    移动中
                  </span>
                )}
              </div>
              
              {category?.description && (
                <p className="line-clamp-2 text-gray-600 text-sm" style={{ paddingLeft: '28px' }}>
                  {category.description}
                </p>
              )}
              
              <div className="mt-2 flex items-center gap-2" style={{ paddingLeft: '28px' }}>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-1 font-medium text-xs ${getColorClass(category?.color)}`}>
                  {category?.level || 'L1'}
                </span>
                {category?.order !== undefined && (
                  <span className="text-gray-500 text-xs">
                    排序: {category.order}
                  </span>
                )}
              </div>
            </div>
            
            <div className="ml-2 flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCreateCategory(category.id)
                }}
                className="p-1 text-gray-400 transition-colors hover:text-green-600"
                title="添加子分类">
                <FolderPlus size={14} />
              </button>
              
              <button
                onClick={(e) => handleStartMove(category, e)}
                className={`p-1 transition-colors ${
                  isMoving
                    ? 'text-yellow-600'
                    : 'text-gray-400 hover:text-purple-600'
                }`}
                title="移动分类">
                <ArrowRight size={14} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEditCategory?.(category)
                }}
                className="p-1 text-gray-400 transition-colors hover:text-blue-600"
                title="编辑分类">
                <Edit2 size={14} />
              </button>
              
              <button
                onClick={(e) => handleDeleteCategory(category, e)}
                className="p-1 text-gray-400 transition-colors hover:text-red-600"
                title="删除分类">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {category.children!.map((child) => renderCategoryNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="rounded-md border border-gray-200 px-2 py-1 text-gray-600 text-sm hover:bg-gray-50">
            展开全部
          </button>
          <button
            onClick={collapseAll}
            className="rounded-md border border-gray-200 px-2 py-1 text-gray-600 text-sm hover:bg-gray-50">
            收起全部
          </button>
        </div>
      </div>

      {movingCategory && (
        <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRight size={16} className="text-yellow-600" />
              <span className="text-yellow-700 text-sm">
                正在移动分类: <strong>{movingCategory.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                onChange={(e) => {
                  const targetId = e.target.value || null
                  if (onMoveCategory) {
                    onMoveCategory(movingCategory, targetId)
                  }
                  setMovingCategory(null)
                }}
                defaultValue="">
                <option value="" disabled>
                  选择目标位置...
                </option>
                {moveOptions.map((option) => (
                  <option key={option.id || 'root'} value={option.id || ''}>
                    {'　'.repeat(Math.max(0, (parseInt(option.level?.replace('L', '') || '1') - 1) * 2))}
                    {option.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setMovingCategory(null)
                  setDropTargetId(null)
                }}
                className="text-gray-500 text-sm hover:text-gray-700">
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {categories.length > 0 ? (
          categories.map((category) => renderCategoryNode(category))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <FolderOpen size={48} className="mx-auto mb-2 opacity-50" />
            <p>还没有任何分类</p>
            <p className="mt-1 text-sm">点击上方按钮创建第一个分类</p>
          </div>
        )}
      </div>
    </div>
  )
}
