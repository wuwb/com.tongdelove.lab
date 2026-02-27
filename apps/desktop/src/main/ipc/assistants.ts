import { ipcMain } from 'electron'
import {
  IPC,
  type Assistant,
  type AssistantCategory,
  type InsertAssistant,
  type InsertAssistantCategory
} from '../../shared/ipc'
import { getDatabase } from '../services/database'

export function registerAssistantsIpc() {
  const db = getDatabase()

  ipcMain.handle(IPC.DATABASE.ASSISTANTS_GET_ALL, async () => {
    return (db as any).getAllAssistants() as Assistant[]
  })

  ipcMain.handle(IPC.DATABASE.ASSISTANT_GET, async (_e, id: string) => {
    return (db as any).getAssistant(id) as Assistant | null
  })

  ipcMain.handle(IPC.DATABASE.ASSISTANT_CREATE, async (_e, assistant: InsertAssistant) => {
    return (db as any).createAssistant(assistant) as Assistant
  })

  ipcMain.handle(
    IPC.DATABASE.ASSISTANT_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>) => {
      return (db as any).updateAssistant(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC.DATABASE.ASSISTANT_DELETE, async (_e, id: string) => {
    return (db as any).deleteAssistant(id) as boolean
  })
}
