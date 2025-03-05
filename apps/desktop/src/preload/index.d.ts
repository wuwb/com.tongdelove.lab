import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    custom: {
      invoke(channel: string, ...args: any[]): Promise<any>
    }
  }
}
