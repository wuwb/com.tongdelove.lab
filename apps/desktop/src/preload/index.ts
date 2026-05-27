import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  ChatStreamRequest,
  ChatChunk,
  AppSettings,
  Prompt,
  Conversation,
  Message,
  InsertPrompt,
  InsertConversation,
  InsertMessage,
  PromptCategory,
  InsertPromptCategory,
  IpcResponse,
  VersionInfo,
  VersionConfig,
  VersionUpdateResult
} from '../shared/ipc'
import { IPC_CHANNELS } from '../shared/ipc'

const api = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  invoke: (channel: string, ...args: any[]) => {
    return ipcRenderer.invoke(channel, ...args)
  },

  windowManager: {
    minimize: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_MINIMIZE),
    maximize: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_MAXIMIZE),
    unmaximize: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_UNMAXIMIZE),
    close: () => ipcRenderer.invoke(IPC_CHANNELS.WINDOW_CLOSE),
    createAboutWindow: () => {
      ipcRenderer.invoke('create-about-window')
    },
    onAboutWindowClosed: (callback: () => void) => {
      ipcRenderer.on('about-window-closed', callback)
    }
  },

  ai: {
    start: (req: ChatStreamRequest) => ipcRenderer.invoke(IPC_CHANNELS.AI_START, req),
    cancel: (conversationId: string) => ipcRenderer.invoke(IPC_CHANNELS.AI_CANCEL, conversationId),
    onChunk: (listener: (chunk: ChatChunk) => void) => {
      const l = (_: any, chunk: ChatChunk) => listener(chunk)
      ipcRenderer.on(IPC_CHANNELS.AI_CHUNK, l)
      return () => ipcRenderer.off(IPC_CHANNELS.AI_CHUNK, l)
    }
  },

  settings: {
    get: (): Promise<AppSettings> => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET),
    set: (key: keyof AppSettings, value: any) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SET, key, value)
  },

  database: {
    getAllPrompts: (): Promise<Prompt[]> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_PROMPTS_GET_ALL),
    getPrompt: (id: string): Promise<Prompt | null> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_PROMPT_GET, id),
    createPrompt: (prompt: InsertPrompt): Promise<Prompt> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_PROMPT_CREATE, prompt),
    updatePrompt: (id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_PROMPT_UPDATE, id, updates),
    deletePrompt: (id: string): Promise<boolean> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_PROMPT_DELETE, id),

    getAllCategories: (): Promise<PromptCategory[]> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORIES_GET_ALL),
    getCategoryTree: (): Promise<PromptCategory[]> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORIES_GET_TREE),
    getCategory: (id: string): Promise<PromptCategory | null> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORY_GET, id),
    createCategory: (category: InsertPromptCategory): Promise<PromptCategory> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORY_CREATE, category),
    updateCategory: (id: string, updates: Partial<Omit<InsertPromptCategory, 'id' | 'createdAt'>>): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORY_UPDATE, id, updates),
    moveCategory: (id: string, targetParentId: string | null): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORY_MOVE, id, targetParentId),
    deleteCategory: (id: string): Promise<boolean> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CATEGORY_DELETE, id),

    getAllConversations: (): Promise<Conversation[]> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATIONS_GET_ALL),
    getConversation: (id: string): Promise<Conversation | null> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATION_GET, id),
    createConversation: (conversation: InsertConversation): Promise<Conversation> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATION_CREATE, conversation),
    updateConversation: (id: string, updates: Partial<Omit<Conversation, 'id' | 'createdAt'>>): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATION_UPDATE, id, updates),
    deleteConversation: (id: string): Promise<boolean> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATION_DELETE, id),
    getConversationsWithPrompt: (promptId: string): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATION_GET_PROMPT_CONVERSATIONS, promptId),
    getConversationsByTag: (tag: string): Promise<Conversation[]> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CONVERSATION_GET_BY_TAG, tag),

    getMessages: (conversationId: string): Promise<Message[]> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_MESSAGES_GET, conversationId),
    getMessagesForPrompt: (promptId: string): Promise<Message[]> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_MESSAGES_GET_FOR_PROMPT, promptId),
    getAllMessages: (): Promise<Message[]> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_MESSAGES_GET_ALL),
    createMessage: (message: InsertMessage): Promise<Message> =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_MESSAGE_CREATE, message),
    updateMessage: (
      id: string,
      updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>
    ): Promise<boolean> => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_MESSAGE_UPDATE, id, updates),

    exportConversation: (conversationId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_EXPORT_CONVERSATION, conversationId),
    exportAll: () => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_EXPORT_ALL),
    importLocalStorage: (localStorageKey: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.DATABASE_IMPORT_LOCALSTORAGE, localStorageKey),
    clearAll: () => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_CLEAR_ALL)
  },

  ollama: {
    listModels: () => ipcRenderer.invoke(IPC_CHANNELS.OLLAMA_LIST_MODELS)
  },

  version: {
    getVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_GET, name),
    getAllVersions: (): Promise<IpcResponse<VersionInfo[]>> => ipcRenderer.invoke(IPC_CHANNELS.VERSION_GET_ALL),
    checkVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_CHECK, name),
    checkAllVersions: (): Promise<IpcResponse<VersionInfo[]>> => ipcRenderer.invoke(IPC_CHANNELS.VERSION_CHECK_ALL),
    installVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_INSTALL, name),
    updateVersion: (name: string): Promise<IpcResponse<VersionInfo | null>> =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_UPDATE, name),
    updateAllVersions: (): Promise<IpcResponse<VersionUpdateResult[]>> =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_UPDATE_ALL),
    getConfig: (): Promise<IpcResponse<VersionConfig | null>> => ipcRenderer.invoke(IPC_CHANNELS.VERSION_GET_CONFIG),
    setConfig: (config: Partial<VersionConfig>): Promise<IpcResponse<void>> =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_SET_CONFIG, config)
  }
}

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
