import { Button, Dialog, VStack, HStack, Text, Badge, Input, Box } from '@chakra-ui/react'
import { Settings2 } from 'lucide-react'
import { useState, useMemo } from 'react'
import type { ProviderName, AppSettings } from '@/shared/ipc'

type ProviderConfig = {
  id: string
  name: string
  type: string
  avatar: string
  remark?: string
  officialUrl?: string
  enabled: boolean
  models: Array<{
    id: string
    name: string
  }>
}

interface ModelSelectorProps {
  currentModel: string
  currentProvider: ProviderName
  onSelect: (model: string, provider: ProviderName) => void
  settings: AppSettings
}

// 默认内置提供商配置
const DEFAULT_PROVIDERS: Record<string, ProviderConfig> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai',
    avatar: '🔮',
    remark: '领先的AI研究实验室，提供GPT系列模型',
    officialUrl: 'https://openai.com',
    enabled: true,
    models: [
      { id: 'gpt-4o', name: 'gpt-4o' },
      { id: 'gpt-4o-mini', name: 'gpt-4o-mini' },
      { id: 'gpt-4-turbo', name: 'gpt-4-turbo' },
      { id: 'gpt-4', name: 'gpt-4' },
      { id: 'gpt-3.5-turbo', name: 'gpt-3.5-turbo' }
    ]
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    type: 'anthropic',
    avatar: '🎭',
    remark: '专注于安全AI的Claude系列模型',
    officialUrl: 'https://www.anthropic.com',
    enabled: true,
    models: [
      { id: 'claude-3-7-sonnet-20250219', name: 'claude-3-7-sonnet-20250219' },
      { id: 'claude-3-5-sonnet-20241022', name: 'claude-3-5-sonnet-20241022' },
      { id: 'claude-3-5-haiku-20241022', name: 'claude-3-5-haiku-20241022' },
      { id: 'claude-3-opus-20240229', name: 'claude-3-opus-20240229' }
    ]
  },
  google: {
    id: 'google',
    name: 'Google Gemini',
    type: 'gemini',
    avatar: '🌐',
    remark: 'Google开发的Gemini多模态AI模型',
    officialUrl: 'https://deepmind.google/technologies/gemini/',
    enabled: true,
    models: [
      { id: 'gemini-2.5-flash-preview-04-17', name: 'gemini-2.5-flash-preview-04-17' },
      { id: 'gemini-2.0-flash-exp', name: 'gemini-2.0-flash-exp' },
      { id: 'gemini-1.5-pro', name: 'gemini-1.5-pro' },
      { id: 'gemini-1.5-flash', name: 'gemini-1.5-flash' }
    ]
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama',
    type: 'ollama',
    avatar: '🤖',
    remark: '本地运行的LLM服务框架',
    officialUrl: 'https://ollama.ai',
    enabled: true,
    models: []
  },
  mock: {
    id: 'mock',
    name: 'Mock',
    type: 'mock',
    avatar: '🧪',
    enabled: true,
    models: [{ id: 'mock-model', name: 'mock-model' }]
  }
}

export function ModelSelector({
  currentModel,
  currentProvider,
  onSelect,
  settings
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // 从 settings 构建提供商配置
  const providerConfigs = useMemo(() => {
    const providers: Record<string, ProviderConfig> = { ...DEFAULT_PROVIDERS }

    // 从 settings.providers.builtinConfigs 更新内置提供商模型
    const builtinConfigs = (settings.providers as any)?.builtinConfigs || {}
    Object.entries(builtinConfigs).forEach(([providerId, config]: [string, any]) => {
      if (providers[providerId]) {
        // 更新现有提供商的模型
        if (config.models && config.models.length > 0) {
          providers[providerId].models = config.models.map((m: any) => ({
            id: m.id || m.name,
            name: m.name || m.id
          }))
        }
        // 更新启用状态
        providers[providerId].enabled = config.enabled ?? true
      }
    })

    // 添加自定义提供商
    const customProviders = (settings.providers as any)?.customProviders || []
    customProviders.forEach((provider: any) => {
      providers[provider.id] = {
        id: provider.id,
        name: provider.name,
        type: provider.type,
        avatar: provider.avatar || '🔧',
        remark: provider.remark,
        officialUrl: provider.officialUrl,
        enabled: provider.enabled ?? true,
        models: (provider.models || []).map((m: any) => ({
          id: m.id || m.name,
          name: m.name || m.id
        }))
      }
    })

    return providers
  }, [settings])

  const filteredModels = useMemo(() => {
    return Object.entries(providerConfigs).filter(([_, config]) => {
      if (!config.enabled) return false
      if (!searchQuery) return true

      const queryLower = searchQuery.toLowerCase()

      const matchesProvider = config.name.toLowerCase().includes(queryLower)
      const matchesModel = config.models.some((m) => m.name.toLowerCase().includes(queryLower))

      return matchesProvider || matchesModel
    })
  }, [providerConfigs, searchQuery])

  const handleSelectModel = (model: string, provider: ProviderName) => {
    onSelect(model, provider)
    setIsOpen(false)
    setSearchQuery('')
  }

  const getProviderColor = (providerId: string): string => {
    const colorMap: Record<string, string> = {
      openai: 'green',
      anthropic: 'orange',
      google: 'blue',
      ollama: 'purple',
      mock: 'gray'
    }
    // 为自定义提供商生成基于 hash 的颜色
    if (!colorMap[providerId]) {
      const colors = ['red', 'cyan', 'pink', 'indigo', 'teal', 'yellow']
      const hash = providerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      return colors[hash % colors.length]
    }
    return colorMap[providerId]
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
                        <VStack align="start" gap={1}>
                          <HStack gap={2}>
                            <Text fontSize="xl">{config.avatar}</Text>
                            <Badge colorScheme={getProviderColor(provider)}>{config.name}</Badge>
                            <Text fontSize="sm" color="gray.500" fontWeight="medium">
                              {config.models.length} 个模型
                            </Text>
                          </HStack>
                          {config.remark && (
                            <Text fontSize="xs" color="gray.400" maxW="300px" noOfLines={2}>
                              {config.remark}
                            </Text>
                          )}
                        </VStack>
                      </HStack>

                      <VStack gap={1} maxH="200" overflowY="auto">
                        {config.models.length === 0 ? (
                          <Text fontSize="sm" color="gray.400" textAlign="center" py={4}>
                            无可用模型
                          </Text>
                        ) : (
                          config.models.map((model) => (
                            <HStack
                              key={model.id}
                              p={2}
                              rounded="md"
                              cursor="pointer"
                              bg={
                                currentModel === model.name && currentProvider === provider
                                  ? 'gray.100'
                                  : 'transparent'
                              }
                              _dark={{
                                bg:
                                  currentModel === model.name && currentProvider === provider
                                    ? 'gray.800'
                                    : 'transparent'
                              }}
                              _hover={{ bg: 'gray.50', _dark: { bg: 'gray.800' } }}
                              onClick={() =>
                                handleSelectModel(model.name, provider as ProviderName)
                              }
                              justify="space-between"
                            >
                              <Text
                                fontSize="sm"
                                fontWeight={currentModel === model.name ? 'medium' : 'normal'}
                              >
                                {model.name}
                              </Text>
                              {currentModel === model.name && currentProvider === provider && (
                                <Badge size="xs" colorScheme="green">
                                  当前
                                </Badge>
                              )}
                            </HStack>
                          ))
                        )}
                      </VStack>
                    </Box>
                  ))}
                  {filteredModels.length === 0 && (
                    <Text fontSize="sm" color="gray.400" textAlign="center" py={8}>
                      未找到匹配的模型
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
