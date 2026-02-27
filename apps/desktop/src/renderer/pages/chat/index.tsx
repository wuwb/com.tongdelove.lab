import { HStack, VStack, Center, Text, Box } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useConversations } from '../../hooks/useConversations'
import { useSettings } from '../../hooks/useSettings'
import { useAiChat } from '../../hooks/useAiChat'
import { PromptList } from '../../components/prompt/PromptList'
import { TopicList } from '../../components/chat/TopicList'
import { MessageList } from '../../components/chat/MessageList'
import { ChatInput } from '../../components/chat/ChatInput'
import { ModelSelector } from '../../components/chat/ModelSelector'
import type { ChatMessage, ProviderName } from '../../../shared/ipc'

export function ChatPage() {
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
        addMessage(activeConversationId, { role: 'prompt', content })
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
    <HStack h="100vh" w="full" gap={0} align="stretch" bg="white" _dark={{ bg: 'black' }}>
      {/* <PromptList /> */}

      <VStack flex={1} h="full" gap={0} bg="white" _dark={{ bg: 'gray.900' }} position="relative">
        <HStack
          p={4}
          borderBottomWidth={1}
          borderColor="gray.100"
          _dark={{ borderColor: 'gray.800' }}
        >
          <ModelSelector
            currentModel={currentModel}
            currentProvider={currentProvider}
            settings={settings}
            onSelect={(model, provider) => {
              setCurrentModel(model)
              setCurrentProvider(provider)
            }}
          />
        </HStack>

        <Box flex={1} w="full" overflow="hidden" display="flex" flexDirection="column">
          {activeConversationId ? (
            <>
              <MessageList
                messages={activeConversation?.messages || []}
                streamingMessage={loading ? text : undefined}
              />
              <Box p={4} maxW="4xl" mx="auto" w="full">
                <ChatInput onSend={handleSend} onCancel={cancel} loading={loading} />
              </Box>
            </>
          ) : (
            <Center flex={1} flexDirection="column" gap={4}>
              <Text fontSize="2xl" color="gray.300">
                Select or create a chat to start
              </Text>
              <Box w="full" maxW="2xl" px={4}>
                <ChatInput onSend={handleSend} onCancel={cancel} loading={loading} />
              </Box>
            </Center>
          )}
        </Box>
      </VStack>

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
    </HStack>
  )
}
