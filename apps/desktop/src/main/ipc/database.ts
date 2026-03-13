import { ipcMain } from 'electron'
import {
  IPC_CANNELS,
  type Prompt,
  type Conversation,
  type Message,
  InsertPrompt,
  InsertConversation,
  InsertMessage
} from '@/shared/ipc'
import { getDatabase } from '../services/database'

export function registerDatabaseIpc() {
  const db = getDatabase()

  ipcMain.handle(IPC_CANNELS.DATABASE_PROMPTS_GET_ALL, async () => {
    return (db as any).getAllPrompts() as Prompt[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_PROMPT_GET, async (_e, id: string) => {
    return (db as any).getPrompt(id) as Prompt | null
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_PROMPT_CREATE, async (_e, prompt: InsertPrompt) => {
    return (db as any).createPrompt(prompt) as Prompt
  })

  ipcMain.handle(
    IPC_CANNELS.DATABASE_PROMPT_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>) => {
      return (db as any).updatePrompt(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CANNELS.DATABASE_PROMPT_DELETE, async (_e, id: string) => {
    return (db as any).deletePrompt(id) as boolean
  })

  /* ============================
     SESSIONS IPC_CANNELS HANDLERS
     ============================ */

  ipcMain.handle(IPC_CANNELS.DATABASE_CONVERSATIONS_GET_ALL, async () => {
    return (db as any).getAllConversations() as Conversation[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CONVERSATION_GET, async (_e, id: string) => {
    return (db as any).getConversation(id) as Conversation | null
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CONVERSATION_CREATE, async (_e, conversation: InsertConversation) => {
    return (db as any).createConversation(conversation) as Conversation
  })

  ipcMain.handle(
    IPC_CANNELS.DATABASE_CONVERSATION_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Conversation, 'id' | 'createdAt'>>) => {
      return (db as any).updateConversation(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CANNELS.DATABASE_CONVERSATION_DELETE, async (_e, id: string) => {
    return (db as any).deleteConversation(id) as boolean
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CONVERSATION_GET_ASSISTANT_SESSIONS, async (_e, promptId: string) => {
    return (db as any).getConversationsWithPrompt(promptId) as Conversation[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CONVERSATION_GET_BY_TAG, async (_e, tag: string) => {
    return (db as any).getConversationsByTag(tag) as Conversation[]
  })

  /* ============================
     MESSAGES IPC_CANNELS HANDLERS
     ============================ */

  ipcMain.handle(IPC_CANNELS.DATABASE_MESSAGES_GET, async (_e, conversationId: string) => {
    return (db as any).getMessages(conversationId) as Message[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_MESSAGES_GET_FOR_PROMPT, async (_e, promptId: string) => {
    return (db as any).getMessagesForPrompt(promptId) as Message[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_MESSAGES_GET_ALL, async () => {
    return (db as any).getAllConversationMessages() as Message[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_MESSAGE_CREATE, async (_e, message: InsertMessage) => {
    return (db as any).addMessage(message) as Message
  })

  ipcMain.handle(
    IPC_CANNELS.DATABASE_MESSAGE_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>) => {
      return (db as any).updateMessage(id, updates) as boolean
    }
  )

  /* ============================
     EXPORT/IMPORT IPC_CANNELS HANDLERS
     ============================ */

  ipcMain.handle(IPC_CANNELS.DATABASE_EXPORT_CONVERSATION, async (_e, conversationId: string) => {
    return (db as any).exportConversationData(conversationId)
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_EXPORT_ALL, async () => {
    return (db as any).exportAllData()
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_IMPORT_LOCALSTORAGE, async (_e, localStorageKey: string) => {
    ;(db as any).importLocalStorageData(localStorageKey)
    return { ok: true }
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CLEAR_ALL, async () => {
    ;(db as any).clearAllData()
    return { ok: true }
  })
}
