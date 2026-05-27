import { Outlet } from 'react-router-dom'
import { CustomTitleBar } from '../../components/Header/CustomTitleBar'
import { IconSidebar } from './IconSidebar'
import { useState } from 'react'

export function AppShell() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: isDark ? '#030712' : 'white',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
      <CustomTitleBar isDark={isDark} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          WebkitAppRegion: 'no-drag'
        }}>
        <IconSidebar activeView={'chat'} />

        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: isDark ? '#030712' : 'white'
          }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
