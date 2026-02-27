/**
 * Database Schema Definitions for AI Chat Application
 * SQLite Database Schema for storing prompts, conversations, and messages
 */

/**
 * Schema Version: 2
 * Database File: chat.db
 * Storage Location: app.getPath('userData')/chat.db
 */

export interface DBTables {
  /* =========================================
     PROMPTS TABLE - prompt配置
     ========================================= */
  prompts: {
    id: string           // TEXT PRIMARY KEY
    name: string          // TEXT NOT NULL
    description: string    // TEXT
    icon: string          // TEXT (emoji or icon name)
    color: string         // TEXT (CSS color name/value)
    prompt: string        // TEXT (system prompt for this prompt)
    provider: string      // TEXT (llm provider: openai, anthropic, google, ollama)
    model: string         // TEXT (model name used by this prompt)
    settings: string       // TEXT (JSON string - additional config)
    createdAt: number     // INTEGER NOT NULL (timestamp ms)
    updatedAt: number     // INTEGER NOT NULL (timestamp ms)
    tags: string          // TEXT (comma-separated tags for easy querying)
  }

  /* =========================================
     ASSISTANTS TABLE - 助手库
     ========================================= */
  assistants: {
    id: string
    name: string
    avatar: string
    icon: string
    description: string
    systemPrompt: string
    knowledgeBaseIds: string  // TEXT (comma-separated knowledge base IDs)
    defaultModel: string
    temperature: number
    topP: number
    contextWindow: number
    maxTokens: number
    streamingEnabled: number  // BOOLEAN: 0 or 1
    toolCallMethod: string  // 'function' or 'prompt'
    customParameters: string  // TEXT (JSON string)
    mcpServerMode: string  // 'disabled', 'auto', 'manual'
    quickPhrases: string  // TEXT (JSON string)
    globalMemoryEnabled: number  // BOOLEAN: 0 or 1
    categoryId: string
    createdAt: number
    updatedAt: number
  }

  /* =========================================
     ASSISTANT_CATEGORIES TABLE - 助手分类
     ========================================= */
  assistant_categories: {
    id: string
    name: string
    icon: string
    color: string
    description: string
    order: number
    createdAt: number
    updatedAt: number
  }
}

export const SQL_CREATE_TABLES = [
  'CREATE TABLE IF NOT EXISTS prompts (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT, icon TEXT, color TEXT, prompt TEXT, provider TEXT DEFAULT "openai", model TEXT DEFAULT "gpt-3.5-turbo", settings TEXT, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL, tags TEXT)',
  'CREATE TABLE IF NOT EXISTS conversations (id TEXT PRIMARY KEY, title TEXT NOT NULL, promptId TEXT, model TEXT NOT NULL, provider TEXT NOT NULL, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL, tags TEXT, FOREIGN KEY (promptId) REFERENCES prompts(id) ON DELETE SET NULL)',
  'CREATE TABLE IF NOT EXISTS messages (id TEXT PRIMARY KEY, conversationId TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ("user", "assistant", "system")), content TEXT NOT NULL, tokens INTEGER, createdAt INTEGER NOT NULL, FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE)',
  'CREATE TABLE IF NOT EXISTS assistants (id TEXT PRIMARY KEY, name TEXT NOT NULL, avatar TEXT DEFAULT "🤖", icon TEXT, description TEXT, systemPrompt TEXT, knowledgeBaseIds TEXT, defaultModel TEXT, temperature REAL DEFAULT 0.7, topP REAL DEFAULT 1.0, contextWindow INTEGER DEFAULT 8192, maxTokens INTEGER DEFAULT 4096, streamingEnabled INTEGER DEFAULT 1, toolCallMethod TEXT DEFAULT "function", customParameters TEXT, mcpServerMode TEXT DEFAULT "auto", quickPhrases TEXT, globalMemoryEnabled INTEGER DEFAULT 0, categoryId TEXT, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL)',
  'CREATE TABLE IF NOT EXISTS assistant_categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, icon TEXT DEFAULT "📁", color TEXT DEFAULT "gray", description TEXT, order INTEGER DEFAULT 100, createdAt INTEGER NOT NULL, updatedAt INTEGER NOT NULL)',
  'CREATE INDEX IF NOT EXISTS idx_conversations_updatedAt ON conversations(updatedAt DESC)',
  'CREATE INDEX IF NOT EXISTS idx_conversations_promptId ON conversations(promptId)',
  'CREATE INDEX IF NOT EXISTS idx_messages_conversationId ON messages(conversationId) DESC',
  'CREATE INDEX IF NOT EXISTS idx_messages_createdAt ON messages(createdAt DESC)',
  'CREATE INDEX IF NOT EXISTS idx_assistants_categoryId ON assistants(categoryId)',
  'CREATE INDEX IF NOT EXISTS idx_assistants_updatedAt ON assistants(updatedAt DESC)',
  'CREATE INDEX IF NOT EXISTS idx_assistant_categories_order ON assistant_categories(order)'
]
export function parseTags(tagsString: string | null): string[] {
  if (!tagsString) return []
  return tagsString.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
}

export function serializeTags(tags: string[]): string {
  if (!tags || tags.length === 0) return ''
  return tags.join(',')
}
