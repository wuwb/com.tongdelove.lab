import { useState } from 'react'
import {
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Box,
  Icon,
  Badge,
  Avatar,
  Card,
  IconButton
} from '@chakra-ui/react'
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react'
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter
} from '../../components/ui/dialog'
import { useAssistants } from '../../hooks/useAssistants'
import { AssistantEditor } from '../../components/assistant/AssistantEditor'

export function AssistantsPage() {
  const { assistants, loading, createAssistant, updateAssistant, deleteAssistant, reload } =
    useAssistants()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAssistant, setSelectedAssistant] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [deletingAssistantId, setDeletingAssistantId] = useState<string | null>(null)

  const filteredAssistants = assistants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateAssistant = async (assistant: any) => {
    await createAssistant(assistant)
    setIsEditorOpen(false)
    reload()
  }

  const handleUpdateAssistant = async (id: string, updates: any) => {
    await updateAssistant(id, updates)
    reload()
  }

  const handleDeleteAssistant = async () => {
    if (deletingAssistantId) {
      await deleteAssistant(deletingAssistantId)
      setIsConfirmDialogOpen(false)
      setDeletingAssistantId(null)
      reload()
    }
  }

  const openEditor = (assistantId?: string) => {
    setSelectedAssistant(assistantId || null)
    setIsEditorOpen(true)
  }

  const closeEditor = () => {
    setIsEditorOpen(false)
    setSelectedAssistant(null)
  }

  const openDeleteDialog = (assistantId: string) => {
    setDeletingAssistantId(assistantId)
    setIsConfirmDialogOpen(true)
  }

  const getAssistantById = (id: string) => assistants.find((a) => a.id === id)

  return (
    <VStack p={6} gap={6} h="full" bg="white" _dark={{ bg: 'gray.900' }}>
      {/* Header */}
      <HStack justifyContent="space-between" align="center">
        <HStack gap={3} align="center">
          <Icon as={Sparkles} boxSize={6} color="blue.500" />
          <Text fontSize="xl" fontWeight="semibold">
            助手库
          </Text>
          <Badge colorScheme="blue">{assistants.length}</Badge>
        </HStack>
        <Button colorScheme="blue" leftIcon={<Plus size={16} />} onClick={() => openEditor()}>
          创建助手
        </Button>
      </HStack>

      {/* Search */}
      <Input
        placeholder="搜索助手..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />

      {/* Assistants Grid */}
      {loading ? (
        <VStack flex={1} align="center" justify="center">
          <Text color="gray.400">加载中...</Text>
        </VStack>
      ) : filteredAssistants.length === 0 ? (
        <VStack flex={1} align="center" justify="center" gap={4}>
          <Text fontSize="4xl">🤖</Text>
          <Text color="gray.400">{searchQuery ? '未找到匹配的助手' : '还没有创建助手'}</Text>
          {searchQuery && (
            <Button variant="ghost" onClick={() => setSearchQuery('')}>
              清除搜索
            </Button>
          )}
        </VStack>
      ) : (
        <Box
          flex={1}
          overflowY="auto"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '4'
          }}
        >
          {filteredAssistants.map((assistant) => (
            <Card.Root
              key={assistant.id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              cursor="pointer"
              _hover={{ borderColor: 'blue.200' }}
              onMouseEnter={() => setSelectedAssistant(assistant.id)}
            >
              <VStack gap={3}>
                <HStack justifyContent="space-between" align="start">
                  <Avatar size="md" src={assistant.avatar}>
                    {assistant.avatar}
                  </Avatar>
                  <HStack>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditor(assistant.id)
                      }}
                    >
                      <Pencil size={14} />
                    </IconButton>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      onClick={(e) => {
                        e.stopPropagation()
                        openDeleteDialog(assistant.id)
                      }}
                    >
                      <Trash2 size={14} />
                    </IconButton>
                  </HStack>
                </HStack>

                <Box>
                  <Text fontWeight="medium" noOfLines={1}>
                    {assistant.name}
                  </Text>
                  {assistant.description && (
                    <Text fontSize="sm" color="gray.500" noOfLines={2} mt={1}>
                      {assistant.description}
                    </Text>
                  )}
                </Box>

                {assistant.systemPrompt && (
                  <Text fontSize="xs" color="gray.400" noOfLines={2} mt={2} fontStyle="italic">
                    {assistant.systemPrompt.slice(0, 80)}...
                  </Text>
                )}

                <HStack gap={2} mt={2}>
                  {assistant.defaultModel && (
                    <Badge size="sm" colorScheme="green" variant="subtle">
                      {assistant.defaultModel}
                    </Badge>
                  )}
                  {assistant.globalMemoryEnabled && (
                    <Badge size="sm" colorScheme="purple" variant="subtle">
                      全局记忆
                    </Badge>
                  )}
                  {assistant.streamingEnabled && (
                    <Badge size="sm" colorScheme="blue" variant="subtle">
                      流式
                    </Badge>
                  )}
                </HStack>

                {assistant.quickPhrases && assistant.quickPhrases.length > 0 && (
                  <Text fontSize="xs" color="gray.400" mt={2}>
                    {assistant.quickPhrases.length} 个常用短语
                  </Text>
                )}
              </VStack>
            </Card.Root>
          ))}
        </Box>
      )}

      {/* Edit Dialog */}
      <AssistantEditor
        assistant={selectedAssistant ? getAssistantById(selectedAssistant)! : null}
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        onSave={handleCreateAssistant}
        onCancel={closeEditor}
      />

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>确定要删除此助手吗？此操作无法撤销。</Text>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                取消
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAssistant}>
                删除
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </VStack>
  )
}
