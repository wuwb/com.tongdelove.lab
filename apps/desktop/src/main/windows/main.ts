import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import { createWindow } from '@/lib/electron-app/factories/windows/create'
import { ENVIRONMENT } from '@/shared/constants'
import { displayName } from '~/package.json'
import icon from '../../../resources/icon.png?asset'
import { registerAiIpc } from '../ipc/ai'
export async function MainWindow() {
  let window = createWindow({
    id: 'main',
    title: displayName,
    width: 1200,
    height: 832, // 增加32px用于自定义标题栏
    show: false,
    center: false,
    movable: true,
    resizable: true,
    alwaysOnTop: false,
    // 平台特定配置
    frame: process.platform !== 'darwin', // macOS 使用原生标题栏，Windows/Linux 隐藏
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'hidden',
    backgroundColor: '#ffffff',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  // register AI IPC (uses webContents for broadcasting)
  registerAiIpc(window.webContents)

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })
  // })

  // window.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url)
  //   return { action: 'deny' }
  // })

  // // HMR for renderer base on electron-vite cli.
  // // Load the remote URL for development or the local html file for production.
  // if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  //   window.loadURL(process.env['ELECTRON_RENDERER_URL'])
  // } else {
  //   window.loadFile(join(__dirname, '../renderer/index.html'))
  // }
  // window.webContents.openDevTools()

  window.on('close', () => {
    for (const window of BrowserWindow.getAllWindows()) {
      window.destroy()
    }
  })

  window.on('closed', () => {
    window = null!
  })

  return window
}
