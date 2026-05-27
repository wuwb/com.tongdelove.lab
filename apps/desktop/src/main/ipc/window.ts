import { ipcMain, BrowserWindow } from 'electron'
import { IPC_CHANNELS } from '@/shared/ipc'

export function registerWindowIpc() {
  // Get the main window
  const getMainWindow = (): BrowserWindow | undefined => {
    const mainWindow = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())
    return mainWindow
  }

  // Minimize window
  ipcMain.handle(IPC_CHANNELS.WINDOW_MINIMIZE, async () => {
    const window = getMainWindow()
    if (window) {
      window.minimize()
    }
    return { success: true }
  })

  // Maximize window
  ipcMain.handle(IPC_CHANNELS.WINDOW_MAXIMIZE, async () => {
    const window = getMainWindow()
    if (window) {
      window.maximize()
    }
    return { success: true }
  })

  // Unmaximize window
  ipcMain.handle(IPC_CHANNELS.WINDOW_UNMAXIMIZE, async () => {
    const window = getMainWindow()
    if (window) {
      window.unmaximize()
    }
    return { success: true }
  })

  // Close window
  ipcMain.handle(IPC_CHANNELS.WINDOW_CLOSE, async () => {
    const window = getMainWindow()
    if (window) {
      window.close()
    }
    return { success: true }
  })
}
