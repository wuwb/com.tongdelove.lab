import { Box, Button, VStack, Text, HStack, IconButton } from '@chakra-ui/react'
import { Plus, Pin, ListFilter, X } from 'lucide-react'
import type { Session } from '../../types/chat'

interface TopicListProps {
  sessions: Session[]
  activeSessionId: string | null
  onSelectSession: (id: string) => void
  onCreateSession: () => void
  onDeleteSession: (id: string) => void
}

export function TopicList({
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateSession,
  onDeleteSession
}: TopicListProps) {
  
  const formatDate = (ts: number) => {
      const d = new Date(ts)
      return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <Box w="280px" h="100%" bg="white" _dark={{ bg: 'gray.900' }} borderLeftWidth={1} display="flex" flexDirection="column">
      {/* Header */}
      <Box p={4}>
        <HStack justify="space-between" mb={4}>
            <Button 
                onClick={onCreateSession} 
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
        {sessions.map((session) => (
          <Box
            key={session.id}
            p={3}
            cursor="pointer"
            rounded="md"
            bg={activeSessionId === session.id ? 'gray.100' : 'transparent'}
            _dark={{ bg: activeSessionId === session.id ? 'gray.800' : 'transparent' }}
            _hover={{ bg: 'gray.50' }}
            onClick={() => onSelectSession(session.id)}
            position="relative"
            role="group"
          >
            <HStack justify="space-between" align="start" mb={1}>
                <Text fontSize="sm" fontWeight="medium" truncate w="90%">
                    {session.title || '默认话题'}
                </Text>
                {/* Hover actions will go here, currently just pin/delete placeholders if needed */}
                <Box display="none" _groupHover={{ display: 'block' }}>
                     <IconButton
                        size="xs"
                        variant="ghost"
                        colorPalette="gray"
                        aria-label="Delete"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDeleteSession(session.id)
                        }}
                        h="14px"
                        minW="14px"
                    >
                        <X size={14} />
                    </IconButton>
                </Box>
            </HStack>
            <Text fontSize="xs" color="gray.400">
                {formatDate(session.updatedAt || Date.now())}
            </Text>
          </Box>
        ))}
        
        {/* Mocked historical items to match design for visual check if list is empty */}
        {sessions.length === 0 && (
           <>
              <MockItem title="默认话题" date="04/03 23:14" pinned />
              <MockItem title="嵌入式AI模型部署流程指南" date="02/14 10:28" pinned />
           </>
        )}
      </VStack>
    </Box>
  )
}

function MockItem({ title, date, pinned }: { title: string, date: string, pinned?: boolean }) {
    return (
        <Box p={3} rounded="md" _hover={{ bg: 'gray.50' }}>
            <HStack justify="space-between" align="start" mb={1}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700" _dark={{color: 'gray.300'}}>{title}</Text>
                {pinned && <Pin size={12} style={{ transform: 'rotate(45deg)' }} color="#A0AEC0" />}
            </HStack>
            <Text fontSize="xs" color="gray.400">{date}</Text>
        </Box>
    )
}
