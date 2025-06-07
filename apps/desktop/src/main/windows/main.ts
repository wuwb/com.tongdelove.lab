import { BrowserWindow } from 'electron'
import { join } from 'node:path'

import { createWindow } from 'lib/electron-app/factories/windows/create'
import { ENVIRONMENT } from 'shared/constants'
import { displayName } from '~/package.json'

export async function MainWindow() {
  const window = createWindow({
    id: 'main',
    title: displayName,
    width: 1200,
    height: 800,
    show: false,
    center: true,
    movable: true,
    resizable: true,
    alwaysOnTop: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    backgroundColor: '#2e2c29',

    webPreferences: {
      webviewTag: true,
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
    },
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })

  // window.webContents.on('new-window', (event, url: string) => {
  //     event.preventDefault()
  //     window.loadURL(url)
  //     window.webContents.send('blocked-new-window', url)
  // })

  window.webContents.setWindowOpenHandler(details => {
    return { action: 'deny' }
  })

  window.on('close', () => {
    for (const window of BrowserWindow.getAllWindows()) {
      window.destroy()
    }
  })

  return window
}
