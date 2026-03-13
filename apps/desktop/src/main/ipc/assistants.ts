import { ipcMain } from 'electron'
import {
  IPC_CANNELS,
  type Assistant,
  type AssistantCategory,
  type InsertAssistant,
  type InsertAssistantCategory
} from '@/shared/ipc'
import { type DBTables } from '@/main/services/database/schema'
import { getDatabase } from '../services/database'

export function registerAssistantsIpc() {
  const db = getDatabase()

  // Assistant CRUD operations
  ipcMain.handle(IPC_CANNELS.DATABASE_ASSISTANTS_GET_ALL, async () => {
    return (db as any).getAllAssistants() as Assistant[]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_ASSISTANT_GET, async (_e, id: string) => {
    return (db as any).getAssistant(id) as Assistant | null
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_ASSISTANT_CREATE, async (_e, assistant: InsertAssistant) => {
    return (db as any).createAssistant(assistant) as Assistant
  })

  ipcMain.handle(
    IPC_CANNELS.DATABASE_ASSISTANT_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>) => {
      return (db as any).updateAssistant(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CANNELS.DATABASE_ASSISTANT_DELETE, async (_e, id: string) => {
    return (db as any).deleteAssistant(id) as boolean
  })

  // Category CRUD operations
  ipcMain.handle(IPC_CANNELS.DATABASE_CATEGORIES_GET_ALL, async () => {
    return (db as any).getAllCategories() as DBTables['assistant_categories'][]
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CATEGORY_GET, async (_e, id: string) => {
    return (db as any).getCategory(id) as DBTables['assistant_categories'] | null
  })

  ipcMain.handle(IPC_CANNELS.DATABASE_CATEGORY_CREATE, async (_e, category: InsertAssistantCategory) => {
    return (db as any).createCategory(category) as DBTables['assistant_categories']
  })

  ipcMain.handle(
    IPC_CANNELS.DATABASE_CATEGORY_UPDATE,
    async (_e, id: string, updates: Partial<Omit<InsertAssistantCategory, 'id' | 'createdAt'>>) => {
      return (db as any).updateCategory(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CANNELS.DATABASE_CATEGORY_DELETE, async (_e, id: string) => {
    return (db as any).deleteCategory(id) as boolean
  })
}
