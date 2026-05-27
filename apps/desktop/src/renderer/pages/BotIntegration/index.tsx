import React, { useState } from 'react'
import { BotSelector } from '../../components/bot/BotSelector'
import { BotStatusMonitor } from '../../components/bot/BotStatusMonitor'

export function BotIntegrationPage() {
  const [selectedBotId, setSelectedBotId] = useState<string>('')

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="flex h-16 items-center border-gray-200 border-b bg-white px-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white">
            AI
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-xl dark:text-white">Bot Manager - 集成演示</h1>
            <p className="text-gray-500 text-xs">Bot管理与聊天功能集成</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Bot Selection */}
        <div className="flex w-80 flex-col border-gray-200 border-r bg-white dark:border-gray-700 dark:bg-gray-800">
          <BotSelector onSelectBot={setSelectedBotId} />

          {/* Chat Interface Placeholder */}
          <div className="flex-1 p-4">
            {selectedBotId ? (
              <div className="h-full rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
                <h3 className="mb-2 font-medium text-gray-900 dark:text-white">正在对话...</h3>
                <div className="space-y-3 text-gray-600 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">🤖</span>
                    <div className="flex-1 rounded bg-white p-2 dark:bg-gray-600">
                      您好！我是您的AI助手。请问有什么可以帮助您的吗？
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">👤</span>
                    <div className="flex-1 rounded bg-white p-2 dark:bg-gray-600">
                      你好，我想了解一下这个系统的功能。
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="输入消息..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <div>
                  <div className="mb-4 text-4xl">🤖</div>
                  <h3 className="mb-2 font-medium text-gray-900">选择提示词开始对话</h3>
                  <p className="mb-4 text-gray-500 text-sm">选择一个分类或提示词来开始聊天</p>
                  <button
                    onClick={() => (window.location.href = '/prompts')}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    前往提示词库
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Bot Management Dashboard */}
        <div className="flex flex-1 flex-col">
          {/* Dashboard Stats */}
          <div className="border-gray-200 border-b bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">Bot管理仪表板</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">8</div>
                <div className="text-gray-600 text-sm dark:text-gray-400">总提示词数</div>
              </div>
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <div className="font-bold text-2xl text-green-600 dark:text-green-400">5</div>
                <div className="text-gray-600 text-sm dark:text-gray-400">活跃提示词</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                <div className="font-bold text-2xl text-purple-600 dark:text-purple-400">3</div>
                <div className="text-gray-600 text-sm dark:text-gray-400">分类数量</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                <div className="font-bold text-2xl text-orange-600 dark:text-orange-400">1.2K</div>
                <div className="text-gray-600 text-sm dark:text-gray-400">今日消息</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 dark:bg-gray-800">
            <h3 className="mb-3 font-medium text-gray-900 dark:text-white">快速操作</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => (window.location.href = '/prompts')}
                className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="mb-2 text-2xl">🎯</div>
                <div className="font-medium text-gray-900 dark:text-white">管理提示词</div>
                <div className="text-gray-500 text-sm">创建、编辑AI提示词</div>
              </button>
              <button
                onClick={() => (window.location.href = '/categories')}
                className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="mb-2 text-2xl">📁</div>
                <div className="font-medium text-gray-900 dark:text-white">分类管理</div>
                <div className="text-gray-500 text-sm">组织提示词分类</div>
              </button>
              <button
                onClick={() => (window.location.href = '/chat')}
                className="rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="mb-2 text-2xl">💬</div>
                <div className="font-medium text-gray-900 dark:text-white">开始聊天</div>
                <div className="text-gray-500 text-sm">与助手对话</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-900">
            <h3 className="mb-4 font-medium text-gray-900 dark:text-white">最近活动</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">创建了提示词 "编程助手"</div>
                    <div className="text-gray-500 text-sm">2分钟前</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    📁
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">更新了分类 "开发工具"</div>
                    <div className="text-gray-500 text-sm">15分钟前</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    💬
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">与"客服助手"进行了10轮对话</div>
                    <div className="text-gray-500 text-sm">1小时前</div>
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
