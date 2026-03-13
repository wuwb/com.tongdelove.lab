import { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import { CategoriesList } from '../../components/category/CategoriesList'
import { CategoryEditor } from '../../components/category/CategoryEditor'

export function CategoriesPage() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory, refreshCategories } = useCategories()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const handleCreateCategory = () => {
    setEditingCategory(null)
    setIsEditorOpen(true)
  }

  const handleEditCategory = (category: any) => {
    setEditingCategory(category)
    setIsEditorOpen(true)
  }

  const handleSaveCategory = async (category: any) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, category)
      } else {
        await createCategory(category)
      }
      setIsEditorOpen(false)
      setEditingCategory(null)
    } catch (err) {
      console.error('Failed to save category:', err)
    }
  }

  const handleDeleteCategory = async (category: any) => {
    try {
      await deleteCategory(category.id)
    } catch (err) {
      console.error('Failed to delete category:', err)
    }
  }

  return (
    <div className="p-6 h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            📁
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">分类管理</h1>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {categories.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refreshCategories}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            刷新
          </button>
          <button
            onClick={handleCreateCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            新建分类
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100%-80px)]">
        {/* Left Sidebar - Categories List */}
        <div className="flex-1 min-w-[300px] max-w-[400px]">
          <CategoriesList
            onSelectCategory={(category) => console.log('Selected category:', category)}
            onEditCategory={handleEditCategory}
            selectedCategoryId={editingCategory?.id}
          />
        </div>

        {/* Right Panel - Category Details */}
        <div className="flex-2 min-w-[400px]">
          {editingCategory ? (
            // Category Details View
            <div className="border border-gray-200 rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                    {editingCategory.icon || '📁'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {editingCategory.name}
                    </h2>
                    <div className="flex gap-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        editingCategory.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        editingCategory.color === 'green' ? 'bg-green-100 text-green-800' :
                        editingCategory.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        editingCategory.color === 'red' ? 'bg-red-100 text-red-800' :
                        editingCategory.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        editingCategory.color === 'pink' ? 'bg-pink-100 text-pink-800' :
                        editingCategory.color === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {editingCategory.color || 'gray'}
                      </span>
                      {editingCategory.order !== undefined && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          排序: {editingCategory.order}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    title="编辑分类"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(editingCategory)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    title="删除分类"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {editingCategory.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">描述</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                    {editingCategory.description}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">创建时间</h3>
                <p className="text-gray-600">
                  {new Date(editingCategory.createdAt).toLocaleString()}
                </p>
              </div>

              {editingCategory.updatedAt > editingCategory.createdAt && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">更新时间</h3>
                  <p className="text-gray-600">
                    {new Date(editingCategory.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}

              <hr className="my-4" />

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">使用统计</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">分类ID</span>
                    <span className="text-xs font-mono text-gray-500">{editingCategory.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">图标</span>
                    <span className="text-sm">{editingCategory.icon || '📁'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">颜色主题</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      editingCategory.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      editingCategory.color === 'green' ? 'bg-green-100 text-green-800' :
                      editingCategory.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      editingCategory.color === 'red' ? 'bg-red-100 text-red-800' :
                      editingCategory.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                      editingCategory.color === 'pink' ? 'bg-pink-100 text-pink-800' :
                      editingCategory.color === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {editingCategory.color || 'gray'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  选择一个分类查看详情
                </h3>
                <p className="text-gray-500">
                  或者创建一个新的分类开始管理你的助手
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Editor Dialog */}
      <CategoryEditor
        category={editingCategory}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        onDelete={editingCategory ? handleDeleteCategory : undefined}
      />
    </div>
  )
}