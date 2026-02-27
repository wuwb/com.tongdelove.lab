import { Outlet } from 'react-router-dom'
import { CustomTitleBar } from '../components/Header/CustomTitleBar'
import { Sidebar } from './Sidebar'
import { useState } from 'react'

/**
 * AppShell - 应用主布局容器
 * 包含自定义标题栏、侧边栏和主要内容区域
 */
export function AppShell() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    // TODO: 实现真实的主题切换逻辑（保存到数据库等）
  }

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: isDark ? '#030712' : 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* 自定义标题栏 */}
      <CustomTitleBar isDark={isDark} />

      {/* 主要内容区域 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          WebkitAppRegion: 'no-drag'
        }}
      >
        {/* 侧边栏 */}
        <Sidebar activeView={'chat'} />

        {/* 内容区域 */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: isDark ? '#030712' : 'white'
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}
