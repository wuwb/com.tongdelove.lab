import { useState, useEffect, useCallback } from 'react'
import type { Conversation, CreateConversationParams } from '../types/chat'
import type { ChatMessage, ProviderName, Message as DBMessage } from '../../shared/ipc'

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [messagesCache, setMessagesCache] = useState<Map<string, DBMessage[]>>(new Map())

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const dbConversations = await window.api.database.getAllConversations()
      setConversations(
        dbConversations.map((s) => ({
          id: s.id,
          title: s.title,
          model: s.model,
          provider: s.provider,
          messages: [], // 将异步加载
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          tags: s.tags
        }))
      )
    } catch (e) {
      console.error('Failed to load conversations from database', e)
    }
  }

  const loadConversationMessages = async (conversationId: string): Promise<DBMessage[]> => {
    if (messagesCache.has(conversationId)) {
      return messagesCache.get(conversationId)!
    }

    try {
      const messages = await window.database.getMessages(conversationId)
      setMessagesCache((prev) => new Map(prev).set(conversationId, messages))
      return messages
    } catch (e) {
      console.error('Failed to load messages for conversation', conversationId, e)
      return []
    }
  }

  const createConversation = async (params: CreateConversationParams) => {
    try {
      const newConversation = await window.database.createConversation({
        title: 'New Chat',
        model: params.model,
        provider: params.provider
      })
      const createdConversation: Conversation = {
        id: newConversation.id,
        title: newConversation.title,
        model: newConversation.model,
        provider: newConversation.provider,
        messages: [],
        createdAt: newConversation.createdAt,
        updatedAt: newConversation.updatedAt,
        tags: newConversation.tags
      }
      setConversations((prev) => [createdConversation, ...prev])
      setActiveConversationId(newConversation.id)
      return newConversation.id
    } catch (e) {
      console.error('Failed to create conversation', e)
      return ''
    }
  }

  const deleteConversation = async (id: string) => {
    try {
      await window.database.deleteConversation(id)
      setConversations((prev) => prev.filter((s) => s.id !== id))
      setMessagesCache((prev) => {
        const next = new Map(prev)
        next.delete(id)
        return next
      })
      if (activeConversationId === id) {
        setActiveConversationId(null)
      }
    } catch (e) {
      console.error('Failed to delete conversation', id, e)
    }
  }

  const updateConversation = async (id: string, updates: Partial<Conversation>) => {
    try {
      // 提取tags字段,转换为数据库需要的格式
      const { messages, ...otherUpdates } = updates
      const dbUpdates = {
        ...otherUpdates,
        tags: updates.tags || []
      }
      await window.database.updateConversation(id, dbUpdates)
      setConversations((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s))
      )
    } catch (e) {
      console.error('Failed to update conversation', id, e)
    }
  }

  const addMessage = useCallback(
    async (
      conversationId: string,
      message: ChatMessage,
      modelUpdate?: { model?: string; provider?: ProviderName }
    ) => {
      const conversation = conversations.find((s) => s.id === conversationId)
      if (!conversation) return

      try {
        // 创建数据库消息
        const dbMessage = await window.database.createMessage({
          conversationId,
          role: message.role,
          content: message.content
        })

        // 更新消息缓存
        const cachedMessages = messagesCache.get(conversationId) || []
        const newMessages = [...cachedMessages, dbMessage]
        setMessagesCache((prev) => new Map(prev).set(conversationId, newMessages))

        // 如果是第一条用户消息，更新标题
        let title = conversation.title
        const currentMessages = newMessages
        if (currentMessages.length === 1 && message.role === 'user') {
          title = message.content.slice(0, 30)
          await window.database.updateConversation(conversationId, { title })
        }

        // 更新model/provider
        if (modelUpdate) {
          await window.database.updateConversation(conversationId, modelUpdate)
        }

        // 更新本地状态
        setConversations((prev) =>
          prev.map((s) =>
            s.id === conversationId
              ? { ...s, title, messages: newMessages, ...modelUpdate, updatedAt: Date.now() }
              : s
          )
        )
      } catch (e) {
        console.error('Failed to add message', e)
      }
    },
    [conversations, messagesCache]
  )

  const activeConversation = conversations.find((s) => s.id === activeConversationId)

  return {
    conversations,
    activeConversationId,
    activeConversation,
    setActiveConversationId,
    loadConversationMessages,
    createConversation,
    deleteConversation,
    updateConversation,
    addMessage
  }
}
