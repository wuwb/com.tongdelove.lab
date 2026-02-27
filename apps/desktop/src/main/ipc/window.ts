import { ipcMain, BrowserWindow } from 'electron'
import { IPC } from '../../shared/ipc'

export function registerWindowIpc() {
  // Get the main window
  const getMainWindow = (): BrowserWindow | undefined => {
    const mainWindow = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed())
    return mainWindow
  }

  // Minimize window
  ipcMain.handle(IPC.WINDOW.MINIMIZE, async () => {
    const window = getMainWindow()
    if (window) {
      window.minimize()
    }
    return { success: true }
  })

  // Maximize window
  ipcMain.handle(IPC.WINDOW.MAXIMIZE, async () => {
    const window = getMainWindow()
    if (window) {
      window.maximize()
    }
    return { success: true }
  })

  // Unmaximize window
  ipcMain.handle(IPC.WINDOW.UNMAXIMIZE, async () => {
    const window = getMainWindow()
    if (window) {
      window.unmaximize()
    }
    return { success: true }
  })

  // Close window
  ipcMain.handle(IPC.WINDOW.CLOSE, async () => {
    const window = getMainWindow()
    if (window) {
      window.close()
    }
    return { success: true }
  })
}
