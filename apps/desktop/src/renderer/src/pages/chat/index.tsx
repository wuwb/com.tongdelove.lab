import { HStack, VStack, Center, Text, Box } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useSessions } from '../../hooks/useSessions'
import { useSettings } from '../../hooks/useSettings'
import { useAiChat } from '../../hooks/useAiChat'
import { AssistantList } from '../../components/chat/AssistantList'
import { TopicList } from '../../components/chat/TopicList'
import { MessageList } from '../../components/chat/MessageList'
import { ChatInput } from '../../components/chat/ChatInput'
import type { ChatMessage } from '../../../../shared/ipc'

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
  const [currentModel, setCurrentModel] = useState('')
  
  // Set default model on load
  useEffect(() => {
    if (activeSession) {
      setCurrentModel(activeSession.model)
    } else if (settings.models.openai && !currentModel) {
      setCurrentModel(settings.models.openai)
    }
  }, [activeSession, settings.models.openai])

  // Callbacks for completion
  const handleFinish = useCallback((content: string) => {
    if (activeSessionId) {
      addMessage(activeSessionId, { role: 'assistant', content })
    }
  }, [activeSessionId, addMessage])

  const { text, loading, start, cancel } = useAiChat(activeSessionId || '', handleFinish)

  const handleSend = async (content: string) => {
    let sessionId = activeSessionId
    let model = currentModel || settings.models.openai || 'gpt-3.5-turbo'
    let provider = 'openai' as const // deduce from model or settings logic later

    if (!sessionId) {
      sessionId = createSession({ model, provider })
      setCurrentModel(model)
    }

    const userMsg: ChatMessage = { role: 'user', content }
    addMessage(sessionId!, userMsg)
    
    // Construct history for instant feedback and context
    const history = activeSession ? [...activeSession.messages] : []
    history.push(userMsg)

    // Determine provider based on model (simple heuristic or setting)
    if (model.includes('llama')) provider = 'ollama' as any
    // For now defaulting to openai unless mock or specified.
    
    await start(model, history, provider, sessionId)
  }


  return (
    <HStack h="100vh" w="full" gap={0} align="stretch" bg="white" _dark={{ bg: 'black' }}>
      {/* Left Sidebar: Assistants */}
      <AssistantList />

      {/* Main Chat Area */}
      <VStack flex={1} h="full" gap={0} bg="white" _dark={{ bg: 'gray.900' }} position="relative">
        <Box flex={1} w="full" overflow="hidden" display="flex" flexDirection="column">
            {activeSessionId ? (
            <>
                {/* Header for Chat Area */}
                <HStack p={4} borderBottomWidth={1} borderColor="gray.100" _dark={{ borderColor: 'gray.800' }}>
                    <Text fontWeight="bold">默认助手</Text>
                    <Text color="gray.400">/</Text>
                    <Text color="gray.500">{currentModel}</Text>
                </HStack>

                <MessageList 
                    messages={activeSession?.messages || []} 
                    streamingMessage={loading ? text : undefined}
                />
                <Box p={4} maxW="4xl" mx="auto" w="full">
                    <ChatInput
                        onSend={handleSend}
                        onCancel={cancel}
                        loading={loading}
                    />
                </Box>
            </>
            ) : (
            <Center flex={1} flexDirection="column" gap={4}>
                <Text fontSize="2xl" color="gray.300">Select or create a chat to start</Text>
                <Box w="full" maxW="2xl" px={4}>
                     <ChatInput
                        onSend={handleSend}
                        onCancel={cancel}
                        loading={loading}
                    />
                </Box>
            </Center>
            )}
        </Box>
      </VStack>

      {/* Right Sidebar: Topics */}
      <TopicList
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onCreateSession={() => {
            const id = createSession({ model: currentModel || 'gpt-3.5-turbo', provider: 'openai' })
            setActiveSessionId(id)
        }}
        onDeleteSession={deleteSession}
      />
    </HStack>
  )
}
