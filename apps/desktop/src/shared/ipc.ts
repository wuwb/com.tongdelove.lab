export const IPC = {
  WINDOW: {
    MINIMIZE: 'window:minimize',
    MAXIMIZE: 'window:maximize',
    UNMAXIMIZE: 'window:unmaximize',
    CLOSE: 'window:close'
  },
  AI: {
    START: 'ai:chat:start',
    CANCEL: 'ai:chat:cancel',
    CHUNK: 'ai:chat:chunk'
  },
  SETTINGS: {
    GET: 'settings:get',
    SET: 'settings:set'
  },
  DATABASE: {
    // Prompts
    PROMPTS_GET_ALL: 'database:prompts:get-all',
    PROMPT_GET: 'database:prompt:get',
    PROMPT_CREATE: 'database:prompt:create',
    PROMPT_UPDATE: 'database:prompt:update',
    PROMPT_DELETE: 'database:prompt:delete',

    // Conversations
    CONVERSATIONS_GET_ALL: 'database:conversations:get-all',
    CONVERSATION_GET: 'database:conversation:get',
    CONVERSATION_CREATE: 'database:conversation:create',
    CONVERSATION_UPDATE: 'database:conversation:update',
    CONVERSATION_DELETE: 'database:conversation:delete',
    CONVERSATION_GET_ASSISTANT_SESSIONS: 'database:conversation:get-prompt-conversations',
    CONVERSATION_GET_BY_TAG: 'database:conversation:get-by-tag',

    // Messages
    MESSAGES_GET: 'database:messages:get',
    MESSAGES_GET_FOR_PROMPT: 'database:messages:get-for-prompt',
    MESSAGES_GET_ALL: 'database:messages:get-all',
    MESSAGE_CREATE: 'database:message:create',
    MESSAGE_UPDATE: 'database:message:update',

    // Assistants
    ASSISTANTS_GET_ALL: 'database:assistants:get-all',
    ASSISTANT_GET: 'database:assistant:get',
    ASSISTANT_CREATE: 'database:assistant:create',
    ASSISTANT_UPDATE: 'database:assistant:update',
    ASSISTANT_DELETE: 'database:assistant:delete',

    // Export/Import
    EXPORT_CONVERSATION: 'database:export-conversation',
    EXPORT_ALL: 'database:export-all',
    IMPORT_LOCALSTORAGE: 'database:import-localstorage',
    CLEAR_ALL: 'database:clear-all'
  },
  OLLAMA: {
    LIST_MODELS: 'ollama:list-models'
  },
  VERSION: {
    GET: 'version:get',
    GET_ALL: 'version:get-all',
    CHECK: 'version:check',
    CHECK_ALL: 'version:check-all',
    INSTALL: 'version:install',
    UPDATE: 'version:update',
    UPDATE_ALL: 'version:update-all',
    GET_CONFIG: 'version:get-config',
    SET_CONFIG: 'version:set-config'
  },
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
