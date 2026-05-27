import { useCallback, useEffect, useState } from 'react'
import { useConversations } from '../../hooks/useConversations'
import { useSettings } from '../../hooks/useSettings'
import { useAiChat } from '../../hooks/useAiChat'
import { PromptList } from '../../components/prompt/PromptList'
import { TopicList } from '../../components/chat/TopicList'
import { MessageList } from '../../components/chat/MessageList'
import { ChatInput } from '../../components/chat/ChatInput'
import { ModelSelector } from '../../components/chat/ModelSelector'
import { BotSelector } from '../../components/chat/BotSelector'
import type { ChatMessage, ProviderName, Prompt } from '@/shared/ipc'

export const Chat = () => {
  const {
    conversations,
    activeConversationId,
    activeConversation,
    setActiveConversationId,
    createConversation,
    deleteConversation,
    addMessage
  } = useConversations()

  const { settings } = useSettings()
  const [currentProvider, setCurrentProvider] = useState<ProviderName>('openai')
  const [currentModel, setCurrentModel] = useState('')

  useEffect(() => {
    if (activeConversation) {
      setCurrentModel(activeConversation.model)
      setCurrentProvider(activeConversation.provider || 'openai')
    } else if (!currentModel) {
      setCurrentProvider('openai')
      setCurrentModel(settings.models.openai || 'gpt-4o')
    }
  }, [activeConversation])

  const handleFinish = useCallback(
    (content: string) => {
      if (activeConversationId) {
        addMessage(activeConversationId, { role: 'assistant', content })
      }
    },
    [activeConversationId, addMessage]
  )

  const { text, loading, start, cancel } = useAiChat(activeConversationId || '', handleFinish)

  const handleSend = async (content: string) => {
    let conversationId = activeConversationId
    const provider = currentProvider
    const model = currentModel || settings.models[provider] || 'gpt-4o'

    if (!conversationId) {
      conversationId = createConversation({ model, provider })
      setCurrentModel(model)
      setActiveConversationId(conversationId)
    }

    const userMsg: ChatMessage = { role: 'user', content }

    const history = activeConversation ? [...activeConversation.messages] : []
    history.push(userMsg)

    await start(model, history, provider, conversationId)

    addMessage(conversationId!, userMsg, { model, provider })
  }

  return (
    <div className="flex h-full flex-1 flex-row">
      <PromptList />

      <div>
        <ModelSelector
          currentModel={currentModel}
          currentProvider={currentProvider}
          settings={settings}
          onSelect={(model, provider) => {
            setCurrentModel(model)
            setCurrentProvider(provider)
          }}
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 w-full overflow-hidden flex flex-col">
          {activeConversationId ? (
            <>
              <MessageList
                messages={activeConversation?.messages || []}
                streamingMessage={loading ? text : undefined}
              />
              <div className="p-4 max-w-4xl mx-auto w-full">
                <ChatInput onSend={handleSend} onCancel={cancel} loading={loading} />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col gap-4 items-center justify-center">
              <span className="text-2xl text-gray-300">
                Select or create a chat to start
              </span>
              <div className="w-full max-w-2xl px-4">
                <ChatInput onSend={handleSend} onCancel={cancel} loading={loading} />
              </div>
            </div>
          )}
        </div>
        <TopicList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onCreateConversation={() => {
            const provider = currentProvider
            const model = currentModel || settings.models[provider] || 'gpt-4o'
            const id = createConversation({ model, provider })
            setActiveConversationId(id)
          }}
          onDeleteConversation={deleteConversation}
        />
      </div>
    </div>
  )
}
