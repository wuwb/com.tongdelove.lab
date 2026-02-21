export const IPC = {
  AI: {
    START: 'ai:chat:start',
    CANCEL: 'ai:chat:cancel',
    CHUNK: 'ai:chat:chunk'
  },
  SETTINGS: {
    GET: 'settings:get',
    SET: 'settings:set'
  }
} as const

export type ProviderName = 'mock' | 'openai' | 'anthropic' | 'google' | 'ollama'

export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessage = {
  role: ChatRole
  content: string
}

export type ChatStreamRequest = {
  sessionId: string
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
  sessionId: string
  delta: string
  done?: boolean
  usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number }
  error?: string
}

export type AppSettings = {
  apiKeys: {
    openai?: string
    anthropic?: string
    google?: string
    ollama?: string
  }
  models: {
    openai?: string
    anthropic?: string
    google?: string
    ollama?: string
  }
  providers: {
    [key: string]: any
  }
}
