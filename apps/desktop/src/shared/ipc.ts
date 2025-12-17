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

export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessage = {
  role: ChatRole
  content: string
}

export type ChatRequest = {
  sessionId: string
  model: string
  messages: ChatMessage[]
  options?: { temperature?: number; top_p?: number }
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
    ollama?: string
  }
  models: {
    openai?: string
    ollama?: string
  }
}