import { Button, Dialog, VStack, HStack, Text, Badge, Input, Box } from '@chakra-ui/react'
import { Settings2 } from 'lucide-react'
import { useState } from 'react'
import type { ProviderName } from '../../../../shared/ipc'

const PROVIDER_CONFIGS: Record<ProviderName, { name: string; color: string; models: string[] }> = {
  openai: {
    name: 'OpenAI',
    color: 'green',
    models: [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4-turbo',
      'gpt-4',
      'gpt-3.5-turbo',
      'o1-mini',
      'o1-preview'
    ]
  },
  anthropic: {
    name: 'Anthropic',
    color: 'orange',
    models: [
      'claude-3-7-sonnet-20250219',
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229'
    ]
  },
  google: {
    name: 'Gemini',
    color: 'blue',
    models: [
      'gemini-2.5-flash-preview-04-17',
      'gemini-2.0-flash-exp',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.0-pro'
    ]
  },
  ollama: {
    name: 'Ollama',
    color: 'purple',
    models: ['llama3.2', 'llama3.1', 'llama2', 'qwen3:8b', 'mistral', 'codellama']
  },
  mock: { name: 'Mock', color: 'gray', models: ['mock-model'] }
}

const MODEL_SEARCH_KEYWORDS: Record<string, string[]> = {
  'gpt-4o': ['latest', 'flagship', 'omni', 'vision'],
  'gpt-4-turbo': ['turbo', 'fast', 'advanced'],
  'gpt-3.5': ['cheap', 'fast', 'basic'],
  'claude-3': ['latest', 'flagship', 'advanced'],
  'gemini-1.5': ['latest', 'pro', 'advanced'],
  llama3: ['local', 'open', 'meta'],
  qwen3: ['chinese', 'alibaba', '8b']
}

interface ModelSelectorProps {
  currentModel: string
  currentProvider: ProviderName
  onSelect: (model: string, provider: ProviderName) => void
}

export function ModelSelector({ currentModel, currentProvider, onSelect }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredModels = Object.entries(PROVIDER_CONFIGS).filter(([_, config]) => {
    if (!searchQuery) return true

    const queryLower = searchQuery.toLowerCase()

    const matchesProvider = config.name.toLowerCase().includes(queryLower)
    const matchesModel = config.models.some((m) => m.toLowerCase().includes(queryLower))

    const matchesKeywords = Object.entries(MODEL_SEARCH_KEYWORDS).some(([model, keywords]) => {
      if (config.models.includes(model)) {
        return keywords.some(
          (k) => k.toLowerCase().includes(queryLower) || queryLower.includes(k.toLowerCase())
        )
      }
      return false
    })

    return matchesProvider || matchesModel || matchesKeywords
  })

  const handleSelectModel = (model: string, provider: ProviderName) => {
    onSelect(model, provider)
    setIsOpen(false)
    setSearchQuery('')
  }

  const getColorScheme = (color: string) => {
    const colorMap: Record<string, any> = {
      green: 'green',
      orange: 'orange',
      blue: 'blue',
      purple: 'purple',
      gray: 'gray'
    }
    return colorMap[color] || 'gray'
  }

  return (
    <>
      <Button
        size="sm"
        variant={currentModel ? 'solid' : 'outline'}
        colorScheme="gray"
        onClick={() => setIsOpen(true)}
      >
        <Settings2 size={14} style={{ marginRight: '8px' }} />
        {currentModel || '选择模型'}
      </Button>

      <Dialog.Root open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="white" _dark={{ bg: 'gray.900' }}>
            <Dialog.Header>
              <Dialog.Title>选择模型</Dialog.Title>
              <Dialog.CloseTrigger />
            </Dialog.Header>

            <Dialog.Body>
              <VStack gap={4} align="stretch">
                <Input
                  placeholder="搜索模型（如：gpt-4o, claude, 最新, 免费...）"
                  bg="gray.100"
                  _dark={{ bg: 'gray.800' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <VStack gap={4} align="stretch">
                  {filteredModels.map(([provider, config]) => (
                    <Box key={provider} borderWidth={1} rounded="md" p={3}>
                      <HStack justify="space-between" mb={3}>
                        <HStack gap={2}>
                          <Badge colorScheme={getColorScheme(config.color)}>{config.name}</Badge>
                          <Text fontSize="sm" color="gray.500" fontWeight="medium">
                            {config.models.length} 个模型
                          </Text>
                        </HStack>
                      </HStack>

                      <VStack gap={1} maxH="200" overflowY="auto">
                        {config.models.map((model) => (
                          <HStack
                            key={model}
                            p={2}
                            rounded="md"
                            cursor="pointer"
                            bg={
                              currentModel === model && currentProvider === provider
                                ? 'gray.100'
                                : 'transparent'
                            }
                            _dark={{
                              bg:
                                currentModel === model && currentProvider === provider
                                  ? 'gray.800'
                                  : 'transparent'
                            }}
                            _hover={{ bg: 'gray.50', _dark: { bg: 'gray.800' } }}
                            onClick={() => handleSelectModel(model, provider as ProviderName)}
                            justify="space-between"
                          >
                            <Text
                              fontSize="sm"
                              fontWeight={currentModel === model ? 'medium' : 'normal'}
                            >
                              {model}
                            </Text>
                            {currentModel === model && currentProvider === provider && (
                              <Badge size="xs" colorScheme="green">
                                当前
                              </Badge>
                            )}
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
