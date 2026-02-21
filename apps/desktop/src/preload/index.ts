import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { ChatStreamRequest, ChatChunk, AppSettings } from '../shared/ipc'
import { IPC } from '../shared/ipc'

// Custom APIs for renderer
const api = {
  createAboutWindow: () => {
    ipcRenderer.invoke('create-about-window')
  },

  onAboutWindowClosed: (callback: () => void) => {
    ipcRenderer.on('about-window-closed', callback)
  }
}

const appAPI = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  username: process.env.USER
}

const ai = {
  start: (req: ChatStreamRequest) => ipcRenderer.invoke(IPC.AI.START, req),
  cancel: (sessionId: string) => ipcRenderer.invoke(IPC.AI.CANCEL, sessionId),
  onChunk: (listener: (chunk: ChatChunk) => void) => {
    const l = (_: any, chunk: ChatChunk) => listener(chunk)
    ipcRenderer.on(IPC.AI.CHUNK, l)
    return () => ipcRenderer.off(IPC.AI.CHUNK, l)
  }
}

const settings = {
  get: (): Promise<AppSettings> => ipcRenderer.invoke(IPC.SETTINGS.GET),
  set: (key: keyof AppSettings, value: any) => ipcRenderer.invoke(IPC.SETTINGS.SET, key, value)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('app', appAPI)
    contextBridge.exposeInMainWorld('ai', ai)
    contextBridge.exposeInMainWorld('settings', settings)

    // Expose protected methods that allow the renderer process to use
    // the ipcRenderer without exposing the entire object
    contextBridge.exposeInMainWorld('custom', {
      invoke: (channel: string, ...args: any[]) => {
        return ipcRenderer.invoke(channel, ...args)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.ai = ai
  // @ts-ignore (define in dts)
  window.settings = settings
}
