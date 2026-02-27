import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { Settings, Database, Monitor, Cpu, Globe, Key, Keyboard, Info } from 'lucide-react'

interface SettingsNavItem {
  id: string
  label: string
  path: string
  icon: React.Component<{ size?: number; color?: string }>
}

const SETTINGS_NAV_ITEMS: SettingsNavItem[] = [
  {
    id: 'models',
    label: '模型服务',
    path: '/setting',
    icon: ({ size, color }: { size?: number; color?: string }) => (
      <Settings size={size} color={color} />
    )
  },
  {
    id: 'general',
    label: '常规设置',
    path: '/setting/general',
    icon: ({ size, color }: { size?: number; color?: string }) => (
      <Database size={size} color={color} />
    )
  },
  {
    id: 'display',
    label: '显示设置',
    path: '/setting/display',
    icon: ({ size, color }: { size?: number; color?: string }) => (
      <Monitor size={size} color={color} />
    )
  },
  {
    id: 'data',
    label: '数据设置',
    path: '/setting/data',
    icon: ({ size, color }: { size?: number; color?: string }) => (
      <Database size={size} color={color} />
    )
  },
  {
    id: 'mcp',
    label: 'MCP服务',
    path: '/setting/mcp',
    icon: ({ size, color }: { size?: number; color?: string }) => <Cpu size={size} color={color} />
  },
  {
    id: 'api',
    label: 'API服务',
    path: '/setting/api',
    icon: ({ size, color }: { size?: number; color?: string }) => (
      <Globe size={size} color={color} />
    )
  },
  {
    id: 'shortcuts',
    label: '快捷键',
    path: '/setting/shortcuts',
    icon: ({ size, color }: { size?: number; color?: string }) => (
      <Keyboard size={size} color={color} />
    )
  },
  {
    id: 'about',
    label: '关于我们',
    path: '/setting/about',
    icon: ({ size, color }: { size?: number; color?: string }) => <Info size={size} color={color} />
  }
]

/**
 * SettingsPage - 设置页面
 * 包含左侧二级导航和右侧内容
 */
export function SettingPage() {
  const location = useLocation()
  const isDark = false

  // 获取当前激活的设置菜单项
  const getActiveItem = () => {
    const path = location.pathname
    if (path === '/setting' || (path.startsWith('/setting') && path.length === 8)) {
      return '/setting'
    }
    return path
  }

  const activePath = getActiveItem()

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: isDark ? '#030712' : 'white'
      }}
    >
      {/* 二级导航侧边栏 */}
      <div
        style={{
          width: '200px',
          borderRight: isDark ? '1px solid #1f2937' : '1px solid #e5e7eb',
          backgroundColor: isDark ? '#111827' : '#f9fafb',
          padding: '16px'
        }}
      >
        <h2
          style={{
            fontSize: '12px',
            fontWeight: '600',
            color: isDark ? '#6b7280' : '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px'
          }}
        >
          设置
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          {SETTINGS_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activePath === item.path

            return (
              <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backgroundColor: isActive ? (isDark ? '#2563eb' : '#3b82f6') : 'transparent',
                    color: isActive ? 'white' : isDark ? '#9ca3af' : '#4b5563'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : '#e5e7eb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <Icon size={16} color={isActive ? 'white' : isDark ? '#d1d5db' : '#4b5563'} />
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: isActive ? '500' : 'normal',
                      color: isActive ? 'white' : isDark ? '#e5e7eb' : '#374151'
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 内容区域 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
