import { Box, VStack, Text, HStack, IconButton, Input } from '@chakra-ui/react'
import { Plus, Bot, Briefcase, Code, Stethoscope, Search, MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface Assistant {
  id: string
  name: string
  icon: any
  color: string
}

const MOCK_ASSISTANTS: Assistant[] = [
  { id: 'default', name: '默认助手', icon: Bot, color: 'orange.400' },
  { id: 'merchant', name: '商家运营 - Merchant Operations', icon: Briefcase, color: 'pink.400' },
  { id: 'pm', name: '产品经理 - Product Manager', icon: Briefcase, color: 'yellow.400' },
  { id: 'analyst', name: '商业数据分析 - Business Data...', icon: Briefcase, color: 'purple.400' },
  { id: 'dev', name: '开发工程师 - Software Engineer', icon: Code, color: 'gray.600' },
  { id: 'frontend', name: '前端工程师 - Frontend Engineer', icon: Code, color: 'gray.500' },
  { id: 'doctor', name: '医生 - Doctor', icon: Stethoscope, color: 'teal.400' },
]

export function AssistantList() {
  const [selectedId, setSelectedId] = useState('default')

  return (
    <Box w="280px" h="100%" borderRightWidth={1} bg="white" _dark={{ bg: 'gray.900' }} display="flex" flexDirection="column">
      {/* Header / Search */}
      <Box p={4} borderBottomWidth={0}>
        <Button variant="ghost" justifyContent="start" w="full" color="gray.500" mb={2}>
          <Plus size={16} /><Text ml={2}>添加助手</Text>
        </Button>
        <Box position="relative">
          <Input placeholder="搜索助手" bg="gray.100" _dark={{ bg: 'gray.800' }} border="none" pl={9} h="36px" fontSize="sm" />
          <Box position="absolute" left={3} top="10px" color="gray.400">
            <Search size={16} />
          </Box>
        </Box>
      </Box>

      {/* List */}
      <VStack flex={1} overflowY="auto" gap={0} align="stretch" px={2} pb={2}>
        {MOCK_ASSISTANTS.map((assistant) => (
          <HStack
            key={assistant.id}
            p={2}
            rounded="md"
            cursor="pointer"
            bg={selectedId === assistant.id ? 'gray.100' : 'transparent'}
            _dark={{ bg: selectedId === assistant.id ? 'gray.800' : 'transparent' }}
            _hover={{ bg: 'gray.50' }}
            onClick={() => setSelectedId(assistant.id)}
            gap={3}
          >
            <Box
              p={2}
              bg={assistant.id === 'default' ? 'orange.100' : 'gray.100'}
              rounded="full"
              color={assistant.color}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <assistant.icon size={18} />
            </Box>
            <Box flex={1} overflow="hidden">
              <Text truncate fontSize="sm" fontWeight={selectedId === assistant.id ? 'medium' : 'normal'}>
                {assistant.name}
              </Text>
            </Box>
            {selectedId === assistant.id && (
              <IconButton aria-label="More" variant="ghost" size="xs" color="gray.400">
                <MoreVertical size={14} />
              </IconButton>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

function Button({ children, ...props }: any) {
  return (
    <HStack
      as="button"
      p={2}
      rounded="md"
      transition="all 0.2s"
      _hover={{ bg: 'gray.100' }}
      {...props}
    >
      {children}
    </HStack>
  )
}
