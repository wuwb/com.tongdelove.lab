import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'node:path'
import { SQL_CREATE_TABLES, parseTags, serializeTags } from './schema'
import {
  Prompt,
  PromptCategory,
  Conversation,
  Message,
  InsertPrompt,
  InsertPromptCategory,
  InsertConversation,
  InsertMessage,
  ChatRole
} from '@/shared/ipc'

const DB_PATH = join(app.getPath('userData'), 'chat.db')

interface ColumnDef {
  name: string
  type: string
  defaultValue?: string
}

const PROMPTS_TABLE_COLUMNS: ColumnDef[] = [
  { name: 'id', type: 'TEXT PRIMARY KEY' },
  { name: 'name', type: 'TEXT NOT NULL' },
  { name: 'avatar', type: 'TEXT', defaultValue: "'🤖'" },
  { name: 'icon', type: 'TEXT' },
  { name: 'description', type: 'TEXT' },
  { name: 'systemPrompt', type: 'TEXT' },
  { name: 'knowledgeBaseIds', type: 'TEXT' },
  { name: 'defaultModel', type: 'TEXT' },
  { name: 'temperature', type: 'REAL', defaultValue: '0.7' },
  { name: 'topP', type: 'REAL', defaultValue: '1.0' },
  { name: 'contextWindow', type: 'INTEGER', defaultValue: '8192' },
  { name: 'maxTokens', type: 'INTEGER', defaultValue: '4096' },
  { name: 'streamingEnabled', type: 'INTEGER', defaultValue: '1' },
  { name: 'toolCallMethod', type: 'TEXT', defaultValue: "'function'" },
  { name: 'customParameters', type: 'TEXT' },
  { name: 'mcpServerMode', type: 'TEXT', defaultValue: "'auto'" },
  { name: 'quickPhrases', type: 'TEXT' },
  { name: 'globalMemoryEnabled', type: 'INTEGER', defaultValue: '0' },
  { name: 'categoryId', type: 'TEXT' },
  { name: 'createdAt', type: 'INTEGER NOT NULL' },
  { name: 'updatedAt', type: 'INTEGER NOT NULL' }
]

const CATEGORIES_TABLE_COLUMNS: ColumnDef[] = [
  { name: 'id', type: 'TEXT PRIMARY KEY' },
  { name: 'name', type: 'TEXT NOT NULL' },
  { name: 'icon', type: 'TEXT', defaultValue: "'📁'" },
  { name: 'color', type: 'TEXT', defaultValue: "'gray'" },
  { name: 'description', type: 'TEXT' },
  { name: 'order', type: 'INTEGER', defaultValue: '100' },
  { name: 'parentId', type: 'TEXT' },
  { name: 'level', type: 'TEXT', defaultValue: "'L1'" },
  { name: 'createdAt', type: 'INTEGER NOT NULL' },
  { name: 'updatedAt', type: 'INTEGER NOT NULL' }
]

class DatabaseService {
  private db: Database.Database | null = null
  private existingColumnCache: Map<string, Set<string>> = new Map()

  constructor() {}

  initialize(): Database.Database {
    if (!this.db) {
      console.log('[Database] Initializing database at:', DB_PATH)
      this.db = new Database(DB_PATH)
      this.migrate()
    }
    return this.db
  }

  private getExistingColumns(tableName: string): Set<string> {
    if (!this.db) return new Set()

    if (this.existingColumnCache.has(tableName)) {
      return this.existingColumnCache.get(tableName)!
    }

    const columns = this.db
      .prepare(`PRAGMA table_info(${tableName})`)
      .all() as { name: string }[]

    const columnNames = new Set(columns.map((col) => col.name.toLowerCase()))
    this.existingColumnCache.set(tableName, columnNames)

    console.log(`[Database] Existing columns in ${tableName}:`, columns.map((c) => c.name))
    return columnNames
  }

  private migrate(): void {
    if (!this.db) throw new Error('Database not initialized')

    console.log('[Database] Starting migration...')

    this.db.exec('PRAGMA foreign_keys = ON')
    this.db.exec('PRAGMA journal_mode = WAL')
    this.db.exec('PRAGMA synchronous = NORMAL')

    SQL_CREATE_TABLES.forEach((sql) => {
      try {
        this.db?.exec(sql)
      } catch (err) {
        console.error('Failed to execute SQL:', sql, err)
      }
    })

    this.ensureTableHasAllColumns('prompts', PROMPTS_TABLE_COLUMNS)
    this.ensureTableHasAllColumns('prompt_categories', CATEGORIES_TABLE_COLUMNS)

    console.log('[Database] Migration completed')
  }

  private ensureTableHasAllColumns(tableName: string, expectedColumns: ColumnDef[]): void {
    if (!this.db) return

    const existingColumns = this.getExistingColumns(tableName)
    let columnsAdded = 0

    for (const col of expectedColumns) {
      if (!existingColumns.has(col.name.toLowerCase())) {
        try {
          let alterSql = `ALTER TABLE ${tableName} ADD COLUMN ${col.name} ${col.type}`
          if (col.defaultValue) {
            alterSql += ` DEFAULT ${col.defaultValue}`
          }
          this.db.exec(alterSql)
          console.log(`[Database] Added missing column ${col.name} to ${tableName} table`)
          columnsAdded++
        } catch (err) {
          console.error(`[Database] Failed to add column ${col.name} to ${tableName}:`, err)
        }
      }
    }

    if (columnsAdded > 0) {
      this.existingColumnCache.delete(tableName)
    }
  }

  /* ============================
     PROMPTS OPERATIONS
     ============================ */

  getAllPrompts(): Prompt[] {
    if (!this.db) return []
    const rows = this.db.prepare('SELECT * FROM prompts ORDER BY updatedAt DESC').all() as any[]
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

    const customParamsStr = JSON.stringify(prompt.customParameters || [])
    const quickPhrasesStr = JSON.stringify(prompt.quickPhrases || [])

    const tableInfo = this.db!
      .prepare("PRAGMA table_info(prompts)")
      .all() as { name: string; type: string }[]

    const actualColumnNames = tableInfo.map((col) => col.name)
    console.log('[Database] Actual columns in prompts table:', actualColumnNames)

    const columnValueMap: Record<string, any> = {
      id,
      name: prompt.name,
      avatar: prompt.avatar || '🤖',
      icon: prompt.icon || '',
      description: prompt.description || '',
      systemPrompt: prompt.systemPrompt || '',
      knowledgeBaseIds: serializeTags(prompt.knowledgeBaseIds ?? []),
      defaultModel: prompt.defaultModel || 'gpt-3.5-turbo',
      temperature: prompt.temperature ?? 0.7,
      topP: prompt.topP ?? 1.0,
      contextWindow: prompt.contextWindow ?? 8192,
      maxTokens: prompt.maxTokens ?? 4096,
      streamingEnabled: prompt.streamingEnabled !== undefined ? (prompt.streamingEnabled ? 1 : 0) : 1,
      toolCallMethod: prompt.toolCallMethod || 'function',
      customParameters: customParamsStr,
      mcpServerMode: prompt.mcpServerMode || 'auto',
      quickPhrases: quickPhrasesStr,
      globalMemoryEnabled: prompt.globalMemoryEnabled !== undefined ? (prompt.globalMemoryEnabled ? 1 : 0) : 0,
      categoryId: prompt.categoryId || '',
      createdAt: now,
      updatedAt: now
    }

    const columns: string[] = []
    const placeholders: string[] = []
    const values: any[] = []

    for (const actualColName of actualColumnNames) {
      if (columnValueMap.hasOwnProperty(actualColName)) {
        columns.push(actualColName)
        placeholders.push('?')
        values.push(columnValueMap[actualColName])
      }
    }

    console.log('[Database] Using columns for insert:', columns)
    console.log('[Database] Number of values:', values.length)

    if (columns.length === 0) {
      throw new Error('No columns found in prompts table')
    }

    const sql = `INSERT INTO prompts (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`
    console.log('[Database] Executing SQL:', sql)

    const stmt = this.db!.prepare(sql)
    stmt.run(...values)

    return this.getPrompt(id)!
  }

  updatePrompt(id: string, updates: Partial<Omit<Prompt, 'id' | 'createdAt'>>): boolean {
    if (!this.db) return false

    const tableInfo = this.db
      .prepare("PRAGMA table_info(prompts)")
      .all() as { name: string; type: string }[]

    const actualColumnNames = new Set(tableInfo.map((col) => col.name))
    console.log('[Database] Actual columns for update:', [...actualColumnNames])

    const fields: string[] = []
    const values: any[] = []

    const updateMap: Record<string, any> = {}

    if (updates.name !== undefined) updateMap['name'] = updates.name
    if (updates.avatar !== undefined) updateMap['avatar'] = updates.avatar
    if (updates.icon !== undefined) updateMap['icon'] = updates.icon
    if (updates.description !== undefined) updateMap['description'] = updates.description
    if (updates.systemPrompt !== undefined) updateMap['systemPrompt'] = updates.systemPrompt
    if (updates.knowledgeBaseIds !== undefined) updateMap['knowledgeBaseIds'] = serializeTags(updates.knowledgeBaseIds)
    if (updates.defaultModel !== undefined) updateMap['defaultModel'] = updates.defaultModel
    if (updates.temperature !== undefined) updateMap['temperature'] = updates.temperature
    if (updates.topP !== undefined) updateMap['topP'] = updates.topP
    if (updates.contextWindow !== undefined) updateMap['contextWindow'] = updates.contextWindow
    if (updates.maxTokens !== undefined) updateMap['maxTokens'] = updates.maxTokens
    if (updates.streamingEnabled !== undefined) updateMap['streamingEnabled'] = updates.streamingEnabled ? 1 : 0
    if (updates.toolCallMethod !== undefined) updateMap['toolCallMethod'] = updates.toolCallMethod
    if (updates.customParameters !== undefined) updateMap['customParameters'] = JSON.stringify(updates.customParameters)
    if (updates.mcpServerMode !== undefined) updateMap['mcpServerMode'] = updates.mcpServerMode
    if (updates.quickPhrases !== undefined) updateMap['quickPhrases'] = JSON.stringify(updates.quickPhrases)
    if (updates.globalMemoryEnabled !== undefined) updateMap['globalMemoryEnabled'] = updates.globalMemoryEnabled ? 1 : 0
    if (updates.categoryId !== undefined) updateMap['categoryId'] = updates.categoryId

    for (const [colName, value] of Object.entries(updateMap)) {
      if (actualColumnNames.has(colName)) {
        fields.push(`${colName} = ?`)
        values.push(value)
      }
    }

    if (fields.length === 0) {
      console.log('[Database] No fields to update')
      return false
    }

    if (actualColumnNames.has('updatedAt')) {
      fields.push('updatedAt = ?')
      values.push(Date.now())
    }

    values.push(id)

    const sql = `UPDATE prompts SET ${fields.join(', ')} WHERE id = ?`
    console.log('[Database] Executing update:', sql)

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
     PROMPT CATEGORIES OPERATIONS
     ============================ */

  getAllCategories(): PromptCategory[] {
    if (!this.db) return []
    const rows = this.db.prepare('SELECT * FROM prompt_categories ORDER BY "order" ASC, createdAt DESC').all() as any[]
    return rows.map((row) => this.mapCategoryRow(row))
  }

  getCategory(id: string): PromptCategory | null {
    if (!this.db) return null
    const row = this.db.prepare('SELECT * FROM prompt_categories WHERE id = ?').get(id) as any
    return row ? this.mapCategoryRow(row) : null
  }

  createCategory(category: InsertPromptCategory): PromptCategory {
    const now = Date.now()
    const id = `category_${now}_${Math.random().toString(36).slice(2, 10)}`

    if (category.parentId) {
      const parent = this.db
        ?.prepare('SELECT * FROM prompt_categories WHERE id = ?')
        .get(category.parentId) as any
      if (!parent) {
        throw new Error('Parent category not found')
      }
    }

    const level = category.parentId ? 'L2' : 'L1'

    const stmt = this.db?.prepare(`
      INSERT INTO prompt_categories (
        id, name, icon, color, description, "order", parentId, level, createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt?.run(
      id,
      category.name,
      category.icon || '📁',
      category.color || 'gray',
      category.description || '',
      category.order ?? 100,
      category.parentId || null,
      level,
      now,
      now
    )

    return this.getCategory(id)!
  }

  updateCategory(id: string, updates: Partial<Omit<InsertPromptCategory, 'id' | 'createdAt'>>): boolean {
    if (!this.db) return false

    const fields: string[] = []
    const values: any[] = []

    if (updates.name !== undefined) {
      fields.push('name = ?')
      values.push(updates.name)
    }
    if (updates.icon !== undefined) {
      fields.push('icon = ?')
      values.push(updates.icon)
    }
    if (updates.color !== undefined) {
      fields.push('color = ?')
      values.push(updates.color)
    }
    if (updates.description !== undefined) {
      fields.push('description = ?')
      values.push(updates.description)
    }
    if (updates.order !== undefined) {
      fields.push('"order" = ?')
      values.push(updates.order)
    }
    if (updates.parentId !== undefined) {
      if (updates.parentId === id) {
        throw new Error('Cannot set category as its own parent')
      }
      if (updates.parentId) {
        const descendants = this.getDescendantIds(id)
        if (descendants.includes(updates.parentId)) {
          throw new Error('Cannot move category to its own descendant')
        }
        const parent = this.db
          .prepare('SELECT * FROM prompt_categories WHERE id = ?')
          .get(updates.parentId) as any
        if (!parent) {
          throw new Error('Parent category not found')
        }
      }
      fields.push('parentId = ?')
      values.push(updates.parentId || null)
      fields.push('level = ?')
      values.push(updates.parentId ? 'L2' : 'L1')
    }

    if (fields.length === 0) return false

    fields.push('updatedAt = ?')
    values.push(Date.now())
    values.push(id)

    const sql = `UPDATE prompt_categories SET ${fields.join(', ')} WHERE id = ?`
    const stmt = this.db.prepare(sql)
    const result = stmt.run(...values)
    return result.changes > 0
  }

  moveCategory(id: string, targetParentId: string | null): boolean {
    if (!this.db) return false

    if (targetParentId === id) {
      throw new Error('Cannot move category to itself')
    }

    if (targetParentId) {
      const descendants = this.getDescendantIds(id)
      if (descendants.includes(targetParentId)) {
        throw new Error('Cannot move category to its own descendant')
      }
      const parent = this.db
        .prepare('SELECT * FROM prompt_categories WHERE id = ?')
        .get(targetParentId) as any
      if (!parent) {
        throw new Error('Target parent category not found')
      }
    }

    const stmt = this.db.prepare(`
      UPDATE prompt_categories 
      SET parentId = ?, level = ?, updatedAt = ? 
      WHERE id = ?
    `)
    const result = stmt.run(
      targetParentId || null,
      targetParentId ? 'L2' : 'L1',
      Date.now(),
      id
    )
    return result.changes > 0
  }

  getCategoryTree(): PromptCategory[] {
    if (!this.db) return []
    const allCategories = this.getAllCategories()
    return this.buildTree(allCategories)
  }

  private buildTree(categories: PromptCategory[]): PromptCategory[] {
    const map = new Map<string, PromptCategory>()
    const roots: PromptCategory[] = []

    for (const category of categories) {
      map.set(category.id, { ...category, children: [] })
    }

    for (const category of categories) {
      const node = map.get(category.id)!
      if (category.parentId && map.has(category.parentId)) {
        const parent = map.get(category.parentId)!
        if (!parent.children) parent.children = []
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    }

    return this.sortTree(roots)
  }

  private sortTree(nodes: PromptCategory[]): PromptCategory[] {
    const sorted = nodes.sort((a, b) => (a.order || 0) - (b.order || 0))
    for (const node of sorted) {
      if (node.children && node.children.length > 0) {
        node.children = this.sortTree(node.children)
      }
    }
    return sorted
  }

  private getDescendantIds(id: string): string[] {
    if (!this.db) return []
    const ids: string[] = []
    const queue: string[] = [id]

    while (queue.length > 0) {
      const currentId = queue.shift()!
      const children = this.db
        .prepare('SELECT id FROM prompt_categories WHERE parentId = ?')
        .all(currentId) as { id: string }[]
      for (const child of children) {
        ids.push(child.id)
        queue.push(child.id)
      }
    }

    return ids
  }

  deleteCategory(id: string): boolean {
    if (!this.db) return false

    const hasChildren = this.db
      .prepare('SELECT COUNT(*) as count FROM prompt_categories WHERE parentId = ?')
      .get(id) as any

    if (hasChildren.count > 0) {
      throw new Error(`Cannot delete category: it has ${hasChildren.count} child categories`)
    }

    const usedByPrompts = this.db.prepare('SELECT COUNT(*) as count FROM prompts WHERE categoryId = ?').get(id) as any
    if (usedByPrompts.count > 0) {
      const updateStmt = this.db.prepare('UPDATE prompts SET categoryId = NULL WHERE categoryId = ?')
      updateStmt.run(id)
    }

    const stmt = this.db.prepare('DELETE FROM prompt_categories WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }

  /* ============================
     CONVERSATIONS OPERATIONS
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

    const stmt = this.db?.prepare(`
      INSERT INTO conversations (id, title, promptId, model, provider, createdAt, updatedAt, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt?.run(
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

    const stmt = this.db?.prepare(`
      INSERT INTO messages (id, conversationId, role, content, tokens, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    stmt?.run(id, message.conversationId, message.role, message.content, message.tokens || null, now)

    return {
      ...message,
      id,
      createdAt: now
    }
  }

  updateMessage(id: string, updates: Partial<Omit<Message, 'id' | 'conversationId' | 'createdAt'>>): boolean {
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
        INNER JOIN conversations c ON c.id = m.conversationId
        WHERE c.promptId = ?
        ORDER BY m.createdAt ASC
      `
      )
      .all(promptId) as any[]
    return rows.map((row) => this.mapMessageRow(row))
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
                  const newConversation = this.createConversation({
                    title,
                    model,
                    provider,
                    tags
                  })
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
    this.db.exec('DELETE FROM prompts')
    this.db.exec('DELETE FROM prompt_categories')
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
      avatar: row.avatar || '🤖',
      icon: row.icon || undefined,
      description: row.description || undefined,
      systemPrompt: row.systemPrompt || undefined,
      knowledgeBaseIds: row.knowledgeBaseIds ? parseTags(row.knowledgeBaseIds) : [],
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

  private mapCategoryRow(row: any): PromptCategory {
    return {
      id: row.id,
      name: row.name,
      icon: row.icon || undefined,
      color: row.color || undefined,
      description: row.description || undefined,
      order: row.order || 100,
      parentId: row.parentId || undefined,
      level: row.level || 'L1',
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
      role: row.role as ChatRole,
      content: row.content,
      tokens: row.tokens || undefined,
      createdAt: row.createdAt
    }
  }
}

const dbService = new DatabaseService()

export function getDatabase() {
  dbService.initialize()
  return dbService
}

export function closeDatabase() {
  dbService.close()
}
