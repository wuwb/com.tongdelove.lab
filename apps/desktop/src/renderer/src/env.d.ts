/// <reference types="vite/client" />
import type { AppSettings, ChatChunk, ChatRequest } from '../../shared/ipc'

declare global {
  interface Window {
    electron: import('@electron-toolkit/preload').ElectronAPI
    api: {
      createAboutWindow: () => void
      onAboutWindowClosed: (callback: () => void) => void
    }
    app: {
      sayHelloFromBridge: () => void
      username?: string
    }
    ai: {
      start: (req: ChatRequest & { provider?: 'mock' | 'openai' | 'ollama' }) => Promise<any>
      cancel: (sessionId: string) => Promise<any>
      onChunk: (listener: (chunk: ChatChunk) => void) => () => void
    }
    settings: {
      get: () => Promise<AppSettings>
      set: (key: keyof AppSettings, value: any) => Promise<any>
    }
  }
}
