import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  ChatStreamRequest,
  ChatChunk,
  AppSettings,
  Assistant,
  InsertAssistant,
  IpcResponse,
  Prompt,
  Conversation,
  Message,
  InsertPrompt,
  InsertConversation,
  InsertMessage,
  VersionInfo,
  VersionConfig,
  VersionUpdateResult
} from '../shared/ipc'
import { IPC_CANNELS } from '../shared/ipc'

const api = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },
  // window manager 
  windowManager: {
    minimize: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_MAXIMIZE),
    unmaximize: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_UNMAXIMIZE),
    close: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_CLOSE),
    createAboutWindow: () => {
      ipcRenderer.invoke('create-about-window')
    },
    onAboutWindowClosed: (callback: () => void) => {
      ipcRenderer.on('about-window-closed', callback)
    },
  },
  ai: {
    start: (req: ChatStreamRequest) => ipcRenderer.invoke(IPC_CANNELS.AI_START, req),
    cancel: (conversationId: string) => ipcRenderer.invoke(IPC_CANNELS.AI_CANCEL, conversationId),
    onChunk: (listener: (chunk: ChatChunk) => void) => {
      const l = (_: any, chunk: ChatChunk) => listener(chunk)
      ipcRenderer.on(IPC_CANNELS.AI_CHUNK, l)
      return () => ipcRenderer.off(IPC_CANNELS.AI_CHUNK, l)
    }
  },
  settings: {
    get: (): Promise<AppSettings> => ipcRenderer.invoke(IPC_CANNELS.SETTINGS_GET),
    set: (key: keyof AppSettings, value: any) => ipcRenderer.invoke(IPC_CANNELS.SETTINGS_SET, key, value)
  },
  database: {
    // Prompts
    getAllPrompts: (): Promise<Prompt[]> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_PROMPTS_GET_ALL),
    getPrompt: (id: string): Promise<Prompt | null> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_PROMPT_GET, id),
    createPrompt: (prompt: InsertPrompt): Promise<Prompt> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_PROMPT_CREATE, prompt),
    updatePrompt: (
      id: string,
      updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_PROMPT_UPDATE, id, updates),
    deletePrompt: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_PROMPT_DELETE, id),
  
    // Conversations
    getAllConversations: (): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATIONS_GET_ALL),
    getConversation: (id: string): Promise<Conversation | null> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATION_GET, id),
    createConversation: (conversation: InsertConversation): Promise<Conversation> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATION_CREATE, conversation),
    updateConversation: (
      id: string,
      updates: Partial<Omit<Conversation, 'id' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATION_UPDATE, id, updates),
    deleteConversation: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATION_DELETE, id),
    getConversationsWithPrompt: (promptId: string): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATION_GET_ASSISTANT_SESSIONS, promptId),
    getConversationsByTag: (tag: string): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_CONVERSATION_GET_BY_TAG, tag),
  
    // Messages
    getMessages: (conversationId: string): Promise<Message[]> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_MESSAGES_GET, conversationId),
    getMessagesForPrompt: (promptId: string): Promise<Message[]> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_MESSAGES_GET_FOR_PROMPT, promptId),
    getAllMessages: (): Promise<Message[]> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_MESSAGES_GET_ALL),
    createMessage: (message: InsertMessage): Promise<Message> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_MESSAGE_CREATE, message),
    updateMessage: (
      id: string,
      updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_MESSAGE_UPDATE, id, updates),
  
    // Export/Import
    exportConversation: (conversationId: string) =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_EXPORT_CONVERSATION, conversationId),
    exportAll: () => ipcRenderer.invoke(IPC_CANNELS.DATABASE_EXPORT_ALL),
    importLocalStorage: (localStorageKey: string) =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_IMPORT_LOCALSTORAGE, localStorageKey),
    clearAll: () => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CLEAR_ALL),
  
    // Assistants
    getAllAssistants: (): Promise<Assistant[]> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_ASSISTANTS_GET_ALL),
    getAssistant: (id: string): Promise<Assistant | null> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_ASSISTANT_GET, id),
    createAssistant: (assistant: InsertAssistant): Promise<Assistant> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_ASSISTANT_CREATE, assistant),
    updateAssistant: (
      id: string,
      updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC_CANNELS.DATABASE_ASSISTANT_UPDATE, id, updates),
    deleteAssistant: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CANNELS.DATABASE_ASSISTANT_DELETE, id),

    // Categories
    getAllCategories: () => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CATEGORIES_GET_ALL),
    getCategory: (id: string) => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CATEGORY_GET, id),
    createCategory: (category: any) => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CATEGORY_CREATE, category),
    updateCategory: (id: string, updates: any) => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CATEGORY_UPDATE, id, updates),
    deleteCategory: (id: string) => ipcRenderer.invoke(IPC_CANNELS.DATABASE_CATEGORY_DELETE, id),
  },

  windowControl: {
    minimize: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_MAXIMIZE),
    unmaximize: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_UNMAXIMIZE),
    close: () => ipcRenderer.invoke(IPC_CANNELS.WINDOW_CLOSE)
  },
  
  ollama: {
    listModels: () => ipcRenderer.invoke(IPC_CANNELS.OLLAMA_LIST_MODELS)
  },
  
  version: {
    getVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_GET, name),
    getAllVersions: (): Promise<IpcResponse<VersionInfo[]>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_GET_ALL),
    checkVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_CHECK, name),
    checkAllVersions: (): Promise<IpcResponse<VersionInfo[]>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_CHECK_ALL),
    installVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_INSTALL, name),
    updateVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_UPDATE, name),
    updateAllVersions: (): Promise<IpcResponse<VersionUpdateResult[]>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_UPDATE_ALL),
    getConfig: (): Promise<IpcResponse<VersionConfig | null>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_GET_CONFIG),
    setConfig: (config: Partial<VersionConfig>): Promise<IpcResponse<void>> => ipcRenderer.invoke(IPC_CANNELS.VERSION_SET_CONFIG, config)
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
