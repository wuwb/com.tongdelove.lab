import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

const appAPI = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
}

const customAPI = {
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },
  processFolder: (data: {
    folderPath: string, 
    size: string,
    fillType: string,
  }) => {
    return ipcRenderer.invoke('process-folder', data.folderPath, data.size, data.fillType)
  },
  getFolderPath: (filePath: string) => {
    return ipcRenderer.invoke('get-folder-path', filePath)
  },
  selectFolder: () => {
    return ipcRenderer.invoke('dialog:open-folder')
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('app', appAPI)

    // Expose protected methods that allow the renderer process to use
    // the ipcRenderer without exposing the entire object
    contextBridge.exposeInMainWorld('custom', customAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.app = appAPI
  // @ts-ignore (define in dts)
  window.custom = customAPI
}
