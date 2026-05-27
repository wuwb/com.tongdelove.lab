import { ipcMain } from 'electron'
import { IPC_CHANNELS, type Conversation, type Message, InsertConversation, InsertMessage, InsertPromptCategory } from '@/shared/ipc'
import { getDatabase } from '../services/database'

export function registerDatabaseIpc() {
  const db = getDatabase()

  // Categories
  ipcMain.handle(IPC_CHANNELS.DATABASE_CATEGORIES_GET_ALL, async () => {
    return (db as any).getAllCategories()
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CATEGORIES_GET_TREE, async () => {
    return (db as any).getCategoryTree()
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CATEGORY_GET, async (_e, id: string) => {
    return (db as any).getCategory(id)
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CATEGORY_CREATE, async (_e, category: InsertPromptCategory) => {
    return (db as any).createCategory(category)
  })

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_CATEGORY_UPDATE,
    async (_e, id: string, updates: Partial<Omit<InsertPromptCategory, 'id' | 'createdAt'>>) => {
      return (db as any).updateCategory(id, updates)
    }
  )

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_CATEGORY_MOVE,
    async (_e, id: string, targetParentId: string | null) => {
      return (db as any).moveCategory(id, targetParentId)
    }
  )

  ipcMain.handle(IPC_CHANNELS.DATABASE_CATEGORY_DELETE, async (_e, id: string) => {
    return (db as any).deleteCategory(id)
  })

  // Conversations
  ipcMain.handle(IPC_CHANNELS.DATABASE_CONVERSATIONS_GET_ALL, async () => {
    return (db as any).getAllConversations() as Conversation[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CONVERSATION_GET, async (_e, id: string) => {
    return (db as any).getConversation(id) as Conversation | null
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CONVERSATION_CREATE, async (_e, conversation: InsertConversation) => {
    return (db as any).createConversation(conversation) as Conversation
  })

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_CONVERSATION_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Conversation, 'id' | 'createdAt'>>) => {
      return (db as any).updateConversation(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CHANNELS.DATABASE_CONVERSATION_DELETE, async (_e, id: string) => {
    return (db as any).deleteConversation(id) as boolean
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CONVERSATION_GET_PROMPT_CONVERSATIONS, async (_e, promptId: string) => {
    return (db as any).getConversationsWithPrompt(promptId) as Conversation[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CONVERSATION_GET_BY_TAG, async (_e, tag: string) => {
    return (db as any).getConversationsByTag(tag) as Conversation[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_MESSAGES_GET, async (_e, conversationId: string) => {
    return (db as any).getMessages(conversationId) as Message[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_MESSAGES_GET_FOR_PROMPT, async (_e, promptId: string) => {
    return (db as any).getMessagesForPrompt(promptId) as Message[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_MESSAGES_GET_ALL, async () => {
    return (db as any).getAllConversationMessages() as Message[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_MESSAGE_CREATE, async (_e, message: InsertMessage) => {
    return (db as any).addMessage(message) as Message
  })

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_MESSAGE_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>) => {
      return (db as any).updateMessage(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CHANNELS.DATABASE_EXPORT_CONVERSATION, async (_e, conversationId: string) => {
    return (db as any).exportConversationData(conversationId)
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_EXPORT_ALL, async () => {
    return (db as any).exportAllData()
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_IMPORT_LOCALSTORAGE, async (_e, localStorageKey: string) => {
    ;(db as any).importLocalStorageData(localStorageKey)
    return { ok: true }
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_CLEAR_ALL, async () => {
    ;(db as any).clearAllData()
    return { ok: true }
  })
}
