import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    app: any
    ai: {
      start: (req: import('../shared/ipc').ChatRequest & { provider?: 'mock' | 'openai' | 'ollama' }) => Promise<{ ok: boolean; sessionId: string }>
      cancel: (sessionId: string) => Promise<{ ok: boolean }>
      onChunk: (listener: (chunk: import('../shared/ipc').ChatChunk) => void) => () => void
    }
    custom: {
      invoke(channel: string, ...args: any[]): Promise<any>
    }
  }
}
