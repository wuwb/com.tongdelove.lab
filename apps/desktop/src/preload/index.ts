import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  ChatStreamRequest,
  ChatChunk,
  AppSettings,
  Assistant,
  InsertAssistant
} from '../shared/ipc'
import type {
  Prompt,
  Conversation,
  Message,
  InsertPrompt,
  InsertConversation,
  InsertMessage,
  VersionInfo,
  VersionConfig
} from '../shared/ipc'
import { IPC } from '../shared/ipc'

const api = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },
  // window manager 
  windowManager: {
    minimize: () => ipcRenderer.invoke(IPC.WINDOW.MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC.WINDOW.MAXIMIZE),
    unmaximize: () => ipcRenderer.invoke(IPC.WINDOW.UNMAXIMIZE),
    close: () => ipcRenderer.invoke(IPC.WINDOW.CLOSE),
    createAboutWindow: () => {
      ipcRenderer.invoke('create-about-window')
    },
    onAboutWindowClosed: (callback: () => void) => {
      ipcRenderer.on('about-window-closed', callback)
    },
  },
  ai: {
    start: (req: ChatStreamRequest) => ipcRenderer.invoke(IPC.AI.START, req),
    cancel: (conversationId: string) => ipcRenderer.invoke(IPC.AI.CANCEL, conversationId),
    onChunk: (listener: (chunk: ChatChunk) => void) => {
      const l = (_: any, chunk: ChatChunk) => listener(chunk)
      ipcRenderer.on(IPC.AI.CHUNK, l)
      return () => ipcRenderer.off(IPC.AI.CHUNK, l)
    }
  },
  settings: {
    get: (): Promise<AppSettings> => ipcRenderer.invoke(IPC.SETTINGS.GET),
    set: (key: keyof AppSettings, value: any) => ipcRenderer.invoke(IPC.SETTINGS.SET, key, value)
  },
  database: {
    // Prompts
    getAllPrompts: (): Promise<Prompt[]> => ipcRenderer.invoke(IPC.DATABASE.PROMPTS_GET_ALL),
    getPrompt: (id: string): Promise<Prompt | null> =>
      ipcRenderer.invoke(IPC.DATABASE.PROMPT_GET, id),
    createPrompt: (prompt: InsertPrompt): Promise<Prompt> =>
      ipcRenderer.invoke(IPC.DATABASE.PROMPT_CREATE, prompt),
    updatePrompt: (
      id: string,
      updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC.DATABASE.PROMPT_UPDATE, id, updates),
    deletePrompt: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC.DATABASE.PROMPT_DELETE, id),
  
    // Conversations
    getAllConversations: (): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC.DATABASE.CONVERSATIONS_GET_ALL),
    getConversation: (id: string): Promise<Conversation | null> =>
      ipcRenderer.invoke(IPC.DATABASE.CONVERSATION_GET, id),
    createConversation: (conversation: InsertConversation): Promise<Conversation> =>
      ipcRenderer.invoke(IPC.DATABASE.CONVERSATION_CREATE, conversation),
    updateConversation: (
      id: string,
      updates: Partial<Omit<Conversation, 'id' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC.DATABASE.CONVERSATION_UPDATE, id, updates),
    deleteConversation: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC.DATABASE.CONVERSATION_DELETE, id),
    getConversationsWithPrompt: (promptId: string): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC.DATABASE.CONVERSATION_GET_ASSISTANT_SESSIONS, promptId),
    getConversationsByTag: (tag: string): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC.DATABASE.CONVERSATION_GET_BY_TAG, tag),
  
    // Messages
    getMessages: (conversationId: string): Promise<Message[]> =>
      ipcRenderer.invoke(IPC.DATABASE.MESSAGES_GET, conversationId),
    getMessagesForPrompt: (promptId: string): Promise<Message[]> =>
      ipcRenderer.invoke(IPC.DATABASE.MESSAGES_GET_FOR_PROMPT, promptId),
    getAllMessages: (): Promise<Message[]> => ipcRenderer.invoke(IPC.DATABASE.MESSAGES_GET_ALL),
    createMessage: (message: InsertMessage): Promise<Message> =>
      ipcRenderer.invoke(IPC.DATABASE.MESSAGE_CREATE, message),
    updateMessage: (
      id: string,
      updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC.DATABASE.MESSAGE_UPDATE, id, updates),
  
    // Export/Import
    exportConversation: (conversationId: string) =>
      ipcRenderer.invoke(IPC.DATABASE.EXPORT_CONVERSATION, conversationId),
    exportAll: () => ipcRenderer.invoke(IPC.DATABASE.EXPORT_ALL),
    importLocalStorage: (localStorageKey: string) =>
      ipcRenderer.invoke(IPC.DATABASE.IMPORT_LOCALSTORAGE, localStorageKey),
    clearAll: () => ipcRenderer.invoke(IPC.DATABASE.CLEAR_ALL),
  
    // Assistants
    getAllAssistants: (): Promise<Assistant[]> => ipcRenderer.invoke(IPC.DATABASE.ASSISTANTS_GET_ALL),
    getAssistant: (id: string): Promise<Assistant | null> =>
      ipcRenderer.invoke(IPC.DATABASE.ASSISTANT_GET, id),
    createAssistant: (assistant: InsertAssistant): Promise<Assistant> =>
      ipcRenderer.invoke(IPC.DATABASE.ASSISTANT_CREATE, assistant),
    updateAssistant: (
      id: string,
      updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC.DATABASE.ASSISTANT_UPDATE, id, updates),
    deleteAssistant: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC.DATABASE.ASSISTANT_DELETE, id)
  },

  windowControl: {
    minimize: () => ipcRenderer.invoke(IPC.WINDOW.MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC.WINDOW.MAXIMIZE),
    unmaximize: () => ipcRenderer.invoke(IPC.WINDOW.UNMAXIMIZE),
    close: () => ipcRenderer.invoke(IPC.WINDOW.CLOSE)
  },
  
  ollama: {
    listModels: () => ipcRenderer.invoke(IPC.OLLAMA.LIST_MODELS)
  },
  
  version: {
    getVersion: (name: string): Promise<VersionInfo | null> => ipcRenderer.invoke(IPC.VERSION.GET, name),
    getAllVersions: (): Promise<VersionInfo[]> => ipcRenderer.invoke(IPC.VERSION.GET_ALL),
    checkVersion: (name: string): Promise<VersionInfo | null> => ipcRenderer.invoke(IPC.VERSION.CHECK, name),
    checkAllVersions: (): Promise<VersionInfo[]> => ipcRenderer.invoke(IPC.VERSION.CHECK_ALL),
    installVersion: (name: string): Promise<boolean> => ipcRenderer.invoke(IPC.VERSION.INSTALL, name),
    updateVersion: (name: string): Promise<boolean> => ipcRenderer.invoke(IPC.VERSION.UPDATE, name),
    updateAllVersions: (): Promise<{ name: string; success: boolean }[]> => ipcRenderer.invoke(IPC.VERSION.UPDATE_ALL),
    getConfig: (): Promise<VersionConfig | null> => ipcRenderer.invoke(IPC.VERSION.GET_CONFIG),
    setConfig: (config: Partial<VersionConfig>): Promise<boolean> => ipcRenderer.invoke(IPC.VERSION.SET_CONFIG, config)
  },
  
  
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

console.log('process.contextIsolated', process.contextIsolated)

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('[Preload]Failed to expose APIs:', error as Error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

export type WindowApiType = typeof api
