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
    <div className={`border-gray-200 border-t bg-gray-50 p-4 dark:bg-gray-800 ${className}`}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
          <Activity size={16} />
          系统状态
        </h3>
        <button
          onClick={refreshStats}
          disabled={loading}
          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Messages */}
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
          <div className="mb-1 flex items-center gap-2">
            <Zap size={14} className="text-green-600" />
            <span className="text-gray-500 text-xs">消息总数</span>
          </div>
          <div className="font-semibold text-gray-900 text-lg dark:text-white">
            {stats.totalMessages.toLocaleString()}
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
          <div className="mb-1 flex items-center gap-2">
            <Clock size={14} className="text-blue-600" />
            <span className="text-gray-500 text-xs">响应时间</span>
          </div>
          <div className="font-semibold text-gray-900 text-lg dark:text-white">{stats.avgResponseTime}ms</div>
        </div>

        {/* Active Bots */}
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
          <div className="mb-1 flex items-center gap-2">
            <Activity size={14} className="text-purple-600" />
            <span className="text-gray-500 text-xs">活跃提示词</span>
          </div>
          <div className="font-semibold text-gray-900 text-lg dark:text-white">{stats.activeBots}</div>
        </div>

        {/* Error Rate */}
        <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-700">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-red-600">⚠️</span>
            <span className="text-gray-500 text-xs">错误率</span>
          </div>
          <div className="font-semibold text-gray-900 text-lg dark:text-white">{stats.errorRate.toFixed(1)}%</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 border-gray-200 border-t pt-3">
        <div className="flex gap-2">
          <button
            onClick={() => (window.location.href = '/prompts')}
            className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-white text-xs transition-colors hover:bg-blue-700">
            管理提示词
          </button>
          <button
            onClick={() => (window.location.href = '/categories')}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-700 text-xs transition-colors hover:bg-gray-50">
            分类设置
          </button>
        </div>
      </div>
    </div>
  )
}
