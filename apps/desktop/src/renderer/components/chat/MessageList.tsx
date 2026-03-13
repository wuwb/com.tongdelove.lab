import { Box, VStack, Text } from '@chakra-ui/react'
import { User, Sparkles } from 'lucide-react'
import type { ChatMessage } from '@/shared/ipc'
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
    <VStack flex={1} overflowY="auto" p={6} gap={6} align="stretch" pb={10} css={{
      '&::-webkit-scrollbar': { width: '4px' },
      '&::-webkit-scrollbar-thumb': { background: '#EDF2F7', borderRadius: '4px' },
    }}>
      {messages.map((msg, i) => (
        <Box key={i} display="flex" flexDirection={msg.role === 'user' ? 'row-reverse' : 'row'} gap={4}>
          {msg.role === 'user' ? (
            <Avatar
              name="User"
              size="sm"
              bg="gray.200"
              color="gray.600"
              icon={<User size={16} />}
            />
          ) : (
            <Avatar
              name="AI"
              size="sm"
              bg="transparent"
              color="orange.400"
              src="" // If we had an icon url
              icon={<Sparkles size={18} />}
            />
          )}

          <Box
            bg={msg.role === 'user' ? 'gray.100' : 'transparent'}
            _dark={{ bg: msg.role === 'user' ? 'gray.800' : 'transparent', color: msg.role === 'user' ? 'inherit' : 'gray.100' }}
            p={msg.role === 'user' ? 3 : 0}
            px={msg.role === 'user' ? 4 : 0}
            borderRadius="2xl"
            maxW="85%"
            lineHeight="1.6"
            fontSize="md"
            color={msg.role === 'user' ? 'inherit' : 'gray.800'}
          >
            <Text whiteSpace="pre-wrap">{msg.content}</Text>
          </Box>
        </Box>
      ))}

      {streamingMessage && (
        <Box display="flex" flexDirection="row" gap={4}>
          <Avatar
            name="AI"
            size="sm"
            bg="transparent"
            color="orange.400"
            icon={<Sparkles size={18} />}
          />
          <Box
            p={0}
            maxW="85%"
            lineHeight="1.6"
            fontSize="md"
            color="gray.800"
            _dark={{ color: 'gray.100' }}
          >
            <Text whiteSpace="pre-wrap">{streamingMessage}</Text>
          </Box>
        </Box>
      )}
      <div ref={bottomRef} />
    </VStack>
  )
}
