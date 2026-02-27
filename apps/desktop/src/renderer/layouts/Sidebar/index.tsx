import { MainNav } from './MainNav'
import { useState } from 'react'

interface SidebarProps {
  activeView: string
}

/**
 * Sidebar - 侧边栏容器
 * 包含主导航
 */
export function Sidebar({ activeView }: SidebarProps) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // TODO: 实现真实的主题切换逻辑
  }

  return (
    <div
      style={{
        width: '64px',
        height: '100%',
        backgroundColor: isDark ? '#111827' : '#f9fafb',
        borderRight: isDark ? '1px solid #1f2937' : '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <MainNav isDark={isDark} onToggleTheme={toggleTheme} />
    </div>
  )
}
