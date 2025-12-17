import { ipcMain } from 'electron'
import { IPC, type AppSettings } from '../../shared/ipc'
import { store } from '../services/store'

export function registerSettingsIpc() {
  ipcMain.handle(IPC.SETTINGS.GET, async () => {
    return store.getAll()
  })

  ipcMain.handle(IPC.SETTINGS.SET, async (_e, key: keyof AppSettings, value: any) => {
    store.set(key, value)
    return { ok: true }
  })
}
