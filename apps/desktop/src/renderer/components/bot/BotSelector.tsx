import React, { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'

interface BotSelectorProps {
  onSelectBot: (botId: string) => void
  className?: string
}

export function BotSelector({ onSelectBot, className = '' }: BotSelectorProps) {
  const { categories, loading } = useCategories()
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

  if (loading) {
    return (
      <div className={`border-gray-200 border-b p-4 ${className}`}>
        <div className="text-center text-gray-500">加载分类中...</div>
      </div>
    )
  }

  return (
    <div className={`border-gray-200 border-b bg-white p-4 dark:bg-gray-800 ${className}`}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-gray-900 dark:text-white">选择助手</h3>
        <button
          onClick={() => (window.location.href = '/categories')}
          className="text-blue-600 text-xs hover:text-blue-700">
          管理分类
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-3">
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">所有分类</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bot Quick Access */}
      <div className="max-h-48 space-y-2 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="py-4 text-center text-gray-500 text-sm">
            暂无分类
            <br />
            <button
              onClick={() => (window.location.href = '/categories')}
              className="mt-2 text-blue-600 hover:text-blue-700">
              创建第一个分类
            </button>
          </div>
        ) : (
          categories
            .filter((cat) => !selectedCategoryId || cat.id === selectedCategoryId)
            .map((category) => (
              <div
                key={category.id}
                className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
                onClick={() => onSelectBot(category.id)}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon || '📁'}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-gray-900">{category.name}</div>
                    <div className="mt-1 text-gray-500 text-xs">{category.description || '未设置描述'}</div>
                  </div>
                  <div className="text-gray-400 text-xs">{category.order || 100}</div>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Statistics */}
      <div className="mt-4 border-gray-200 border-t pt-3 text-gray-500 text-xs">
        <div className="flex justify-between">
          <span>活跃助手</span>
          <span className="font-medium">{categories.length}</span>
        </div>
      </div>
    </div>
  )
}
