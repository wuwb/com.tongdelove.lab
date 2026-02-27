import { Box, Button, VStack, Text, HStack, IconButton, Dialog } from '@chakra-ui/react'
import { Plus, Pin, ListFilter, Trash2, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import type { Conversation } from '../../types/chat'

interface TopicListProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onCreateConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function TopicList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation
}: TopicListProps) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const formatDate = (ts: number) => {
    const d = new Date(ts)
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  const handleDeleteClick = (conversationId: string) => {
    setDeleteTargetId(conversationId)
  }

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      onDeleteConversation(deleteTargetId)
      setDeleteTargetId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteTargetId(null)
  }

  return (
    <Box
      w="280px"
      h="100%"
      bg="white"
      _dark={{ bg: 'gray.900' }}
      borderLeftWidth={1}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box p={4}>
        <HStack justify="space-between" mb={4}>
          <Button
            onClick={onCreateConversation}
            variant="ghost"
            size="sm"
            color="gray.500"
            p={0}
            _hover={{ color: 'gray.700', bg: 'transparent' }}
          >
            <Plus size={16} /> <Text ml={2}>新建话题</Text>
          </Button>
          <IconButton aria-label="Filter" variant="ghost" size="xs" color="gray.400">
            <ListFilter size={16} />
          </IconButton>
        </HStack>
      </Box>

      <VStack flex={1} overflowY="auto" gap={2} align="stretch" px={3} pb={4}>
        {conversations.map((conversation) => (
          <Box
            key={conversation.id}
            p={3}
            cursor="pointer"
            rounded="md"
            bg={activeConversationId === conversation.id ? 'gray.100' : 'transparent'}
            _dark={{ bg: activeConversationId === conversation.id ? 'gray.800' : 'transparent' }}
            _hover={{ bg: 'gray.50' }}
            onClick={() => onSelectConversation(conversation.id)}
            position="relative"
            role="group"
          >
            <HStack justify="space-between" align="start" mb={1}>
              <Text fontSize="sm" fontWeight="medium" truncate w="90%">
                {conversation.title || '默认话题'}
              </Text>
              <Box display="none" _groupHover={{ display: 'flex' }} alignItems="center" gap={1}>
                <IconButton
                  size="xs"
                  variant="ghost"
                  colorPalette="red"
                  aria-label="Delete topic"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(conversation.id)
                  }}
                  h="20px"
                  minW="20px"
                >
                  <Trash2 size={14} />
                </IconButton>
              </Box>
            </HStack>
            <Text fontSize="xs" color="gray.400">
              {formatDate(conversation.updatedAt || Date.now())}
            </Text>
          </Box>
        ))}

        {conversations.length === 0 && (
          <VStack flex={1} align="center" justify="center" py={8} mx={4}>
            <Text fontSize="xl" color="gray.400" mb={2}>
              没有话题
            </Text>
            <Text fontSize="sm" color="gray.300">
              点击上方按钮创建新话题
            </Text>
          </VStack>
        )}
      </VStack>

      <Dialog.Root
        open={deleteTargetId !== null}
        onOpenChange={(open) => !open && handleCancelDelete()}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" _dark={{ bg: 'gray.900' }} padding="6">
            <Dialog.Header>
              <Dialog.Title>确认删除话题</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4} align="center" py={6}>
                <Box p={4} borderRadius="round" bg="red.50" _dark={{ bg: 'red.900/20' }}>
                  <AlertTriangle size={32} color="red" />
                </Box>

                <Box textAlign="center">
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    确定要删除这个话题吗？
                  </Text>
                  <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                    此操作无法撤销，话题中的所有消息将被永久删除。
                  </Text>
                </Box>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="ghost">取消</Button>
              </Dialog.CloseTrigger>
              <Button colorPalette="red" onClick={handleConfirmDelete}>
                删除话题
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  )
}

export function MockItem({ title, date, pinned }: { title: string; date: string; pinned?: boolean }) {
  return (
    <Box p={3} rounded="md" _hover={{ bg: 'gray.50' }}>
      <HStack justify="space-between" align="start" mb={1}>
        <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{ color: 'gray.300' }}>
          {title}
        </Text>
        {pinned && <Pin size={12} style={{ transform: 'rotate(45deg)' }} color="#A0AEC0" />}
      </HStack>
      <Text fontSize="xs" color="gray.400">
        {date}
      </Text>
    </Box>
  )
}
