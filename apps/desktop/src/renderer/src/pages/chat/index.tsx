import { HStack, VStack, Center, Text, Box } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useSessions } from '../../hooks/useSessions'
import { useSettings } from '../../hooks/useSettings'
import { useAiChat } from '../../hooks/useAiChat'
import { AssistantList } from '../../components/chat/AssistantList'
import { TopicList } from '../../components/chat/TopicList'
import { MessageList } from '../../components/chat/MessageList'
import { ChatInput } from '../../components/chat/ChatInput'
import { ModelSelector } from '../../components/chat/ModelSelector'
import type { ChatMessage, ProviderName } from '../../../../shared/ipc'

export function ChatPage() {
  const {
    sessions,
    activeSessionId,
    activeSession,
    setActiveSessionId,
    createSession,
    deleteSession,
    addMessage
  } = useSessions()

  const { settings } = useSettings()
  const [currentProvider, setCurrentProvider] = useState<ProviderName>('openai')
  const [currentModel, setCurrentModel] = useState('')

  useEffect(() => {
    if (activeSession) {
      setCurrentModel(activeSession.model)
      setCurrentProvider(activeSession.provider || 'openai')
    } else if (!currentModel) {
      setCurrentProvider('openai')
      setCurrentModel(settings.models.openai || 'gpt-4o')
    }
  }, [activeSession])

  const handleFinish = useCallback(
    (content: string) => {
      if (activeSessionId) {
        addMessage(activeSessionId, { role: 'assistant', content })
      }
    },
    [activeSessionId, addMessage]
  )

  const { text, loading, start, cancel } = useAiChat(activeSessionId || '', handleFinish)

  const handleSend = async (content: string) => {
    let sessionId = activeSessionId
    const provider = currentProvider
    const model = currentModel || settings.models[provider] || 'gpt-4o'

    if (!sessionId) {
      sessionId = createSession({ model, provider })
      setCurrentModel(model)
      setActiveSessionId(sessionId)
    }

    const userMsg: ChatMessage = { role: 'user', content }

    const history = activeSession ? [...activeSession.messages] : []
    history.push(userMsg)

    await start(model, history, provider, sessionId)

    addMessage(sessionId!, userMsg, { model, provider })
  }

  return (
    <HStack h="100vh" w="full" gap={0} align="stretch" bg="white" _dark={{ bg: 'black' }}>
      <AssistantList />

      <VStack flex={1} h="full" gap={0} bg="white" _dark={{ bg: 'gray.900' }} position="relative">
        <Box flex={1} w="full" overflow="hidden" display="flex" flexDirection="column">
          {activeSessionId ? (
            <>
              <HStack
                p={4}
                borderBottomWidth={1}
                borderColor="gray.100"
                _dark={{ borderColor: 'gray.800' }}
              >
                <ModelSelector
                  currentModel={currentModel}
                  currentProvider={currentProvider}
                  onSelect={(model, provider) => {
                    setCurrentModel(model)
                    setCurrentProvider(provider)
                  }}
                />
              </HStack>

              <MessageList
                messages={activeSession?.messages || []}
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
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onCreateSession={() => {
          const provider = currentProvider
          const model = currentModel || settings.models[provider] || 'gpt-4o'
          const id = createSession({ model, provider })
          setActiveSessionId(id)
        }}
        onDeleteSession={deleteSession}
      />
    </HStack>
  )
}
