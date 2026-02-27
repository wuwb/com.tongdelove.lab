import { useState } from 'react'
import {
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  Box,
  Switch,
  Dialog,
} from '@chakra-ui/react'
import { useSettings } from '../../hooks/useSettings'
import type {
  Assistant,
  InsertAssistant,
  QuickPhrase,
  AssistantCustomParameter
} from '../../../shared/ipc'
import { ChevronDownIcon, PlusIcon, Trash2Icon, XIcon } from 'lucide-react'

interface AssistantEditorProps {
  assistant: Assistant | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (assistant: InsertAssistant) => Promise<void>
  onCancel?: () => void
}

const AVATARS = ['🤖', '👨‍💻', '👩‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🎨', '🧑‍🚀', '🧑‍🔧', '🧙‍♂️', '🧛‍♂️', '🧞‍♀️', '🧜‍♂️', '🧝‍♀️']

export function AssistantEditor({
  assistant,
  open,
  onOpenChange,
  onSave,
  onCancel
}: AssistantEditorProps) {
  const { settings } = useSettings()

  const [name, setName] = useState(assistant?.name || '')
  const [avatar, setAvatar] = useState(assistant?.avatar || '🤖')

  // 基础信息
  const [icon, setIcon] = useState(assistant?.icon || '')
  const [description, setDescription] = useState(assistant?.description || '')
  const [systemPrompt, setSystemPrompt] = useState(assistant?.systemPrompt || '')
  const [knowledgeBaseIds, setKnowledgeBaseIds] = useState(assistant?.knowledgeBaseIds || [])

  // 高级设置
  const [defaultModel, setDefaultModel] = useState(assistant?.defaultModel || 'gpt-3.5-turbo')
  const [temperature, setTemperature] = useState(assistant?.temperature ?? 0.7)
  const [topP, setTopP] = useState(assistant?.topP ?? 1.0)
  const [contextWindow, setContextWindow] = useState(assistant?.contextWindow ?? 8192)
  const [maxTokens, setMaxTokens] = useState(assistant?.maxTokens ?? 4096)
  const [streamingEnabled, setStreamingEnabled] = useState(assistant?.streamingEnabled ?? true)
  const [toolCallMethod, setToolCallMethod] = useState<'function' | 'prompt'>(
    assistant?.toolCallMethod || 'function'
  )
  const [mcpServerMode, setMcpServerMode] = useState<'disabled' | 'auto' | 'manual'>(
    assistant?.mcpServerMode || 'auto'
  )
  const [globalMemoryEnabled, setGlobalMemoryEnabled] = useState(
    assistant?.globalMemoryEnabled ?? false
  )

  // 自定义参数
  const [customParameters, setCustomParameters] = useState<AssistantCustomParameter[]>(
    assistant?.customParameters || []
  )

  // 常用短语
  const [quickPhrases, setQuickPhrases] = useState<QuickPhrase[]>(assistant?.quickPhrases || [])

  const handleSave = async () => {
    const newAssistant: InsertAssistant = {
      name,
      avatar,
      icon,
      description,
      systemPrompt,
      knowledgeBaseIds,
      defaultModel,
      temperature,
      topP,
      contextWindow,
      maxTokens,
      streamingEnabled,
      toolCallMethod,
      customParameters,
      mcpServerMode,
      quickPhrases,
      globalMemoryEnabled,
      categoryId: ''
    }

    await onSave(newAssistant)
  }

  const addCustomParameter = () => {
    setCustomParameters([...customParameters, { name: '', type: 'text', value: '' }])
  }

  const removeCustomParameter = (index: number) => {
    setCustomParameters(customParameters.filter((_, i) => i !== index))
  }

  const updateCustomParameter = (index: number, updates: Partial<AssistantCustomParameter>) => {
    setCustomParameters(
      customParameters.map((param, i) => (i === index ? { ...param, ...updates } : param))
    )
  }

  const addQuickPhrase = () => {
    setQuickPhrases([...quickPhrases, { title: '', content: '' }])
  }

  const removeQuickPhrase = (index: number) => {
    setQuickPhrases(quickPhrases.filter((_, i) => i !== index))
  }

  const updateQuickPhrase = (index: number, updates: Partial<QuickPhrase>) => {
    setQuickPhrases(
      quickPhrases.map((phrase, i) => (i === index ? { ...phrase, ...updates } : phrase))
    )
  }

  // 获取所有可用模型
  const getAllModels = () => {
    const providers = (settings.providers as any)?.customProviders || []
    const builtinConfigs = (settings.providers as any)?.builtinConfigs || {}
    const models: Array<{ id: string; name: string; provider: string }> = []

    providers.forEach((provider: any) => {
      if (provider.models) {
        provider.models.forEach((model: any) => {
          models.push({
            id: model.id || model.name,
            name: model.name || model.id,
            provider: provider.id
          })
        })
      }
    })

    Object.entries(builtinConfigs).forEach(([providerId, config]: [string, any]) => {
      if (config.models) {
        config.models.forEach((model: any) => {
          models.push({
            id: model.id || model.name,
            name: model.name || model.id,
            provider: providerId
          })
        })
      }
    })

    return models
  }

  const models = getAllModels()

  return (
    <Dialog.Root open={open} onOpenChange={(details) => onOpenChange(details.open)}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{assistant ? '编辑助手' : '创建助手'}</Dialog.Title>
          <Dialog.CloseTrigger asChild>
            <Button variant="ghost" size="sm">
              <XIcon size={16} />
            </Button>
          </Dialog.CloseTrigger>
        </Dialog.Header>
        <Dialog.Body>
          <VStack gap={6}>
            {/* 头像选择 */}
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={3}>
                头像
              </Text>
              <HStack gap={2} flexWrap="wrap">
                {AVATARS.map((ava) => (
                  <Button
                    key={ava}
                    size="lg"
                    variant={avatar === ava ? 'solid' : 'outline'}
                    onClick={() => setAvatar(ava)}
                    colorScheme="gray"
                  >
                    {ava}
                  </Button>
                ))}
              </HStack>
            </Box>

            {/* 基本信息 */}
            <VStack gap={3}>
              <Text fontSize="sm" fontWeight="medium">
                基本信息
              </Text>
              <Input
                placeholder="助手名称"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <Input
                placeholder="图标 (emoji)"
                value={icon}
                onChange={(e) => setIcon(e.currentTarget.value)}
              />
              <Textarea
                placeholder="描述"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                rows={2}
              />
              <Textarea
                placeholder="系统提示词"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.currentTarget.value)}
                rows={4}
              />
              <Input
                placeholder="知识库 IDs (逗号分隔)"
                value={knowledgeBaseIds.join(',')}
                onChange={(e) => setKnowledgeBaseIds(e.currentTarget.value.split(','))}
              />
            </VStack>

            {/* 高级设置 - 使用原生 details/summary */}
            <Box borderWidth={1} borderRadius="md">
              <details>
                <summary
                  style={{
                    cursor: 'pointer',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    listStyle: 'none',
                    userSelect: 'none'
                  }}
                >
                  <Text fontSize="sm" fontWeight="medium">
                    高级设置
                  </Text>
                  <ChevronDownIcon size={16} />
                </summary>
                <Box p={4} pt={0}>
                  <VStack gap={4} pt={4}>
                    {/* 模型选择 */}
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={2}>
                        默认模型
                      </Text>
                      <Box
                        as="select"
                        // value={defaultModel}
                        // onChange={(e) => setDefaultModel(e.currentTarget.value)}
                        px={3}
                        py={2}
                        borderWidth="1px"
                        borderRadius="md"
                        width="100%"
                      >
                        <option value="">选择模型</option>
                        {models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name} ({model.provider})
                          </option>
                        ))}
                      </Box>
                    </Box>

                    <HStack gap={4}>
                      <Box flex={1}>
                        <Text fontSize="xs" color="gray.500" mb={2}>
                          温度
                        </Text>
                        <input
                          type="number"
                          min={0}
                          max={2}
                          step={0.1}
                          value={temperature}
                          onChange={(e) => setTemperature(Number(e.currentTarget.value))}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid',
                            borderRadius: '4px'
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <Text fontSize="xs" color="gray.500" mb={2}>
                          Top-P
                        </Text>
                        <input
                          type="number"
                          min={0}
                          max={1}
                          step={0.1}
                          value={topP}
                          onChange={(e) => setTopP(Number(e.currentTarget.value))}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid',
                            borderRadius: '4px'
                          }}
                        />
                      </Box>
                    </HStack>

                    <HStack gap={4}>
                      <Box flex={1}>
                        <Text fontSize="xs" color="gray.500" mb={2}>
                          上下文窗口
                        </Text>
                        <input
                          type="number"
                          min={1}
                          value={contextWindow}
                          onChange={(e) => setContextWindow(Number(e.currentTarget.value))}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid',
                            borderRadius: '4px'
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <Text fontSize="xs" color="gray.500" mb={2}>
                          最大 Tokens
                        </Text>
                        <input
                          type="number"
                          min={1}
                          value={maxTokens}
                          onChange={(e) => setMaxTokens(Number(e.currentTarget.value))}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid',
                            borderRadius: '4px'
                          }}
                        />
                      </Box>
                    </HStack>

                    <HStack gap={4}>
                      <Box flex={1}>
                        <Text fontSize="xs" color="gray.500" mb={2}>
                          流式输出
                        </Text>
                        <Switch.Root checked={streamingEnabled} onCheckedChange={(details) => setStreamingEnabled(details.checked)} >
                          <Switch.HiddenInput />
                          <Switch.Control>
                            <Switch.Thumb />
                          </Switch.Control>
                          <Switch.Label />
                        </Switch.Root>
                      </Box>
                      <Box flex={1}>
                        <Text fontSize="xs" color="gray.500" mb={2}>
                          全局记忆
                        </Text>
                        <Switch.Root checked={globalMemoryEnabled}
                          onCheckedChange={(details) => setGlobalMemoryEnabled(details.checked)} >
                          <Switch.HiddenInput />
                          <Switch.Control>
                            <Switch.Thumb />
                          </Switch.Control>
                          <Switch.Label />
                        </Switch.Root>
                      </Box>
                    </HStack>

                    {/* 工具调用方式 */}
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={2}>
                        工具调用方式
                      </Text>
                      <HStack gap={2}>
                        <Button
                          size="sm"
                          variant={toolCallMethod === 'function' ? 'solid' : 'outline'}
                          onClick={() => setToolCallMethod('function')}
                          colorScheme={toolCallMethod === 'function' ? 'blue' : 'gray'}
                        >
                          函数
                        </Button>
                        <Button
                          size="sm"
                          variant={toolCallMethod === 'prompt' ? 'solid' : 'outline'}
                          onClick={() => setToolCallMethod('prompt')}
                          colorScheme={toolCallMethod === 'prompt' ? 'blue' : 'gray'}
                        >
                          提示词
                        </Button>
                      </HStack>
                    </Box>

                    {/* MCP 服务器 */}
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={2}>
                        MCP 服务器
                      </Text>
                      <HStack gap={2}>
                        <Button
                          size="sm"
                          variant={mcpServerMode === 'disabled' ? 'solid' : 'outline'}
                          onClick={() => setMcpServerMode('disabled')}
                          colorScheme={mcpServerMode === 'disabled' ? 'blue' : 'gray'}
                        >
                          禁用
                        </Button>
                        <Button
                          size="sm"
                          variant={mcpServerMode === 'auto' ? 'solid' : 'outline'}
                          onClick={() => setMcpServerMode('auto')}
                          colorScheme={mcpServerMode === 'auto' ? 'blue' : 'gray'}
                        >
                          自动
                        </Button>
                        <Button
                          size="sm"
                          variant={mcpServerMode === 'manual' ? 'solid' : 'outline'}
                          onClick={() => setMcpServerMode('manual')}
                          colorScheme={mcpServerMode === 'manual' ? 'blue' : 'gray'}
                        >
                          手动
                        </Button>
                      </HStack>
                    </Box>

                    {/* 自定义参数 */}
                    <Box>
                      <HStack justifyContent="space-between" mb={2}>
                        <Text fontSize="xs" color="gray.500">
                          自定义参数
                        </Text>
                        <Button size="xs" variant="outline" onClick={addCustomParameter}>
                          <PlusIcon size={12} />
                        </Button>
                      </HStack>
                      <VStack gap={2}>
                        {customParameters.map((param, index) => (
                          <HStack key={index} gap={2}>
                            <Input
                              placeholder="参数名"
                              value={param.name}
                              onChange={(e) =>
                                updateCustomParameter(index, { name: e.currentTarget.value })
                              }
                              flex={1}
                            />
                            <HStack flex={1}>
                              <Button
                                size="xs"
                                variant={param.type === 'number' ? 'solid' : 'outline'}
                                onClick={() => updateCustomParameter(index, { type: 'number' })}
                              >
                                数字
                              </Button>
                              <Button
                                size="xs"
                                variant={param.type === 'text' ? 'solid' : 'outline'}
                                onClick={() => updateCustomParameter(index, { type: 'text' })}
                              >
                                文本
                              </Button>
                              <Button
                                size="xs"
                                variant={param.type === 'boolean' ? 'solid' : 'outline'}
                                onClick={() => updateCustomParameter(index, { type: 'boolean' })}
                              >
                                布尔值
                              </Button>
                              <Button
                                size="xs"
                                variant={param.type === 'json' ? 'solid' : 'outline'}
                                onClick={() => updateCustomParameter(index, { type: 'json' })}
                              >
                                JSON
                              </Button>
                            </HStack>
                            <Input
                              placeholder="值"
                              value={param.value}
                              onChange={(e) =>
                                updateCustomParameter(index, {
                                  value:
                                    param.type === 'number'
                                      ? Number(e.currentTarget.value)
                                      : e.currentTarget.value
                                })
                              }
                              flex={1}
                            />
                            <Button
                              size="xs"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => removeCustomParameter(index)}
                            >
                              <Trash2Icon size={14} />
                            </Button>
                          </HStack>
                        ))}
                        {customParameters.length === 0 && (
                          <Text fontSize="xs" color="gray.400">
                            暂无自定义参数
                          </Text>
                        )}
                      </VStack>
                    </Box>

                    {/* 常用短语 */}
                    <Box>
                      <HStack justifyContent="space-between" mb={2}>
                        <Text fontSize="xs" color="gray.500">
                          常用短语
                        </Text>
                        <Button size="xs" variant="outline" onClick={addQuickPhrase}>
                          <PlusIcon size={12} />
                        </Button>
                      </HStack>
                      <VStack gap={2}>
                        {quickPhrases.map((phrase, index) => (
                          <Box key={index} borderWidth={1} rounded="md" p={3}>
                            <HStack gap={2} mb={2}>
                              <Input
                                placeholder="标题"
                                value={phrase.title}
                                onChange={(e) =>
                                  updateQuickPhrase(index, { title: e.currentTarget.value })
                                }
                                flex={1}
                              />
                              <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => removeQuickPhrase(index)}
                              >
                                <XIcon size={14} />
                              </Button>
                            </HStack>
                            <Textarea
                              placeholder="内容"
                              value={phrase.content}
                              onChange={(e) =>
                                updateQuickPhrase(index, { content: e.currentTarget.value })
                              }
                              rows={2}
                              size="sm"
                            />
                          </Box>
                        ))}
                        {quickPhrases.length === 0 && (
                          <Text fontSize="xs" color="gray.400">
                            暂无常用短语
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </details>
            </Box>
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>

          <HStack gap={2}>
            <Button variant="outline" onClick={onCancel}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!name}>
              保存
            </Button>
          </HStack>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
