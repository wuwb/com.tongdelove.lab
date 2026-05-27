import { NavLink, useLocation } from 'react-router-dom'
import {
  MessageSquare,
  Sparkles,
  Smartphone,
  Settings,
  Sun,
  Moon,
  Image,
  Video,
  Database,
  Gamepad2
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  path: string
  icon: (props: { size?: number; color?: string }) => React.ReactElement
}

const TOP_NAV_ITEMS: NavItem[] = [
  {
    id: 'chat',
    label: '聊天',
    path: '/chat',
    icon: ({ size, color }: { size?: number; color?: string }) => <MessageSquare size={size} color={color} />
  },
  {
    id: 'drawing',
    label: '绘图',
    path: '/drawing',
    icon: ({ size, color }: { size?: number; color?: string }) => <Image size={size} color={color} />
  },
  {
    id: 'video',
    label: '视频',
    path: '/video',
    icon: ({ size, color }: { size?: number; color?: string }) => <Video size={size} color={color} />
  },
  {
    id: 'prompts',
    label: '提示词库',
    path: '/prompts',
    icon: ({ size, color }: { size?: number; color?: string }) => <Sparkles size={size} color={color} />
  },
  {
    id: 'categories',
    label: '分类管理',
    path: '/categories',
    icon: ({ size, color }: { size?: number; color?: string }) => <Sparkles size={size} color={color} />
  }
]

const BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    id: 'miniapp',
    label: '小程序',
    path: '/miniapp',
    icon: ({ size, color }: { size?: number; color?: string }) => <Smartphone size={size} color={color} />
  },
  {
    id: 'dasboard',
    label: '仪表盘',
    path: '/dashboard',
    icon: ({ size, color }: { size?: number; color?: string }) => <Database size={size} color={color} />
  },
  {
    id: 'settings',
    label: '设置',
    path: '/setting',
    icon: ({ size, color }: { size?: number; color?: string }) => <Settings size={size} color={color} />
  },
  {
    id: 'playground',
    label: '测试',
    path: '/playground',
    icon: ({ size, color }: { size?: number; color?: string }) => <Gamepad2 size={size} color={color} />
  }
]

interface MainNavProps {
  isDark?: boolean
  onToggleTheme?: () => void
}

export function MainNav({ isDark = false, onToggleTheme }: MainNavProps) {
  const location = useLocation()

  const NavButton = ({ Icon, label, path, isActive }: any) => (
    <NavLink to={path} title={label} style={{ textDecoration: 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          backgroundColor: isActive ? (isDark ? '#2563eb' : '#3b82f6') : 'transparent',
          color: isActive ? 'white' : isDark ? '#9ca3af' : '#4b5563',
          WebkitAppRegion: 'no-drag'
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
        }}>
        <Icon size={18} color={isActive ? 'white' : isDark ? '#d1d5db' : '#4b5563'} />
      </div>
    </NavLink>
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '12px'
        }}>
        {TOP_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return <NavButton key={item.id} Icon={Icon} label={item.label} path={item.path} isActive={isActive} />
        })}
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '12px'
        }}>
        <button
          onClick={onToggleTheme}
          title={isDark ? '切换到浅色模式' : '切换到深色模式'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            backgroundColor: 'transparent',
            color: isDark ? '#9ca3af' : '#4b5563',
            border: 'none',
            WebkitAppRegion: 'no-drag'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#1f2937' : '#e5e7eb'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}>
          {isDark ? (
            <Sun size={18} color={isDark ? '#d1d5db' : '#4b5563'} />
          ) : (
            <Moon size={18} color={isDark ? '#d1d5db' : '#4b5563'} />
          )}
        </button>

        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/')
          return <NavButton key={item.id} Icon={Icon} label={item.label} path={item.path} isActive={isActive} />
        })}
      </div>
    </div>
  )
}
