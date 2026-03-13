export const IPC_CANNELS = {
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_UNMAXIMIZE: 'window:unmaximize',
  WINDOW_CLOSE: 'window:close',

  AI_START: 'ai:chat:start',
  AI_CANCEL: 'ai:chat:cancel',
  AI_CHUNK: 'ai:chat:chunk',

  SETTINGS_GET: 'settings:get',
  SETTINGS_SET: 'settings:set',

  // Prompts
  DATABASE_PROMPTS_GET_ALL: 'database:prompts:get-all',
  DATABASE_PROMPT_GET: 'database:prompt:get',
  DATABASE_PROMPT_CREATE: 'database:prompt:create',
  DATABASE_PROMPT_UPDATE: 'database:prompt:update',
  DATABASE_PROMPT_DELETE: 'database:prompt:delete',

  // Conversations
  DATABASE_CONVERSATIONS_GET_ALL: 'database:conversations:get-all',
  DATABASE_CONVERSATION_GET: 'database:conversation:get',
  DATABASE_CONVERSATION_CREATE: 'database:conversation:create',
  DATABASE_CONVERSATION_UPDATE: 'database:conversation:update',
  DATABASE_CONVERSATION_DELETE: 'database:conversation:delete',
  DATABASE_CONVERSATION_GET_ASSISTANT_SESSIONS: 'database:conversation:get-prompt-conversations',
  DATABASE_CONVERSATION_GET_BY_TAG: 'database:conversation:get-by-tag',

  // Messages
  DATABASE_MESSAGES_GET: 'database:messages:get',
  DATABASE_MESSAGES_GET_FOR_PROMPT: 'database:messages:get-for-prompt',
  DATABASE_MESSAGES_GET_ALL: 'database:messages:get-all',
  DATABASE_MESSAGE_CREATE: 'database:message:create',
  DATABASE_MESSAGE_UPDATE: 'database:message:update',

  // Assistants
  DATABASE_ASSISTANTS_GET_ALL: 'database:assistants:get-all',
  DATABASE_ASSISTANT_GET: 'database:assistant:get',
  DATABASE_ASSISTANT_CREATE: 'database:assistant:create',
  DATABASE_ASSISTANT_UPDATE: 'database:assistant:update',
  DATABASE_ASSISTANT_DELETE: 'database:assistant:delete',

  // Categories
  DATABASE_CATEGORIES_GET_ALL: 'database:categories:get-all',
  DATABASE_CATEGORY_GET: 'database:category:get',
  DATABASE_CATEGORY_CREATE: 'database:category:create',
  DATABASE_CATEGORY_UPDATE: 'database:category:update',
  DATABASE_CATEGORY_DELETE: 'database:category:delete',

  // Export/Import
  DATABASE_EXPORT_CONVERSATION: 'database:export-conversation',
  DATABASE_EXPORT_ALL: 'database:export-all',
  DATABASE_IMPORT_LOCALSTORAGE: 'database:import-localstorage',
  DATABASE_CLEAR_ALL: 'database:clear-all',

  OLLAMA_LIST_MODELS: 'ollama:list-models',

  // version
  VERSION_GET: 'version:get',
  VERSION_GET_ALL: 'version:get-all',
  VERSION_CHECK: 'version:check',
  VERSION_CHECK_ALL: 'version:check-all',
  VERSION_INSTALL: 'version:install',
  VERSION_UPDATE: 'version:update',
  VERSION_UPDATE_ALL: 'version:update-all',
  VERSION_GET_CONFIG: 'version:get-config',
  VERSION_SET_CONFIG: 'version:set-config'
} as const

export type ProviderName = 'mock' | 'openai' | 'anthropic' | 'google' | 'ollama'

export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessage = {
  role: ChatRole
  content: string
}

export type ChatStreamRequest = {
  conversationId: string
  model: string
  provider?: ProviderName
  messages: ChatMessage[]
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    max_tokens?: number
    [key: string]: any
  }
}

export type ChatChunk = {
  conversationId: string
  delta: string
  done?: boolean
  usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number }
  error?: string
  error?: string
}

// Ollama Model Types
export type OllamaModel = {
  name: string
  modified_at: string
  size: number
  digest: string
  details?: {
    format: string
    families?: string[]
    families?: string[]
    parameter_size: string
    quantization_level: string
  }
}

// Model Types

// Model Types
export type ModelType = 'vision' | 'websearch' | 'reasoning' | 'tools' | 'reranking' | 'embedding'

export type ModelConfig = {
  id: string // The unique identifier (e.g., 'gpt-4', 'claude-3-opus-20240229')
  name: string // Display name (e.g., 'GPT-4', 'Claude 3 Opus')
  groupId: string // Group name for organization in UI
  types: ModelType[] // Model capabilities (can be multiple)
  supportsStreaming: boolean // Whether incremental text output is supported
  currency?: string // Pricing currency (e.g., 'USD', 'CNY')
  inputPrice?: number // Price per input token
  outputPrice?: number // Price per output token
}

// Provider API Settings
export type ProviderApiSettings = {
  supportsArrayMessageContent: boolean // Support array format in message content
  supportsDeveloperMessage: boolean // Support Developer Message in system messages
  supportsStreamOptions: boolean // Support stream_options parameter
  supportsServiceTier: boolean // Support service_tier parameter
  supportsEnableThinking: boolean // Support enable_thinking parameter
  supportsVerbosity: boolean // Support verbosity parameter
  cacheTokenThreshold: number // Cache messages exceeding this token count (0 = disabled)
}

export type ProviderConfig = {
  id: string
  name: string
  type: string // Provider type: openai, anthropic, etc.
  avatar: string // Emoji or image URL
  enabled: boolean // Whether the provider is enabled
  baseUrl: string // API base URL
  apiKeys: string[] // Array of API keys
  defaultModel?: string
  models: ModelConfig[] // Array of models configured for this provider
  apiSettings: ProviderApiSettings // Additional API settings
  remark?: string // Service provider remarks/notes
  officialUrl?: string // Official website URL
}

export type AppSettings = {
  apiKeys: {
    [key: string]: string // Deprecated: keys stored in providers now
  }
  models: {
    [key: string]: string // Deprecated: models stored in providers now
  }
  providers: {
    customProviders: ProviderConfig[]
    providerOrder: string[] // Service provider ID order
  }
  theme?: 'light' | 'dark'
}

// Assistant Types
export type AssistantCustomParameter = {
  name: string
  type: 'number' | 'text' | 'boolean' | 'json'
  value: any
}

export type QuickPhrase = {
  title: string
  content: string
}

export type Assistant = {
  id: string
  name: string
  avatar?: string
  icon?: string
  description?: string
  systemPrompt?: string
  knowledgeBaseIds?: string[]
  defaultModel?: string
  temperature?: number
  topP?: number
  contextWindow?: number
  maxTokens?: number
  streamingEnabled?: boolean
  toolCallMethod?: 'function' | 'prompt'
  customParameters?: AssistantCustomParameter[]
  mcpServerMode?: 'disabled' | 'auto' | 'manual'
  quickPhrases?: QuickPhrase[]
  globalMemoryEnabled?: boolean
  categoryId?: string
  createdAt: number
  updatedAt: number
}

export type AssistantCategory = {
  id: string
  name: string
  icon?: string
  color?: string
  description?: string
  order?: number
  createdAt: number
  updatedAt: number
}

export type InsertAssistant = Omit<Assistant, 'id' | 'createdAt' | 'updatedAt'>
export type InsertAssistantCategory = Omit<AssistantCategory, 'id' | 'createdAt' | 'updatedAt'>

// Database Types
export type Prompt = {
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

export type Conversation = {
  id: string
  title: string
  promptId?: string
  assistantId?: string
  model: string
  provider: string
  createdAt: number
  updatedAt: number
  tags?: string[]
}

export type Message = {
  id: string
  conversationId: string
  role: ChatRole
  content: string
  tokens?: number
  assistantId?: string
  createdAt: number
}

export type InsertPrompt = Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>
export type InsertConversation = Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>
export type InsertMessage = Omit<Message, 'id' | 'createdAt'>

// IPC Response Types
export type IpcResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

// Version Types
export type VersionStatus = 'installed' | 'not_installed' | 'error'

export type VersionInfo = {
  name: string
  version: string | null
  latestVersion: string | null
  error: string | null
  status: VersionStatus
  path?: string
  lastChecked?: string
  updateAvailable?: boolean
}

export type VersionConfig = {
  versionCheckInterval: number
  autoUpdateEnabled: boolean
}

export type VersionUpdateResult = {
  name: string
  success: boolean
}
