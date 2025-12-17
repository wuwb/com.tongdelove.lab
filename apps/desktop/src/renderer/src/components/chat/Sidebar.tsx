import { Box, Button, VStack, Text, HStack, IconButton } from '@chakra-ui/react'
import { Plus, Trash2, MessageSquare } from 'lucide-react'
import type { Session } from '../../types/chat'

interface SidebarProps {
  sessions: Session[]
  activeSessionId: string | null
  onSelectSession: (id: string) => void
  onCreateSession: () => void
  onDeleteSession: (id: string) => void
}

export function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession
}: SidebarProps) {
  return (
    <Box w="250px" h="100%" bg="bg.subtle" borderRightWidth={1} display="flex" flexDirection="column">
      <Box p={4} borderBottomWidth={1}>
        <Button onClick={onCreateSession} w="full" variant="surface" colorPalette="blue">
          <Plus size={16} style={{ marginRight: 8 }} />
          New Chat
        </Button>
      </Box>

      <VStack flex={1} overflowY="auto" gap={0} align="stretch">
        {sessions.map((session) => (
          <HStack
            key={session.id}
            p={3}
            cursor="pointer"
            bg={activeSessionId === session.id ? 'bg.emphasized' : 'transparent'}
            _hover={{ bg: 'bg.muted' }}
            onClick={() => onSelectSession(session.id)}
            justify="space-between"
          >
            <HStack flex={1} overflow="hidden">
              <MessageSquare size={16} />
              <Text truncate fontSize="sm">
                {session.title || 'New Chat'}
              </Text>
            </HStack>
            <IconButton
              size="xs"
              variant="ghost"
              colorPalette="red"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteSession(session.id)
              }}
              aria-label="Delete session"
            >
              <Trash2 size={14} />
            </IconButton>
          </HStack>
        ))}
        {sessions.length === 0 && (
          <Box p={4} textAlign="center" color="fg.muted">
            <Text fontSize="sm">No chats yet</Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}
