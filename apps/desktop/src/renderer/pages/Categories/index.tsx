import { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { CategoriesList } from '../../components/category/CategoriesList'
import { CategoryEditor } from '../../components/category/CategoryEditor'
import type { Category, CategoryWithChildren } from '../../hooks/useCategories'

export function CategoriesPage() {
  const {
    categoryTree,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    moveCategory,
    refreshCategories,
  } = useCategories()

  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [initialParentId, setInitialParentId] = useState<string | null>(null)

  const handleCreateCategory = (parentId?: string | null) => {
    setEditingCategory(null)
    setInitialParentId(parentId || null)
    setIsEditorOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setInitialParentId(category.parentId || null)
    setIsEditorOpen(true)
  }

  const handleSaveCategory = async (category: Partial<Category>) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, category)
      } else {
        await createCategory(category)
      }
      setIsEditorOpen(false)
      setEditingCategory(null)
      setInitialParentId(null)
    } catch (err) {
      console.error('Failed to save category:', err)
    }
  }

  const handleDeleteCategory = async (category: Category) => {
    try {
      await deleteCategory(category.id)
      if (editingCategory?.id === category.id) {
        setEditingCategory(null)
        setIsEditorOpen(false)
      }
    } catch (err) {
      console.error('Failed to delete category:', err)
    }
  }

  const handleMoveCategory = async (category: Category, targetParentId: string | null) => {
    try {
      await moveCategory(category.id, targetParentId)
    } catch (err) {
      console.error('Failed to move category:', err)
    }
  }

  return (
    <div className="h-full bg-white p-6 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-2xl text-gray-900 dark:text-white">分类管理</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refreshCategories}
            disabled={loading}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
          >
            刷新
          </button>
          <button
            onClick={() => handleCreateCategory(null)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            新建分类
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="flex h-[calc(100%-80px)] gap-6">
        <div className="min-w-[350px] max-w-[450px] flex-1">
          <CategoriesList
            categories={categoryTree as CategoryWithChildren[]}
            loading={loading}
            onSelectCategory={(category) => setEditingCategory(category)}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onCreateCategory={handleCreateCategory}
            onMoveCategory={handleMoveCategory}
            onRefresh={refreshCategories}
            selectedCategoryId={editingCategory?.id}
          />
        </div>

        <div className="min-w-[400px] flex-2">
          {editingCategory ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:bg-gray-800">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                    {editingCategory.icon || '📁'}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-xl dark:text-white">
                      {editingCategory.name}
                    </h2>
                    <div className="mt-1 flex gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${
                          editingCategory.color === 'blue'
                            ? 'bg-blue-100 text-blue-800'
                            : editingCategory.color === 'green'
                              ? 'bg-green-100 text-green-800'
                              : editingCategory.color === 'yellow'
                                ? 'bg-yellow-100 text-yellow-800'
                                : editingCategory.color === 'red'
                                  ? 'bg-red-100 text-red-800'
                                  : editingCategory.color === 'purple'
                                    ? 'bg-purple-100 text-purple-800'
                                    : editingCategory.color === 'pink'
                                      ? 'bg-pink-100 text-pink-800'
                                      : editingCategory.color === 'indigo'
                                        ? 'bg-indigo-100 text-indigo-800'
                                        : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {editingCategory.color || 'gray'}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700 text-xs">
                        {editingCategory.level || 'L1'}
                      </span>
                      {editingCategory.order !== undefined && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700 text-xs">
                          排序: {editingCategory.order}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                    title="编辑分类"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(editingCategory)}
                    className="rounded-md p-2 text-red-600 hover:bg-red-50"
                    title="删除分类"
                  >
                    删除
                  </button>
                </div>
              </div>

              {editingCategory.description && (
                <div className="mb-4">
                  <h3 className="mb-2 font-medium text-gray-700 text-sm">描述</h3>
                  <p className="rounded-md bg-gray-50 p-3 text-gray-600">
                    {editingCategory.description}
                  </p>
                </div>
              )}

              {editingCategory.parentId && (
                <div className="mb-4">
                  <h3 className="mb-2 font-medium text-gray-700 text-sm">父分类</h3>
                  <p className="text-gray-600">{editingCategory.parentId}</p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="mb-2 font-medium text-gray-700 text-sm">创建时间</h3>
                <p className="text-gray-600">
                  {new Date(editingCategory.createdAt).toLocaleString()}
                </p>
              </div>

              {editingCategory.updatedAt > editingCategory.createdAt && (
                <div className="mb-4">
                  <h3 className="mb-2 font-medium text-gray-700 text-sm">更新时间</h3>
                  <p className="text-gray-600">
                    {new Date(editingCategory.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}

              <hr className="my-4" />

              <div>
                <h3 className="mb-3 font-medium text-gray-700 text-sm">使用统计</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">分类ID</span>
                    <span className="font-mono text-gray-500 text-xs">{editingCategory.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">图标</span>
                    <span className="text-sm">{editingCategory.icon || '📁'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">颜色主题</span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        editingCategory.color === 'blue'
                          ? 'bg-blue-100 text-blue-800'
                          : editingCategory.color === 'green'
                            ? 'bg-green-100 text-green-800'
                            : editingCategory.color === 'yellow'
                              ? 'bg-yellow-100 text-yellow-800'
                              : editingCategory.color === 'red'
                                ? 'bg-red-100 text-red-800'
                                : editingCategory.color === 'purple'
                                  ? 'bg-purple-100 text-purple-800'
                                  : editingCategory.color === 'pink'
                                    ? 'bg-pink-100 text-pink-800'
                                    : editingCategory.color === 'indigo'
                                      ? 'bg-indigo-100 text-indigo-800'
                                      : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {editingCategory.color || 'gray'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border-2 border-gray-300 border-dashed">
              <div className="text-center">
                <div className="mb-4 text-6xl">📁</div>
                <h3 className="mb-2 font-medium text-gray-900 text-lg">选择一个分类查看详情</h3>
                <p className="text-gray-500">或者创建一个新的分类开始管理你的助手</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <CategoryEditor
        category={editingCategory}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false)
          setEditingCategory(null)
          setInitialParentId(null)
        }}
        onSave={handleSaveCategory}
        onDelete={editingCategory ? handleDeleteCategory : undefined}
        allCategories={categoryTree as CategoryWithChildren[]}
        initialParentId={initialParentId}
      />
    </div>
  )
}
