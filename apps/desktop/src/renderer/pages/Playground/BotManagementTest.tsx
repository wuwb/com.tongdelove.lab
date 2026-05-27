import React, { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'

export function BotManagementTest() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory, refreshCategories } =
    useCategories()
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
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-3xl text-gray-900 dark:text-white">Bot管理功能测试</h1>
          <p className="text-gray-600 dark:text-gray-400">测试Bot管理功能的完整性和正确性</p>
        </div>

        {/* Test Panel */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 font-semibold text-gray-900 text-xl dark:text-white">功能测试面板</h2>

          {/* Status Display */}
          <div className="mb-4 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">加载状态:</span>
                <span className={loading ? 'text-yellow-600' : 'text-green-600'}>{loading ? '加载中' : '就绪'}</span>
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
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
            运行完整测试
          </button>

          {/* Test Result */}
          {testResult && (
            <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <h3 className="mb-1 font-medium text-blue-900 dark:text-blue-400">测试结果</h3>
              <p className="text-blue-800 dark:text-blue-300">{testResult}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => (window.location.href = '/categories')}
            className="rounded-md bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700">
            管理分类
          </button>
        </div>
      </div>
    </div>
  )
}
