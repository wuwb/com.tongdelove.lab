/**
 * SQLite Database Service for AI Chat Application
 * Manages all database operations for prompts, conversations, and messages
 */

import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'node:path'
import { SQL_CREATE_TABLES, parseTags, serializeTags } from './schema'

const DB_PATH = join(app.getPath('userData'), 'chat.db')

type Prompt = {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  prompt?: string
  provider?: string
  model?: string
  settings?: string
  tags?: string[]
  createdAt: number
  updatedAt: number
}

type Conversation = {
  id: string
  title: string
  promptId?: string
  model: string
  provider: string
  createdAt: number
  updatedAt: number
  tags?: string[]
}

type Message = {
  id: string
  conversationId: string
  role: 'user' | 'prompt' | 'system'
  content: string
  tokens?: number
  createdAt: number
}

type InsertPrompt = Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>
type InsertConversation = Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>
type InsertMessage = Omit<Message, 'id' | 'createdAt'>

class DatabaseService {
  private db: Database.Database | null = null

  constructor() {}

  initialize(): Database.Database {
    if (!this.db) {
      this.db = new Database(DB_PATH)
      this.migrate()
    }
    return this.db
  }

  private migrate(): void {
    if (!this.db) throw new Error('Database not initialized')

    this.db.exec('PRAGMA foreign_keys = ON')
    this.db.exec('PRAGMA journal_mode = WAL')
    this.db.exec('PRAGMA synchronous = NORMAL')

    SQL_CREATE_TABLES.forEach((sql) => {
      try {
        this.db.exec(sql)
      } catch (err) {
        console.error('Failed to execute SQL:', sql, err)
      }
    })
  }

  /* ============================
     ASSISTANTS OPERATIONS
     ============================ */

  getAllPrompts(): Prompt[] {
    if (!this.db) return []
    const rows = this.db.prepare('SELECT * FROM prompts ORDER BY createdAt DESC').all() as any[]
    return rows.map((row) => this.mapPromptRow(row))
  }

  getPrompt(id: string): Prompt | null {
    if (!this.db) return null
    const row = this.db.prepare('SELECT * FROM prompts WHERE id = ?').get(id) as any
    return row ? this.mapPromptRow(row) : null
  }

  createPrompt(prompt: InsertPrompt): Prompt {
    const now = Date.now()
    const id = `prompt_${now}_${Math.random().toString(36).slice(2, 10)}`

    const stmt = this.db.prepare(`
      INSERT INTO prompts (id, name, description, icon, color, prompt, provider, model, settings, createdAt, updatedAt, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      prompt.name,
      prompt.description || '',
      prompt.icon || '',
      prompt.color || '',
      prompt.prompt || '',
      prompt.provider || 'openai',
      prompt.model || 'gpt-3.5-turbo',
      prompt.settings || '',
      now,
      now,
      serializeTags(prompt.tags || [])
    )

    return this.getPrompt(id)!
  }

  updatePrompt(id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>): boolean {
    if (!this.db) return false

    const fields: string[] = []
    const values: any[] = []

    if (updates.name !== undefined) {
      fields.push('name = ?')
      values.push(updates.name)
    }
    if (updates.description !== undefined) {
      fields.push('description = ?')
      values.push(updates.description)
    }
    if (updates.icon !== undefined) {
      fields.push('icon = ?')
      values.push(updates.icon)
    }
    if (updates.color !== undefined) {
      fields.push('color = ?')
      values.push(updates.color)
    }
    if (updates.prompt !== undefined) {
      fields.push('prompt = ?')
      values.push(updates.prompt)
    }
    if (updates.provider !== undefined) {
      fields.push('provider = ?')
      values.push(updates.provider)
    }
    if (updates.model !== undefined) {
      fields.push('model = ?')
      values.push(updates.model)
    }
    if (updates.settings !== undefined) {
      fields.push('settings = ?')
      values.push(updates.settings)
    }
    if (updates.tags !== undefined) {
      fields.push('tags = ?')
      values.push(serializeTags(updates.tags))
    }

    if (fields.length === 0) return false

    fields.push('updatedAt = ?')
    values.push(Date.now())
    values.push(id)

    const sql = `UPDATE prompts SET ${fields.join(', ')} WHERE id = ?`
    const stmt = this.db.prepare(sql)
    const result = stmt.run(...values)
    return result.changes > 0
  }

  deletePrompt(id: string): boolean {
    if (!this.db) return false

    const stmt = this.db.prepare('DELETE FROM prompts WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }

  /* ============================
     ASSISTANTS OPERATIONS
     ============================ */

  getAllAssistants(): any[] {
    if (!this.db) return []
    const rows = this.db.prepare('SELECT * FROM assistants ORDER BY updatedAt DESC').all() as any[]
    return rows.map((row) => this.mapAssistantRow(row))
  }

  getAssistant(id: string): any | null {
    if (!this.db) return null
    const row = this.db.prepare('SELECT * FROM assistants WHERE id = ?').get(id) as any
    return row ? this.mapAssistantRow(row) : null
  }

  createAssistant(assistant: InsertAssistant): Assistant {
    const now = Date.now()
    const id = `assistant_${now}_${Math.random().toString(36).slice(2, 10)}`

    const stmt = this.db.prepare(`
      INSERT INTO assistants (
        id, name, avatar, icon, description, systemPrompt, knowledgeBaseIds,
        defaultModel, temperature, topP, contextWindow, maxTokens,
        streamingEnabled, toolCallMethod, customParameters,
        mcpServerMode, quickPhrases, globalMemoryEnabled,
        categoryId, createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const customParamsStr = JSON.stringify(assistant.customParameters || [])
    const quickPhrasesStr = JSON.stringify(assistant.quickPhrases || [])

    stmt.run(
      id,
      assistant.name,
      assistant.avatar || '🤖',
      assistant.icon || '',
      assistant.description || '',
      assistant.systemPrompt || '',
      assistant.knowledgeBaseIds || '',
      assistant.defaultModel || 'gpt-3.5-turbo',
      assistant.temperature ?? 0.7,
      assistant.topP ?? 1.0,
      assistant.contextWindow ?? 8192,
      assistant.maxTokens ?? 4096,
      assistant.streamingEnabled !== undefined ? (assistant.streamingEnabled ? 1 : 0) : 1,
      assistant.toolCallMethod || 'function',
      customParamsStr,
      assistant.mcpServerMode || 'auto',
      quickPhrasesStr,
      assistant.globalMemoryEnabled !== undefined ? (assistant.globalMemoryEnabled ? 1 : 0) : 0,
      assistant.categoryId || '',
      now,
      now
    )

    return this.getAssistant(id)!
  }

  updateAssistant(id: string, updates: Partial<Omit<Assistant, 'id' | 'createdAt'>>): boolean {
    if (!this.db) return false

    const fields: string[] = []
    const values: any[] = []

    if (updates.name !== undefined) {
      fields.push('name = ?')
      values.push(updates.name)
    }
    if (updates.avatar !== undefined) {
      fields.push('avatar = ?')
      values.push(updates.avatar)
    }
    if (updates.icon !== undefined) {
      fields.push('icon = ?')
      values.push(updates.icon)
    }
    if (updates.description !== undefined) {
      fields.push('description = ?')
      values.push(updates.description)
    }
    if (updates.systemPrompt !== undefined) {
      fields.push('systemPrompt = ?')
      values.push(updates.systemPrompt)
    }
    if (updates.knowledgeBaseIds !== undefined) {
      fields.push('knowledgeBaseIds = ?')
      values.push(updates.knowledgeBaseIds)
    }
    if (updates.defaultModel !== undefined) {
      fields.push('defaultModel = ?')
      values.push(updates.defaultModel)
    }
    if (updates.temperature !== undefined) {
      fields.push('temperature = ?')
      values.push(updates.temperature)
    }
    if (updates.topP !== undefined) {
      fields.push('topP = ?')
      values.push(updates.topP)
    }
    if (updates.contextWindow !== undefined) {
      fields.push('contextWindow = ?')
      values.push(updates.contextWindow)
    }
    if (updates.maxTokens !== undefined) {
      fields.push('maxTokens = ?')
      values.push(updates.maxTokens)
    }
    if (updates.streamingEnabled !== undefined) {
      fields.push('streamingEnabled = ?')
      values.push(updates.streamingEnabled ? 1 : 0)
    }
    if (updates.toolCallMethod !== undefined) {
      fields.push('toolCallMethod = ?')
      values.push(updates.toolCallMethod)
    }
    if (updates.customParameters !== undefined) {
      fields.push('customParameters = ?')
      values.push(JSON.stringify(updates.customParameters))
    }
    if (updates.mcpServerMode !== undefined) {
      fields.push('mcpServerMode = ?')
      values.push(updates.mcpServerMode)
    }
    if (updates.quickPhrases !== undefined) {
      fields.push('quickPhrases = ?')
      values.push(JSON.stringify(updates.quickPhrases))
    }
    if (updates.globalMemoryEnabled !== undefined) {
      fields.push('globalMemoryEnabled = ?')
      values.push(updates.globalMemoryEnabled ? 1 : 0)
    }
    if (updates.categoryId !== undefined) {
      fields.push('categoryId = ?')
      values.push(updates.categoryId)
    }

    if (fields.length === 0) return false

    fields.push('updatedAt = ?')
    values.push(Date.now())
    values.push(id)

    const sql = `UPDATE assistants SET ${fields.join(', ')} WHERE id = ?`
    const stmt = this.db.prepare(sql)
    const result = stmt.run(...values)
    return result.changes > 0
  }

  deleteAssistant(id: string): boolean {
    if (!this.db) return false

    const stmt = this.db.prepare('DELETE FROM assistants WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }

  /* ============================
     SESSIONS OPERATIONS
     ============================ */
  getAllConversations(): Conversation[] {
    if (!this.db) return []
    const rows = this.db.prepare('SELECT * FROM conversations ORDER BY updatedAt DESC').all() as any[]
    return rows.map((row) => this.mapConversationRow(row))
  }

  getConversation(id: string): Conversation | null {
    if (!this.db) return null
    const row = this.db.prepare('SELECT * FROM conversations WHERE id = ?').get(id) as any
    return row ? this.mapConversationRow(row) : null
  }

  createConversation(conversation: InsertConversation): Conversation {
    const now = Date.now()
    const id = `conversation_${now}_${Math.random().toString(36).slice(2, 10)}`

    const stmt = this.db.prepare(`
      INSERT INTO conversations (id, title, promptId, model, provider, createdAt, updatedAt, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      conversation.title,
      conversation.promptId || null,
      conversation.model,
      conversation.provider,
      now,
      now,
      serializeTags(conversation.tags || [])
    )

    return this.getConversation(id)!
  }

  updateConversation(id: string, updates: Partial<Omit<Conversation, 'id' | 'createdAt'>>): boolean {
    if (!this.db) return false

    const fields: string[] = []
    const values: any[] = []

    if (updates.title !== undefined) {
      fields.push('title = ?')
      values.push(updates.title)
    }
    if (updates.promptId !== undefined) {
      fields.push('promptId = ?')
      values.push(updates.promptId)
    }
    if (updates.model !== undefined) {
      fields.push('model = ?')
      values.push(updates.model)
    }
    if (updates.provider !== undefined) {
      fields.push('provider = ?')
      values.push(updates.provider)
    }
    if (updates.tags !== undefined) {
      fields.push('tags = ?')
      values.push(serializeTags(updates.tags))
    }

    if (fields.length === 0) return false

    fields.push('updatedAt = ?')
    values.push(Date.now())
    values.push(id)

    const sql = `UPDATE conversations SET ${fields.join(', ')} WHERE id = ?`
    const stmt = this.db.prepare(sql)
    const result = stmt.run(...values)
    return result.changes > 0
  }

  deleteConversation(id: string): boolean {
    if (!this.db) return false

    const stmt = this.db.prepare('DELETE FROM conversations WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }

  /* ============================
     MESSAGES OPERATIONS
     ============================ */

  getMessages(conversationId: string): Message[] {
    if (!this.db) return []
    const rows = this.db
      .prepare('SELECT * FROM messages WHERE conversationId = ? ORDER BY createdAt ASC')
      .all(conversationId) as any[]
    return rows.map((row) => this.mapMessageRow(row))
  }

  addMessage(message: InsertMessage): Message {
    const now = Date.now()
    const id = `msg_${now}_${Math.random().toString(36).slice(2, 10)}`

    const stmt = this.db.prepare(`
      INSERT INTO messages (id, conversationId, role, content, tokens, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    stmt.run(id, message.conversationId, message.role, message.content, message.tokens || null, now)

    return {
      ...message,
      id,
      createdAt: now
    }
  }

  updateMessage(
    id: string,
    updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>
  ): boolean {
    if (!this.db) return false

    const fields: string[] = []
    const values: any[] = []

    if (updates.role !== undefined) {
      fields.push('role = ?')
      values.push(updates.role)
    }
    if (updates.content !== undefined) {
      fields.push('content = ?')
      values.push(updates.content)
    }
    if (updates.tokens !== undefined) {
      fields.push('tokens = ?')
      values.push(updates.tokens)
    }

    if (fields.length === 0) return false

    values.push(id)

    const sql = `UPDATE messages SET ${fields.join(', ')} WHERE id = ?`
    const stmt = this.db.prepare(sql)
    const result = stmt.run(...values)
    return result.changes > 0
  }

  /* ============================
     QUERIES
     ============================ */

  getConversationsWithPrompt(promptId: string): Conversation[] {
    if (!this.db) return []
    const rows = this.db
      .prepare('SELECT * FROM conversations WHERE promptId = ? ORDER BY updatedAt DESC')
      .all(promptId) as any[]
    return rows.map((row) => this.mapConversationRow(row))
  }

  getConversationsByTag(tag: string): Conversation[] {
    if (!this.db) return []
    const rows = this.db
      .prepare('SELECT * FROM conversations WHERE tags LIKE ? OR tags LIKE ? ORDER BY updatedAt DESC')
      .all(`%${tag}%,%,%%,${tag}%%`) as any[]
    return rows.map((row) => this.mapConversationRow(row))
  }

  getMessagesForPrompt(promptId: string): Message[] {
    if (!this.db) return []
    const rows = this.db
      .prepare(
        `
        SELECT m.* FROM messages m
        INNER JOIN conversations s ON s.id = m.conversationId
        WHERE s.promptId = ?
        ORDER BY m.createdAt ASC
      `
      )
      .all(promptId) as any[]
    return (rows as any[]).map((row) =>
      this.mapMessageRow({ ...row, id: row.messageId, conversationId: row.conversationId })
    )
  }

  getAllConversationMessages(): Message[] {
    if (!this.db) return []
    const rows = this.db.prepare('SELECT * FROM messages ORDER BY createdAt ASC').all() as any[]
    return rows.map((row) => this.mapMessageRow(row))
  }

  /* ============================
     BACKUP & EXPORT
     ============================ */

  exportConversationData(conversationId: string) {
    const conversation = this.getConversation(conversationId)
    if (!conversation) return null

    const messages = this.getMessages(conversationId)

    return {
      conversation,
      messages
    }
  }

  exportAllData() {
    return {
      prompts: this.getAllPrompts(),
      conversations: this.getAllConversations(),
      messages: this.getAllConversationMessages().filter((m) => m.conversationId)
    }
  }

  /* ============================
     IMPORT & MIGRATION
     ============================ */

  importLocalStorageData(localStorageKey: string) {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(localStorageKey)
        if (data) {
          const parsed = JSON.parse(data)

          if (Array.isArray(parsed)) {
            if (localStorageKey.includes('prompts')) {
              parsed.forEach((item: any) => {
                if (!this.getPrompt(item.id)) {
                  this.createPrompt(item)
                }
              })
            } else if (localStorageKey.includes('chat_conversations')) {
              parsed.forEach((conversation: any) => {
                if (!this.getConversation(conversation.id)) {
                  const { title = 'New Chat', model, provider, messages = [], tags } = conversation
                  const newConversation = this.createConversation({ title, model, provider, tags })
                  if (messages && messages.length > 0) {
                    messages.forEach((msg: any) => {
                      this.addMessage({ ...msg, conversationId: newConversation.id })
                    })
                  }
                }
              })
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to import localStorage data:', err)
    }
  }

  clearAllData(): void {
    if (!this.db) return

    this.db.exec('DELETE FROM messages')
    this.db.exec('DELETE FROM conversations')
    this.db.exec('DELETE FROM assistants')
    this.db.exec('DELETE FROM assistant_categories')
    this.db.exec('DELETE FROM prompts')
  }
  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  /* ============================
     PRIVATE HELPERS
     ============================ */

  private mapPromptRow(row: any): Prompt {
    return {
      id: row.id,
      name: row.name,
      description: row.description || undefined,
      icon: row.icon || undefined,
      color: row.color || undefined,
      prompt: row.prompt || undefined,
      provider: row.provider || undefined,
      model: row.model || undefined,
      settings: row.settings || undefined,
      tags: row.tags ? parseTags(row.tags) : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }
  }

  private mapConversationRow(row: any): Conversation {
    return {
      id: row.id,
      title: row.title,
      promptId: row.promptId || undefined,
      model: row.model,
      provider: row.provider,
      tags: row.tags ? parseTags(row.tags) : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }
  }

  private mapMessageRow(row: any): Message {
    return {
      id: row.id,
      conversationId: row.conversationId,
      role: row.role,
      content: row.content,
      tokens: row.tokens || undefined,
      createdAt: row.createdAt
    }
  }

  private mapAssistantRow(row: any): Assistant {
    return {
      id: row.id,
      name: row.name,
      avatar: row.avatar || '🤖',
      icon: row.icon || undefined,
      description: row.description || undefined,
      systemPrompt: row.systemPrompt || undefined,
      knowledgeBaseIds: row.knowledgeBaseIds || undefined,
      defaultModel: row.defaultModel || undefined,
      temperature: row.temperature,
      topP: row.topP,
      contextWindow: row.contextWindow,
      maxTokens: row.maxTokens,
      streamingEnabled: row.streamingEnabled === 1,
      toolCallMethod: row.toolCallMethod || 'function',
      customParameters: row.customParameters ? JSON.parse(row.customParameters) : [],
      mcpServerMode: row.mcpServerMode || 'auto',
      quickPhrases: row.quickPhrases ? JSON.parse(row.quickPhrases) : [],
      globalMemoryEnabled: row.globalMemoryEnabled === 1,
      categoryId: row.categoryId || undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }
}


}
const dbService = new DatabaseService()

export function getDatabase() {
  return dbService.initialize()
}

export function closeDatabase() {
  dbService.close()
}
