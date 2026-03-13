import React, { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'

export function BotManagementTest() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory, refreshCategories } = useCategories()
  const [testResult, setTestResult] = useState<string>('')

  const runTests = async () => {
    setTestResult('开始测试...')
    try {
      // 测试创建分类
      setTestResult('创建分类中...')
      await createCategory({
        name: '测试分类',
        icon: '🧪',
        color: 'blue',
        description: '用于测试的分类',
        order: 1
      })

      // 测试获取分类
      setTestResult('获取分类列表中...')
      await refreshCategories()

      if (categories.length > 0) {
        setTestResult(`成功！创建了 ${categories.length} 个分类`)

        // 测试更新分类
        setTestResult('更新分类中...')
        await updateCategory(categories[0].id, {
          name: '已更新的测试分类',
          description: '描述已更新'
        })

        // 测试删除分类
        setTestResult('删除分类中...')
        await deleteCategory(categories[0].id)
        await refreshCategories()

        setTestResult(`测试完成！最终分类数量: ${categories.length}`)
      } else {
        setTestResult('错误：没有创建新的分类')
      }
    } catch (err) {
      setTestResult(`测试失败: ${err}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bot管理功能测试
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            测试Bot管理功能的完整性和正确性
          </p>
        </div>

        {/* Test Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            功能测试面板
          </h2>

          {/* Status Display */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">加载状态:</span>
                <span className={loading ? 'text-yellow-600' : 'text-green-600'}>
                  {loading ? '加载中' : '就绪'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">分类数量:</span>
                <span className="font-medium">{categories.length}</span>
              </div>
              {error && (
                <div className="flex justify-between">
                  <span className="text-gray-600">错误信息:</span>
                  <span className="text-red-600">{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Test Button */}
          <button
            onClick={runTests}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            运行完整测试
          </button>

          {/* Test Result */}
          {testResult && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <h3 className="font-medium text-blue-900 dark:text-blue-400 mb-1">测试结果</h3>
              <p className="text-blue-800 dark:text-blue-300">{testResult}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => window.location.href = '/categories'}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            管理分类
          </button>
        </div>
      </div>
    </div>
  )
}
