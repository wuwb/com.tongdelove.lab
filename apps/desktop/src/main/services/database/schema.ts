export interface DBTables {
  prompts: {
    id: string
    name: string
    avatar: string
    icon: string
    description: string
    systemPrompt: string
    knowledgeBaseIds: string
    defaultModel: string
    temperature: number
    topP: number
    contextWindow: number
    maxTokens: number
    streamingEnabled: number
    toolCallMethod: string
    customParameters: string
    mcpServerMode: string
    quickPhrases: string
    globalMemoryEnabled: number
    categoryId: string
    createdAt: number
    updatedAt: number
  }

  prompt_categories: {
    id: string
    name: string
    icon: string
    color: string
    description: string
    order: number
    parentId: string | null
    level: string
    createdAt: number
    updatedAt: number
  }

  conversations: {
    id: string
    title: string
    promptId: string
    model: string
    provider: string
    createdAt: number
    updatedAt: number
    tags: string
  }

  messages: {
    id: string
    conversationId: string
    role: string
    content: string
    tokens: number
    createdAt: number
  }
}

export const SQL_CREATE_TABLES = [
  `CREATE TABLE IF NOT EXISTS prompts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT DEFAULT '🤖',
    icon TEXT,
    description TEXT,
    systemPrompt TEXT,
    knowledgeBaseIds TEXT,
    defaultModel TEXT,
    temperature REAL DEFAULT 0.7,
    topP REAL DEFAULT 1.0,
    contextWindow INTEGER DEFAULT 8192,
    maxTokens INTEGER DEFAULT 4096,
    streamingEnabled INTEGER DEFAULT 1,
    toolCallMethod TEXT DEFAULT 'function',
    customParameters TEXT,
    mcpServerMode TEXT DEFAULT 'auto',
    quickPhrases TEXT,
    globalMemoryEnabled INTEGER DEFAULT 0,
    categoryId TEXT,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS prompt_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '📁',
    color TEXT DEFAULT 'gray',
    description TEXT,
    "order" INTEGER DEFAULT 100,
    parentId TEXT,
    level TEXT DEFAULT 'L1',
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    FOREIGN KEY (parentId) REFERENCES prompt_categories(id) ON DELETE SET NULL
  )`,

  `CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    promptId TEXT,
    model TEXT NOT NULL,
    provider TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    updatedAt INTEGER NOT NULL,
    tags TEXT,
    FOREIGN KEY (promptId) REFERENCES prompts(id) ON DELETE SET NULL
  )`,

  `CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversationId TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tokens INTEGER,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE
  )`,

  'CREATE INDEX IF NOT EXISTS idx_conversations_updatedAt ON conversations(updatedAt DESC)',
  'CREATE INDEX IF NOT EXISTS idx_conversations_promptId ON conversations(promptId)',
  'CREATE INDEX IF NOT EXISTS idx_messages_conversationId ON messages(conversationId)',
  'CREATE INDEX IF NOT EXISTS idx_messages_createdAt ON messages(createdAt DESC)',
  'CREATE INDEX IF NOT EXISTS idx_prompts_categoryId ON prompts(categoryId)',
  'CREATE INDEX IF NOT EXISTS idx_prompts_updatedAt ON prompts(updatedAt DESC)',
  'CREATE INDEX IF NOT EXISTS idx_prompt_categories_order ON prompt_categories("order")'
]

export function parseTags(tagsString: string | null): string[] {
  if (!tagsString) return []
  return tagsString
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

export function serializeTags(tags: string[]): string {
  if (!tags || tags.length === 0) return ''
  return tags.join(',')
}
