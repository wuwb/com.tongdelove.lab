import type { ChatMessage, ProviderName } from '../../../shared/ipc'

export interface Conversation {
  id: string
  title: string
  model: string
  provider: ProviderName
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export type CreateConversationParams = Pick<Conversation, 'model' | 'provider'>

export interface Prompt {
  id: string
  name: string
  description: string
  icon?: any
  color?: string
  provider?: ProviderName
}
