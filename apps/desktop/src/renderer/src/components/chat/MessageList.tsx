import { Box, VStack, Text, HStack } from '@chakra-ui/react'
import { User, Bot } from 'lucide-react'
import type { ChatMessage } from '../../../../shared/ipc'
import { useEffect, useRef } from 'react'
import { Avatar } from '../ui/avatar'

interface MessageListProps {
  messages: ChatMessage[]
  streamingMessage?: string
}

export function MessageList({ messages, streamingMessage }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingMessage])

  return (
    <VStack flex={1} overflowY="auto" p={4} gap={6} align="stretch" pb={8}>
      {messages.map((msg, i) => (
        <HStack key={i} align="start" gap={4} flexDirection={msg.role === 'user' ? 'row-reverse' : 'row'}>
          <Avatar 
             name={msg.role === 'user' ? 'User' : 'AI'}
             icon={msg.role === 'user' ? <User /> : <Bot />}
             bg={msg.role === 'user' ? 'blue.500' : 'green.500'}
             color="white"
          />
          <Box
            bg={msg.role === 'user' ? 'blue.subtle' : 'bg.muted'}
            p={3}
            borderRadius="md"
            maxW="80%"
            borderTopRightRadius={msg.role === 'user' ? 0 : 'md'}
            borderTopLeftRadius={msg.role === 'user' ? 'md' : 0}
            whiteSpace="pre-wrap"
          >
            <Text fontSize="sm">{msg.content}</Text>
          </Box>
        </HStack>
      ))}
      
      {streamingMessage && (
        <HStack align="start" gap={4}>
          <Avatar 
             name="AI"
             icon={<Bot />}
             bg="green.500"
             color="white"
          />
          <Box
            bg="bg.muted"
            p={3}
            borderRadius="md"
            maxW="80%"
            borderTopLeftRadius={0}
            whiteSpace="pre-wrap"
          >
            <Text fontSize="sm">{streamingMessage}</Text>
          </Box>
        </HStack>
      )}
      <div ref={bottomRef} />
    </VStack>
  )
}
