import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import { createWindow } from '@/lib/electron-app/factories/windows/create'
import { ENVIRONMENT } from '@/shared/constants'
import { displayName } from '~/package.json'
import icon from '../../../resources/icon.png?asset'

export async function AboutWindow() {
  let window = createWindow({
    id: 'about',
    title: displayName,
    width: 900,
    height: 670,
    show: false,
    center: false,
    movable: true,
    resizable: true,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: true
    },
    query: {
      version: 'test'
    }
  })

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })

  // window.on('ready-to-show', () => {
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
