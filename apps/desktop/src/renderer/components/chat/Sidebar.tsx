import { Box, Button, VStack, Text, HStack, IconButton } from '@chakra-ui/react'
import { Plus, Trash2, MessageSquare } from 'lucide-react'
import type { Conversation } from '../../types/chat'

interface SidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onCreateConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation
}: SidebarProps) {
  return (
    <Box w="250px" h="100%" bg="bg.subtle" borderRightWidth={1} display="flex" flexDirection="column">
      <Box p={4} borderBottomWidth={1}>
        <Button onClick={onCreateConversation} w="full" variant="surface" colorPalette="blue">
          <Plus size={16} style={{ marginRight: 8 }} />
          New Chat
        </Button>
      </Box>

      <VStack flex={1} overflowY="auto" gap={0} align="stretch">
        {conversations.map((conversation) => (
          <HStack
            key={conversation.id}
            p={3}
            cursor="pointer"
            bg={activeConversationId === conversation.id ? 'bg.emphasized' : 'transparent'}
            _hover={{ bg: 'bg.muted' }}
            onClick={() => onSelectConversation(conversation.id)}
            justify="space-between"
          >
            <HStack flex={1} overflow="hidden">
              <MessageSquare size={16} />
              <Text truncate fontSize="sm">
                {conversation.title || 'New Chat'}
              </Text>
            </HStack>
            <IconButton
              size="xs"
              variant="ghost"
              colorPalette="red"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteConversation(conversation.id)
              }}
              aria-label="Delete conversation"
            >
              <Trash2 size={14} />
            </IconButton>
          </HStack>
        ))}
        {conversations.length === 0 && (
          <Box p={4} textAlign="center" color="fg.muted">
            <Text fontSize="sm">No chats yet</Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}
