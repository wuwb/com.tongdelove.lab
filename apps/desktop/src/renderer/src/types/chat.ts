import type { ChatMessage, ProviderName } from '../../../shared/ipc'

export interface Session {
  id: string
  title: string
  model: string
  provider: ProviderName
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export type CreateSessionParams = Pick<Session, 'model' | 'provider'>

export interface Assistant {
  id: string
  name: string
  description: string
  icon?: any
  color?: string
  provider?: ProviderName
}
