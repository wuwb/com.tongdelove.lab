import { ipcMain } from 'electron'
import { IPC_CANNELS, type AppSettings } from '@/shared/ipc'
import { store } from '../services/store'

export function registerSettingsIpc() {
  ipcMain.handle(IPC_CANNELS.SETTINGS_GET, async () => {
    return store.getAll()
  })

  ipcMain.handle(IPC_CANNELS.SETTINGS_SET, async (_e, key: keyof AppSettings, value: any) => {
    store.set(key, value)
    return { ok: true }
  })
}
