import { useState, useEffect } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  getVersion,
  getAllVersions,
  checkVersion,
  checkAllVersions,
  installVersion,
  updateVersion,
  updateAllVersions
} from '../../lib/version-api'

interface TimeRange {
  label: string
  days: number
}

interface UsageStats {
  totalRequests: number
  totalCost: number
  totalTokens: number
  cachedTokens: number
}

export const Usage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(0)

  const TIME_RANGES: TimeRange[] = [
    { label: '1天', days: 1 },
    { label: '7天', days: 7 },
    { label: '30天', days: 30 },
    { label: '当前月', days: 30 }
  ]

  const generateMockData = (days: number) => {
    const data = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        requests: Math.floor(Math.random() * 1000) + 100,
        cost: Math.random() * 50 + 10,
        tokens: Math.floor(Math.random() * 50000) + 5000
      })
    }
    return data
  }

  const mockData = generateMockData(TIME_RANGES[selectedTimeRange].days)

  const stats: UsageStats = {
    totalRequests: mockData.reduce((sum, item) => sum + item.requests, 0),
    totalCost: mockData.reduce((sum, item) => sum + item.cost, 0),
    totalTokens: mockData.reduce((sum, item) => sum + item.tokens, 0),
    cachedTokens: Math.floor(mockData.reduce((sum, item) => sum + item.tokens, 0) * 0.3)
  }

  return (
    <div>
      {/* 时间范围选择器 */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {TIME_RANGES.map((range, index) => (
          <button
            key={index}
            onClick={() => setSelectedTimeRange(index)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: selectedTimeRange === index ? 'none' : '1px solid #d1d5db',
              backgroundColor: selectedTimeRange === index ? '#3b82f6' : 'white',
              color: selectedTimeRange === index ? 'white' : '#374151',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}>
            {range.label}
          </button>
        ))}
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
          <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>总请求数</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
            {stats.totalRequests.toLocaleString()}
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
          <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>总成本</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>${stats.totalCost.toFixed(2)}</p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
          <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>总Token数</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{stats.totalTokens.toLocaleString()}</p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
          <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>缓存Token数</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
            {stats.cachedTokens.toLocaleString()}
          </p>
        </div>
      </div>

      {/* 趋势图表 */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          flex: 1
        }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>使用量趋势</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} name="请求数" />
            <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="成本 ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tab 区域 */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          flex: 1
        }}>
        <TabsPrimitive.Root defaultValue="logs" className="w-full">
          <TabsPrimitive.List className="mb-4 flex border-gray-200 border-b">
            <TabsPrimitive.Trigger className="px-4 py-2 font-medium text-gray-500 text-sm hover:text-gray-700 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600">
              请求日志
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger className="px-4 py-2 font-medium text-gray-500 text-sm hover:text-gray-700 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600">
              按Provider统计
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger className="px-4 py-2 font-medium text-gray-500 text-sm hover:text-gray-700 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 data-[state=active]:text-blue-600">
              按模型统计
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>

          <TabsPrimitive.Content value="logs">
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>请求日志</h4>
              <p style={{ color: '#6b7280' }}>显示最近的API请求日志...</p>
            </div>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="provider">
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>按Provider统计</h4>
              <p style={{ color: '#6b7280' }}>按服务提供商统计使用情况...</p>
            </div>
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="model">
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>按模型统计</h4>
              <p style={{ color: '#6b7280' }}>按AI模型统计使用情况...</p>
            </div>
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </div>
    </div>
  )
}
