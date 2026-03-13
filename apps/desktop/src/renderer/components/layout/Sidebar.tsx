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
      path: '/assistants',
      label: '助手库',
      icon: Sparkles,
      description: '管理AI助手'
    },
    {
      path: '/categories',
      label: '分类管理',
      icon: Folder,
      description: '组织助手分类'
    },
    {
      path: '/settings',
      label: '设置',
      icon: Settings,
      description: '应用配置'
    }
  ]

  return (
    <div className={`w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">Bot Manager</h1>
            <p className="text-xs text-gray-500">智能助手平台</p>
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
              className={`flex items-center gap-3 px-3 py-3 mb-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <div className="flex-1">
                <span className="font-medium">{item.label}</span>
                <p className="text-xs opacity-75">{item.description}</p>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bot Management Quick Stats */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            今日统计
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">活跃助手</span>
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