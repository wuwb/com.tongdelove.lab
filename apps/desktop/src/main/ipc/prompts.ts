import { ipcMain } from 'electron'
import {
  IPC_CHANNELS,
  type Prompt,
  type InsertPrompt,
} from '@/shared/ipc'
import { getDatabase } from '../services/database'

export function registerPromptsIpc() {
  const db = getDatabase()

  ipcMain.handle(IPC_CHANNELS.DATABASE_PROMPTS_GET_ALL, async () => {
    return (db as any).getAllPrompts() as Prompt[]
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_PROMPT_GET, async (_e, id: string) => {
    return (db as any).getPrompt(id) as Prompt | null
  })

  ipcMain.handle(IPC_CHANNELS.DATABASE_PROMPT_CREATE, async (_e, prompt: InsertPrompt) => {
    return (db as any).createPrompt(prompt) as Prompt
  })

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_PROMPT_UPDATE,
    async (_e, id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>) => {
      return (db as any).updatePrompt(id, updates) as boolean
    }
  )

  ipcMain.handle(IPC_CHANNELS.DATABASE_PROMPT_DELETE, async (_e, id: string) => {
    return (db as any).deletePrompt(id) as boolean
  })
}
