export const IPC_CHANNELS = {
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_UNMAXIMIZE: 'window:unmaximize',
  WINDOW_CLOSE: 'window:close',

  AI_START: 'ai:chat:start',
  AI_CANCEL: 'ai:chat:cancel',
  AI_CHUNK: 'ai:chat:chunk',

  SETTINGS_GET: 'settings:get',
  SETTINGS_SET: 'settings:set',

  // Prompts (完整版 - 原 Assistant)
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
  DATABASE_CONVERSATION_GET_PROMPT_CONVERSATIONS: 'database:conversation:get-prompt-conversations',
  DATABASE_CONVERSATION_GET_BY_TAG: 'database:conversation:get-by-tag',

  // Messages
  DATABASE_MESSAGES_GET: 'database:messages:get',
  DATABASE_MESSAGES_GET_FOR_PROMPT: 'database:messages:get-for-prompt',
  DATABASE_MESSAGES_GET_ALL: 'database:messages:get-all',
  DATABASE_MESSAGE_CREATE: 'database:message:create',
  DATABASE_MESSAGE_UPDATE: 'database:message:update',

  // Categories (Prompt 分类)
  DATABASE_CATEGORIES_GET_ALL: 'database:categories:get-all',
  DATABASE_CATEGORIES_GET_TREE: 'database:categories:get-tree',
  DATABASE_CATEGORY_GET: 'database:category:get',
  DATABASE_CATEGORY_CREATE: 'database:category:create',
  DATABASE_CATEGORY_UPDATE: 'database:category:update',
  DATABASE_CATEGORY_MOVE: 'database:category:move',
  DATABASE_CATEGORY_DELETE: 'database:category:delete',

  // Export/Import
  DATABASE_EXPORT_CONVERSATION: 'database:export-conversation',
  DATABASE_EXPORT_ALL: 'database:export-all',
  DATABASE_IMPORT_LOCALSTORAGE: 'database:import-localstorage',
  DATABASE_CLEAR_ALL: 'database:clear-all',

  OLLAMA_LIST_MODELS: 'ollama:list-models',

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
}

export type OllamaModel = {
  name: string
  modified_at: string
  size: number
  digest: string
  details?: {
    format: string
    families?: string[]
    parameter_size: string
    quantization_level: string
  }
}

export type ModelType = 'vision' | 'websearch' | 'reasoning' | 'tools' | 'reranking' | 'embedding'

export type ModelConfig = {
  id: string
  name: string
  groupId: string
  types: ModelType[]
  supportsStreaming: boolean
  currency?: string
  inputPrice?: number
  outputPrice?: number
}

export type ProviderApiSettings = {
  supportsArrayMessageContent: boolean
  supportsDeveloperMessage: boolean
  supportsStreamOptions: boolean
  supportsServiceTier: boolean
  supportsEnableThinking: boolean
  supportsVerbosity: boolean
  cacheTokenThreshold: number
}

export type ProviderConfig = {
  id: string
  name: string
  type: string
  avatar: string
  enabled: boolean
  baseUrl: string
  apiKeys: string[]
  defaultModel?: string
  models: ModelConfig[]
  apiSettings: ProviderApiSettings
  remark?: string
  officialUrl?: string
}

export type AppSettings = {
  apiKeys: {
    [key: string]: string
  }
  models: {
    [key: string]: string
  }
  providers: {
    customProviders: ProviderConfig[]
    providerOrder: string[]
  }
  theme?: 'light' | 'dark'
}

export type PromptCustomParameter = {
  name: string
  type: 'number' | 'text' | 'boolean' | 'json'
  value: any
}

export type QuickPhrase = {
  title: string
  content: string
}

export type Prompt = {
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
  customParameters?: PromptCustomParameter[]
  mcpServerMode?: 'disabled' | 'auto' | 'manual'
  quickPhrases?: QuickPhrase[]
  globalMemoryEnabled?: boolean
  categoryId?: string
  createdAt: number
  updatedAt: number
}

export type PromptCategory = {
  id: string
  name: string
  icon?: string
  color?: string
  description?: string
  order?: number
  parentId?: string | null
  level?: string
  createdAt: number
  updatedAt: number
  children?: PromptCategory[]
}

export type InsertPrompt = Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>
export type InsertPromptCategory = Omit<PromptCategory, 'id' | 'createdAt' | 'updatedAt'>

export type Conversation = {
  id: string
  title: string
  promptId?: string
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
  createdAt: number
}

export type InsertConversation = Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>
export type InsertMessage = Omit<Message, 'id' | 'createdAt'>

export type IpcResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}

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
