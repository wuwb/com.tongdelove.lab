import { app, dialog, ipcMain } from 'electron'
import { makeAppWithSingleInstanceLock } from 'lib/electron-app/factories/app/instance'
import { makeAppSetup } from 'lib/electron-app/factories/app/setup'
import { MainWindow } from './windows/main'
import * as fs from 'fs/promises'
import { main } from 'renderer/pages/Test/action'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  await makeAppSetup(MainWindow)

  app.on('web-contents-created', (event, contents) => {
    if (contents.getType() === 'webview') {
      contents.setWindowOpenHandler(({ url }) => {
        contents.loadURL(url)
        return { action: 'deny' }
      })
    }
  })

  // Add IPC handler
  ipcMain.handle(
    'process-folder',
    async (_, sourceFolder: string, size: string, fillType: 'contain' | 'cover') => {
      try {
        await main(sourceFolder, size, fillType)
        return { success: true }
      } catch (error: any) {
        console.error('Error processing images:', error)
        return { success: false, error: error?.message || 'Unknown error' }
      }
    }
  )

  // Add IPC handler for getting folder path
  ipcMain.handle('get-folder-path', async (_, filePath: string) => {
    try {
      const stats = await fs.stat(filePath)
      if (!stats.isDirectory()) {
        throw new Error('Selected path is not a directory')
      }

      console.log('filePath: ', filePath)
      return { success: true, path: filePath }
    } catch (error: any) {
      console.error('Error getting folder path:', error)
      return { success: false, error: error?.message || 'Unknown error' }
    }
  })

  ipcMain.handle('dialog:open-folder', async () => {
    // 从主窗口打开对话框，体验更好
    const { canceled, filePaths } = await dialog.showOpenDialog({
      // 关键属性，确保用户只能选择文件夹
      properties: ['openDirectory'],
    })

    if (!canceled && filePaths.length > 0) {
      console.log('canceled: ', canceled)
      console.log('filePaths: ', filePaths[0])
      return filePaths[0]
    }

    return null
  })
})
