import React, { useState } from 'react'
import { BotSelector } from '../../components/bot/BotSelector'
import { BotStatusMonitor } from '../../components/bot/BotStatusMonitor'

export function BotIntegrationPage() {
  const [selectedBotId, setSelectedBotId] = useState<string>('')

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bot Manager - 集成演示
            </h1>
            <p className="text-xs text-gray-500">Bot管理与聊天功能集成</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Bot Selection */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <BotSelector onSelectBot={setSelectedBotId} />

          {/* Chat Interface Placeholder */}
          <div className="flex-1 p-4">
            {selectedBotId ? (
              <div className="h-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  正在与助手对话...
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">🤖</span>
                    <div className="flex-1 bg-white dark:bg-gray-600 p-2 rounded">
                      您好！我是您的AI助手。请问有什么可以帮助您的吗？
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">👤</span>
                    <div className="flex-1 bg-white dark:bg-gray-600 p-2 rounded">
                      你好，我想了解一下这个系统的功能。
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="输入消息..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="font-medium text-gray-900 mb-2">选择助手开始对话</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    选择一个分类或助手来开始聊天
                  </p>
                  <button
                    onClick={() => window.location.href = '/assistants'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    前往助手库
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Bot Management Dashboard */}
        <div className="flex-1 flex flex-col">
          {/* Dashboard Stats */}
          <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Bot管理仪表板
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">总助手数</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">活跃助手</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">分类数量</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">1.2K</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">今日消息</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 bg-white dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">快速操作</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => window.location.href = '/assistants'}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium text-gray-900 dark:text-white">管理助手</div>
                <div className="text-sm text-gray-500">创建、编辑AI助手</div>
              </button>
              <button
                onClick={() => window.location.href = '/categories'}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="text-2xl mb-2">📁</div>
                <div className="font-medium text-gray-900 dark:text-white">分类管理</div>
                <div className="text-sm text-gray-500">组织助手分类</div>
              </button>
              <button
                onClick={() => window.location.href = '/chat'}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="text-2xl mb-2">💬</div>
                <div className="font-medium text-gray-900 dark:text-white">开始聊天</div>
                <div className="text-sm text-gray-500">与助手对话</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">最近活动</h3>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      创建了助手 "编程助手"
                    </div>
                    <div className="text-sm text-gray-500">2分钟前</div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    📁
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      更新了分类 "开发工具"
                    </div>
                    <div className="text-sm text-gray-500">15分钟前</div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    💬
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      与"客服助手"进行了10轮对话
                    </div>
                    <div className="text-sm text-gray-500">1小时前</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}