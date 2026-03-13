import React, { useState, useEffect } from 'react'
import { RefreshCw, Activity, Clock, Zap } from 'lucide-react'

interface BotStats {
  totalMessages: number
  avgResponseTime: number
  activeBots: number
  errorRate: number
}

interface BotStatusMonitorProps {
  className?: string
}

export function BotStatusMonitor({ className = '' }: BotStatusMonitorProps) {
  const [stats, setStats] = useState<BotStats>({
    totalMessages: 0,
    avgResponseTime: 0,
    activeBots: 0,
    errorRate: 0
  })
  const [loading, setLoading] = useState(false)

  const refreshStats = async () => {
    setLoading(true)
    // 模拟API调用获取统计信息
    setTimeout(() => {
      setStats({
        totalMessages: Math.floor(Math.random() * 1000) + 500,
        avgResponseTime: Math.floor(Math.random() * 200) + 100,
        activeBots: Math.floor(Math.random() * 10) + 5,
        errorRate: Math.random() * 5
      })
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    refreshStats()
  }, [])

  return (
    <div className={`p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-800 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
          <Activity size={16} />
          系统状态
        </h3>
        <button
          onClick={refreshStats}
          disabled={loading}
          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Messages */}
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-green-600" />
            <span className="text-xs text-gray-500">消息总数</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {stats.totalMessages.toLocaleString()}
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-blue-600" />
            <span className="text-xs text-gray-500">响应时间</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {stats.avgResponseTime}ms
          </div>
        </div>

        {/* Active Bots */}
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={14} className="text-purple-600" />
            <span className="text-xs text-gray-500">活跃助手</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {stats.activeBots}
          </div>
        </div>

        {/* Error Rate */}
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-red-600">⚠️</span>
            <span className="text-xs text-gray-500">错误率</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {stats.errorRate.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => window.location.href = '/assistants'}
            className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            管理助手
          </button>
          <button
            onClick={() => window.location.href = '/categories'}
            className="flex-1 px-3 py-2 text-xs border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            分类设置
          </button>
        </div>
      </div>
    </div>
  )
}