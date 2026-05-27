import { useState, useEffect } from 'react'

interface CustomTitleBarProps {
  isDark?: boolean
}

export function CustomTitleBar({ isDark = false }: CustomTitleBarProps) {
  const [isMacOS, setIsMacOS] = useState(false)

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase()
    setIsMacOS(platform === 'mac' || platform === 'macintel' || platform === 'macppc')
  }, [])

  const handleMinimize = () => window.windowControl?.minimize?.()
  const handleMaximize = () => window.windowControl?.maximize?.()
  const handleClose = () => window.windowControl?.close?.()

  const WindowButtons = ({ isDark = false }: { isDark?: boolean }) => {
    const WindowButton = ({ label, onClick, hoverColor, closeBtn }: any) => (
      <button
        onClick={onClick}
        title={label}
        style={{
          padding: '4px 12px',
          background: 'transparent',
          border: 'none',
          borderRadius: '0',
          cursor: 'pointer',
          color: isDark ? '#9ca3af' : '#374151',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e: any) => {
          e.currentTarget.style.backgroundColor = closeBtn ? '#ef4444' : hoverColor
          if (closeBtn) e.currentTarget.style.color = 'white'
        }}
        onMouseLeave={(e: any) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          if (closeBtn) e.currentTarget.style.color = isDark ? '#9ca3af' : '#374151'
        }}>
        <span style={{ fontSize: '12px' }}>{label}</span>
      </button>
    )

    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <WindowButton label="—" onClick={handleMinimize} hoverColor={isDark ? '#374151' : '#e5e7eb'} />
        <WindowButton label="□" onClick={handleMaximize} hoverColor={isDark ? '#374151' : '#e5e7eb'} />
        <WindowButton label="✕" onClick={handleClose} hoverColor={isDark ? '#374151' : '#e5e7eb'} closeBtn />
      </div>
    )
  }

  return (
    <div
      style={{
        height: '32px',
        background: isDark ? '#111827' : 'white',
        borderBottom: isDark ? '1px solid #1f2937' : '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMacOS ? '0 12px' : '0 16px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitAppRegion: 'drag'
      }}>
      {!isMacOS && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#3b82f6',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              WebkitAppRegion: 'no-drag'
            }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '12px' }}>AI</span>
          </div>
        </div>
      )}
      <div style={{ flex: 1 }} />
      {isMacOS ? (
        <></>
      ) : (
        <div style={{ WebkitAppRegion: 'no-drag' }}>
          <WindowButtons isDark={isDark} />
        </div>
      )}
    </div>
  )
}
