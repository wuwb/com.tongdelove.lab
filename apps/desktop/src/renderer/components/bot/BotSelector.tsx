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
      <div className={`p-4 border-b border-gray-200 ${className}`}>
        <div className="text-center text-gray-500">加载分类中...</div>
      </div>
    )
  }

  return (
    <div className={`p-4 border-b border-gray-200 bg-white dark:bg-gray-800 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900 dark:text-white">选择助手</h3>
        <button
          onClick={() => window.location.href = '/categories'}
          className="text-xs text-blue-600 hover:text-blue-700"
        >
          管理分类
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-3">
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">所有分类</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bot Quick Access */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            暂无分类<br />
            <button
              onClick={() => window.location.href = '/categories'}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              创建第一个分类
            </button>
          </div>
        ) : (
          categories
            .filter(cat => !selectedCategoryId || cat.id === selectedCategoryId)
            .map((category) => (
              <div
                key={category.id}
                className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                onClick={() => onSelectBot(category.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon || '📁'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {category.description || '未设置描述'}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {category.order || 100}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Statistics */}
      <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>活跃助手</span>
          <span className="font-medium">{categories.length}</span>
        </div>
      </div>
    </div>
  )
}