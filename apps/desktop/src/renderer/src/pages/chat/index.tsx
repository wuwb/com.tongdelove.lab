import { HStack, VStack, Center, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useSessions } from '../../hooks/useSessions'
import { useSettings } from '../../hooks/useSettings'
import { useAiChat } from '../../hooks/useAiChat'
import { Sidebar } from '../../components/chat/Sidebar'
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

    // Get messages including the new one
    // Note: activeSession ref might be stale if we just created it? 
    // Actually createSession updates state but setState is async. 
    // However createSession returns the ID. useSessions logic saves to localStorage immediately but state update is async.
    // So activeSession might be undefined here if just created. 
    // But we know it's empty history + userMsg.
    
    // Better strategy: construct history here.
    const history = activeSession ? [...activeSession.messages] : []
    history.push(userMsg)

    // Determine provider based on model (simple heuristic or setting)
    if (model.includes('llama')) provider = 'ollama' as any
    // For now defaulting to openai unless mock or specified.
    
    // Check if we are in Mock mode (debugging) or Real.
    // Logic: if api key is empty, maybe use mock? Or just fail.
    // Let's use 'openai' provider as default.
    
    await start(model, history, provider, sessionId)
  }

  const modelOptions = [
    { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'Llama 2', value: 'llama2' },
    { label: 'Mock', value: 'mock' }
  ]

  return (
    <HStack h="100vh" w="full" gap={0}>
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onCreateSession={() => {
            const id = createSession({ model: currentModel || 'gpt-3.5-turbo', provider: 'openai' })
            setActiveSessionId(id)
        }}
        onDeleteSession={deleteSession}
      />
      
      <VStack flex={1} h="full" gap={0} bg="bg.canvas">
        {activeSessionId ? (
          <>
             <MessageList 
               messages={activeSession?.messages || []} 
               streamingMessage={loading ? text : undefined}
             />
             <ChatInput
               onSend={handleSend}
               onCancel={cancel}
               loading={loading}
               models={modelOptions}
               currentModel={currentModel}
               onModelChange={setCurrentModel}
             />
          </>
        ) : (
          <Center flex={1} flexDirection="column" gap={4}>
            <Text fontSize="2xl" color="fg.muted">Select or create a chat to start</Text>
            <ChatInput
               onSend={handleSend}
               onCancel={cancel}
               loading={loading}
               models={modelOptions}
               currentModel={currentModel}
               onModelChange={setCurrentModel}
             />
             {/* Show input even on empty state to easier start */}
          </Center>
        )}
      </VStack>
    </HStack>
  )
}
