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
