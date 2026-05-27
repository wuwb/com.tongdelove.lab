import { MainNav } from './MainNav'
import { useState } from 'react'

interface IconSidebarProps {
  activeView: string
}

export function IconSidebar({ activeView }: IconSidebarProps) {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
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
      }}>
      <MainNav isDark={isDark} onToggleTheme={toggleTheme} />
    </div>
  )
}
