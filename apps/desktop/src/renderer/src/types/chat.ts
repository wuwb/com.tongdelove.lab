import type { ChatMessage } from '../../../shared/ipc'

export interface Session {
  id: string
  title: string
  model: string
  provider: 'mock' | 'openai' | 'ollama'
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export type CreateSessionParams = Pick<Session, 'model' | 'provider'>

export interface Assistant {
  id: string
  name: string
  description: string
  icon?: any // lucide icon component or string url
  color?: string
}
