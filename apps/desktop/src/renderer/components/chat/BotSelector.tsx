import { Button, Dialog, VStack, HStack, Text, Badge, Input, Box, Avatar } from '@chakra-ui/react'
import { Bot, Sparkles } from 'lucide-react'
import { useState, useMemo } from 'react'
import type { Assistant } from '@/shared/ipc'
import { useAssistants } from '../../hooks/useAssistants'
import { useCategories } from '../../hooks/useCategories'

interface BotSelectorProps {
  currentAssistantId?: string
  onSelect: (assistant: Assistant | null) => void
}

export function BotSelector({ currentAssistantId, onSelect }: BotSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { assistants, loading } = useAssistants()
  const { categories } = useCategories()

  // 过滤助手
  const filteredAssistants = useMemo(() => {
    return assistants.filter((assistant) => {
      if (!searchQuery) return true

      const queryLower = searchQuery.toLowerCase()
      return (
        assistant.name.toLowerCase().includes(queryLower) ||
        (assistant.description && assistant.description.toLowerCase().includes(queryLower)) ||
        (assistant.systemPrompt && assistant.systemPrompt.toLowerCase().includes(queryLower))
      )
    })
  }, [assistants, searchQuery])

  // 按分类分组助手
  const groupedAssistants = useMemo(() => {
    const groups: Record<string, Assistant[]> = {}

    filteredAssistants.forEach((assistant) => {
      const categoryId = assistant.categoryId || 'uncategorized'
      if (!groups[categoryId]) {
        groups[categoryId] = []
      }
      groups[categoryId].push(assistant)
    })

    return groups
  }, [filteredAssistants])

  const handleSelectAssistant = (assistant: Assistant | null) => {
    onSelect(assistant)
    setIsOpen(false)
    setSearchQuery('')
  }

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'uncategorized') return '未分类'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.name || '未知分类'
  }

  const getCategoryColor = (categoryId: string) => {
    if (categoryId === 'uncategorized') return 'gray'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.color || 'gray'
  }

  const currentAssistant = assistants.find(a => a.id === currentAssistantId)

  return (
    <>
      <Button
        size="sm"
        variant={currentAssistant ? 'solid' : 'outline'}
        colorScheme={currentAssistant ? 'blue' : 'gray'}
        onClick={() => setIsOpen(true)}
        leftIcon={currentAssistant ? <Bot size={14} /> : <Sparkles size={14} />}
        isLoading={loading}
      >
        {currentAssistant ? currentAssistant.name : '选择Bot'}
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" _dark={{ bg: 'gray.900' }} maxW="600px">
            <Dialog.Header>
              <Dialog.Title>选择Bot助手</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4} align="stretch">
                {/* 搜索框 */}
                <Input
                  placeholder="搜索Bot（名称、描述、提示词...）"
                  bg="gray.100"
                  _dark={{ bg: 'gray.800' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* 无Bot选项 */}
                <Box
                  p={3}
                  borderWidth={1}
                  rounded="md"
                  cursor="pointer"
                  bg={!currentAssistantId ? 'blue.50' : 'transparent'}
                  _dark={{ bg: !currentAssistantId ? 'blue.900' : 'transparent' }}
                  _hover={{ bg: 'gray.50', _dark: { bg: 'gray.800' } }}
                  onClick={() => handleSelectAssistant(null)}
                >
                  <HStack gap={3}>
                    <Avatar size="sm" bg="gray.200" _dark={{ bg: 'gray.700' }}>
                      <Bot size={16} />
                    </Avatar>
                    <VStack align="start" gap={0}>
                      <Text fontWeight="medium">默认助手</Text>
                      <Text fontSize="sm" color="gray.500">使用基础模型，无特殊提示词</Text>
                    </VStack>
                    {!currentAssistantId && (
                      <Badge colorScheme="blue" ml="auto">当前</Badge>
                    )}
                  </HStack>
                </Box>

                {/* Bot列表 */}
                <VStack gap={4} align="stretch" maxH="400px" overflowY="auto">
                  {Object.entries(groupedAssistants).map(([categoryId, categoryAssistants]) => (
                    <Box key={categoryId}>
                      {/* 分类标题 */}
                      <HStack gap={2} mb={3}>
                        <Badge colorScheme={getCategoryColor(categoryId)}>
                          {getCategoryName(categoryId)}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {categoryAssistants.length} 个Bot
                        </Text>
                      </HStack>

                      {/* 该分类下的Bot */}
                      <VStack gap={2} align="stretch">
                        {categoryAssistants.map((assistant) => (
                          <Box
                            key={assistant.id}
                            p={3}
                            borderWidth={1}
                            rounded="md"
                            cursor="pointer"
                            bg={
                              currentAssistantId === assistant.id
                                ? 'blue.50'
                                : 'transparent'
                            }
                            _dark={{
                              bg:
                                currentAssistantId === assistant.id
                                  ? 'blue.900'
                                  : 'transparent'
                            }}
                            _hover={{ bg: 'gray.50', _dark: { bg: 'gray.800' } }}
                            onClick={() => handleSelectAssistant(assistant)}
                          >
                            <HStack gap={3}>
                              <Avatar size="sm" src={assistant.avatar}>
                                {assistant.avatar || <Bot size={16} />}
                              </Avatar>
                              <VStack align="start" gap={0} flex={1}>
                                <Text fontWeight="medium">{assistant.name}</Text>
                                {assistant.description && (
                                  <Text fontSize="sm" color="gray.500" noOfLines={1}>
                                    {assistant.description}
                                  </Text>
                                )}
                                {assistant.systemPrompt && (
                                  <Text fontSize="xs" color="gray.400" noOfLines={2}>
                                    提示词: {assistant.systemPrompt.slice(0, 60)}...
                                  </Text>
                                )}
                              </VStack>
                              <VStack align="end" gap={1}>
                                {assistant.defaultModel && (
                                  <Badge size="xs" colorScheme="green">
                                    {assistant.defaultModel}
                                  </Badge>
                                )}
                                {currentAssistantId === assistant.id && (
                                  <Badge size="xs" colorScheme="blue">
                                    当前
                                  </Badge>
                                )}
                              </VStack>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  ))}

                  {filteredAssistants.length === 0 && (
                    <Text fontSize="sm" color="gray.400" textAlign="center" py={8}>
                      {searchQuery ? '未找到匹配的Bot' : '暂无可用的Bot助手'}
                    </Text>
                  )}
                </VStack>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}