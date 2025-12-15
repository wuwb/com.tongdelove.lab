import { useState, useEffect } from 'react'
import { AppRoot } from './App'

export const ConfigModal = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log('👂 Modal 组件已挂载，开始监听事件...')

    const handleOpen = (e: any) => {
      console.log('🔔 Modal 收到打开事件!', e)
      setOpen(true)
    }

    window.addEventListener('wxt:open-config-modal', handleOpen)

    // 清理函数
    return () => {
      window.removeEventListener('wxt:open-config-modal', handleOpen)
    }
  }, [])

  // 这里的 AppRoot 必须是之前那个“只控制 display: none 而不卸载 DOM”的版本
  return <AppRoot open={open} onOpenChange={setOpen} />
}
