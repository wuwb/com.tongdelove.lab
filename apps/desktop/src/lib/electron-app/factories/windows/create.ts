import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import type { WindowProps } from '@/shared/types'
import { registerRoute } from '@/lib/electron-router-dom'

export function createWindow({ id, query, ...settings }: WindowProps) {
  const window = new BrowserWindow(settings)

  registerRoute({
    id,
    query,
    browserWindow: window,
    htmlFile: join(__dirname, '../renderer/index.html')
  })

  window.on('ready-to-show', () => {
    window.show()
  })

  window.on('closed', window.destroy)

  return window
}
