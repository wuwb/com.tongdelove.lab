import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Sparkles, Folder, Settings, MessageCircle } from 'lucide-react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className = '' }: SidebarProps) {
  const location = useLocation()

  const navigationItems = [
    {
      path: '/chat',
      label: '聊天',
      icon: MessageCircle,
      description: '开始新的对话'
    },
    {
      path: '/prompts',
      label: '提示词库',
      icon: Sparkles,
      description: '管理AI提示词'
    },
    {
      path: '/categories',
      label: '分类管理',
      icon: Folder,
      description: '组织提示词分类'
    },
    {
      path: '/settings',
      label: '设置',
      icon: Settings,
      description: '应用配置'
    }
  ]

  return (
    <div className={`w-64 border-gray-200 border-r bg-gray-50 dark:border-gray-700 dark:bg-gray-900 ${className}`}>
      {/* Logo */}
      <div className="border-gray-200 border-b p-4 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">AI</div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">Bot Manager</h1>
            <p className="text-gray-500 text-xs">智能助手平台</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}>
              <Icon size={20} />
              <div className="flex-1">
                <span className="font-medium">{item.label}</span>
                <p className="text-xs opacity-75">{item.description}</p>
              </div>
              {isActive && <div className="h-2 w-2 rounded-full bg-blue-600" />}
            </Link>
          )
        })}
      </nav>

      {/* Bot Management Quick Stats */}
      <div className="absolute right-0 bottom-0 left-0 border-gray-200 border-t p-4 dark:border-gray-700">
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
          <h3 className="mb-2 font-medium text-gray-900 text-sm dark:text-white">今日统计</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">活跃提示词</span>
              <span className="font-medium text-green-600">8</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">消息处理</span>
              <span className="font-medium text-blue-600">2.4K</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">响应时间</span>
              <span className="font-medium text-purple-600">120ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
