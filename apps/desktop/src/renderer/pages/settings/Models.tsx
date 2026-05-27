import { useSettings } from '../../hooks/useSettings'
import { useState, useEffect } from 'react'
import { Plus, GripVertical, Trash2, Edit, ChevronDown, ChevronRight } from 'lucide-react'
import { AddProviderDialog } from '../../components/provider/AddProviderDialog'
import { AddModelDialog } from '../../components/model/AddModelDialog'
import { ModelConfig, ProviderConfig as IPCProviderConfig, ProviderApiSettings } from '@/shared/ipc'

type CustomProviderConfig = Omit<IPCProviderConfig, 'enabled' | 'apiSettings'> & {
  enabled?: boolean
  apiSettings?: ProviderApiSettings
  remark?: string
  officialUrl?: string
}

type ProviderConfig = CustomProviderConfig

const DEFAULT_API_SETTINGS: ProviderApiSettings = {
  supportsArrayMessageContent: false,
  supportsDeveloperMessage: false,
  supportsStreamOptions: false,
  supportsServiceTier: false,
  supportsEnableThinking: false,
  supportsVerbosity: false,
  cacheTokenThreshold: 1000
}

const BUILTIN_PROVIDERS: Omit<
  CustomProviderConfig,
  'baseUrl' | 'apiKeys' | 'defaultModel' | 'models' | 'enabled' | 'apiSettings'
>[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai',
    avatar: '🔮',
    remark: '领先的AI研究实验室，提供GPT系列模型',
    officialUrl: 'https://openai.com'
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    type: 'anthropic',
    avatar: '🎭',
    remark: '专注于安全AI的Claude系列模型',
    officialUrl: 'https://www.anthropic.com'
  },
  {
    id: 'google',
    name: 'Google Gemini',
    type: 'gemini',
    avatar: '🌐',
    remark: 'Google开发的Gemini多模态AI模型',
    officialUrl: 'https://deepmind.google/technologies/gemini/'
  },
  {
    id: 'ollama',
    name: 'Ollama',
    type: 'ollama',
    avatar: '🤖',
    remark: '本地运行的LLM服务框架',
    officialUrl: 'https://ollama.ai'
  }
]

export function SettingsModels() {
  const { settings, updateSettings } = useSettings()
  const [selectedProviderId, setSelectedProviderId] = useState('openai')
  const [customProviders, setCustomProviders] = useState<CustomProviderConfig[]>([])
  const [providerOrder, setProviderOrder] = useState<string[]>(['openai', 'anthropic', 'google', 'ollama'])
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [editingProvider, setEditingProvider] = useState<CustomProviderConfig | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const [, setForceUpdateCount] = useState(0)

  // 触发组件重载
  const forceUpdate = () => setForceUpdateCount((prev) => prev + 1)
  // Model management state
  const [isShowModelDialog, setIsShowModelDialog] = useState(false)
  const [editingModel, setEditingModel] = useState<ModelConfig | null>(null)

  // API Key editing state
  const [editingApiKeyIndex, setEditingApiKeyIndex] = useState<number | null>(null)
  const [tempApiKey, setTempApiKey] = useState('')

  // Base URL state
  const [tempBaseUrl, setTempBaseUrl] = useState('')

  // Expansion state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    baseUrl: true,
    apiKeys: true,
    models: true,
    apiSettings: true
  })

  const getAllProviders = (): ProviderConfig[] => {
    const allCustom = customProviders.map((p) => ({ ...p }))
    return [
      ...BUILTIN_PROVIDERS.map((p) => ({
        ...p,
        baseUrl: '',
        apiKeys: [],
        models: [],
        defaultModel: undefined,
        enabled: true,
        apiSettings: DEFAULT_API_SETTINGS
      })),
      ...allCustom
    ]
  }

  const getOrderedProviders = (): ProviderConfig[] => {
    const providerMap = new Map(getAllProviders().map((p) => [p.id, p]))
    return providerOrder.map((id) => providerMap.get(id)).filter((p): p is ProviderConfig => p !== undefined)
  }

  const handleDragStart = (e: React.DragEvent, providerId: string) => {
    e.dataTransfer.setData('providerId', providerId)
  }

  const handleDragOver = (e: React.DragEvent, providerId: string) => {
    e.preventDefault()
    setDragOverId(providerId)
  }

  const handleDrop = (e: React.DragEvent, targetProviderId: string) => {
    e.preventDefault()
    setDragOverId(null)
    const draggedId = e.dataTransfer.getData('providerId')
    if (draggedId === targetProviderId) return

    const newOrder = [...providerOrder]
    const draggedIndex = newOrder.indexOf(draggedId)
    const targetIndex = newOrder.indexOf(targetProviderId)

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedId)

    setProviderOrder(newOrder)
    saveProviderOrder(newOrder)
  }

  const saveProviderOrder = (order: string[]) => {
    const providersToSave = customProviders.filter(
      (p) => p.baseUrl || p.apiKeys.length > 0 || p.models.length > 0 || p.defaultModel
    )

    updateSettings('providers', {
      ...(settings.providers || {}),
      providerOrder: order
    })
  }

  // 组件挂载时自动加载 Ollama 模型（不依赖 selectedProviderId）
  useEffect(() => {
    loadOllamaModelsAutomatically()
  }, [])

  // 加载 Ollama 模型的核心函数
  const loadOllamaModelsAutomatically = async () => {
    try {
      const models = await window.api.ollama.listModels()
      if (!models || models.length === 0) {
        console.log('No Ollama models found or Ollama is not available')
        return
      }

      console.log(
        '🔄 Auto-loaded Ollama models:',
        models.length,
        models.map((m) => m.name)
      )

      // Convert Ollama models to ModelConfig format
      const modelConfigs: ModelConfig[] = models.map((model) => ({
        id: model.name,
        name: model.name,
        groupId: 'ollama',
        types: [],
        supportsStreaming: true,
        currency: undefined,
        inputPrice: undefined,
        outputPrice: undefined
      }))

      // Update Ollama provider with models
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === 'ollama')
      if (providerIndex !== -1) {
        providers[providerIndex].models = modelConfigs
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS

        // 保存到内置 provider 配置
        saveBuiltinProviderConfig(providers[providerIndex])

        // 触发组件重载以更新 UI
        forceUpdate()
      }
    } catch (error) {
      console.error('Failed to load Ollama models:', error)
    }
  }
  const handleAddCustomProvider = (providerData: Omit<CustomProviderConfig, 'id'>) => {
    const isEditing = editingProvider !== null

    if (isEditing && editingProvider) {
      const updated = customProviders.map((p) => (p.id === editingProvider.id ? { ...p, ...providerData } : p))
      setCustomProviders(updated)
      updateCustomProviders(updated)
      if (selectedProviderId === editingProvider.id) {
        setSelectedProviderId(editingProvider.id)
      }
    } else {
      const newProvider: CustomProviderConfig = {
        id: `custom-${Date.now()}`,
        ...providerData,
        baseUrl: '',
        apiKeys: [],
        models: [],
        defaultModel: undefined,
        enabled: true,
        apiSettings: DEFAULT_API_SETTINGS
      }
      setCustomProviders([...customProviders, newProvider])
      setProviderOrder([...providerOrder, newProvider.id])
      setSelectedProviderId(newProvider.id)

      updateCustomProviders([...customProviders, newProvider])
      updateSettings('providers', {
        ...(settings.providers || {}),
        providerOrder: [...providerOrder, newProvider.id]
      })
    }

    setIsShowDialog(false)
    setEditingProvider(null)
  }

  const handleDeleteCustomProvider = (id: string) => {
    const updated = customProviders.filter((p) => p.id !== id)
    setCustomProviders(updated)
    const newOrder = providerOrder.filter((pid) => pid !== id)
    setProviderOrder(newOrder)

    if (selectedProviderId === id) {
      setSelectedProviderId('openai')
    }

    updateCustomProviders(updated)
    updateSettings('providers', {
      ...(settings.providers || {}),
      customProviders: updated,
      providerOrder: newOrder
    })
  }

  const handleEditProvider = (provider: CustomProviderConfig) => {
    setEditingProvider(provider)
    setIsShowDialog(true)
  }

  // Toggle provider enabled status
  const toggleProviderEnabled = (enabled: boolean) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) => (p.id === selectedProviderId ? { ...p, enabled } : p))
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].enabled = enabled
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
  }

  // API Key management
  const addApiKey = () => {
    if (!tempApiKey.trim()) return

    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId ? { ...p, apiKeys: [...p.apiKeys, tempApiKey.trim()] } : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].apiKeys.push(tempApiKey.trim())
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
    setTempApiKey('')
  }

  const updateApiKey = (index: number, newKey: string) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId ? { ...p, apiKeys: p.apiKeys.map((k, i) => (i === index ? newKey.trim() : k)) } : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].apiKeys[index] = newKey.trim()
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
    setEditingApiKeyIndex(null)
  }

  const deleteApiKey = (index: number) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId ? { ...p, apiKeys: p.apiKeys.filter((_, i) => i !== index) } : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].apiKeys = providers[providerIndex].apiKeys.filter((_, i) => i !== index)
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
  }

  // Base URL management
  const saveBaseUrl = (baseUrl: string) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) => (p.id === selectedProviderId ? { ...p, baseUrl: baseUrl.trim() } : p))
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].baseUrl = baseUrl.trim()
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
    setTempBaseUrl(baseUrl.trim())
  }

  // API Settings management
  const updateApiSetting = <K extends keyof ProviderApiSettings>(setting: K, value: ProviderApiSettings[K]) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId
          ? {
              ...p,
              apiSettings: {
                ...DEFAULT_API_SETTINGS,
                ...p.apiSettings,
                [setting]: value
              }
            }
          : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].apiSettings = {
          ...DEFAULT_API_SETTINGS,
          ...providers[providerIndex].apiSettings,
          [setting]: value
        }
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
  }

  // Model management
  const handleAddModel = (model: ModelConfig) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId ? { ...p, models: [...p.models, model] } : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].models.push(model)
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
    setIsShowModelDialog(false)
    setEditingModel(null)
  }

  const handleEditModel = (model: ModelConfig) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId ? { ...p, models: p.models.map((m) => (m.id === model.id ? model : m)) } : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        const modelIndex = providers[providerIndex].models.findIndex((m) => m.id === model.id)
        if (modelIndex !== -1) {
          providers[providerIndex].models[modelIndex] = model
          providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
          saveBuiltinProviderConfig(providers[providerIndex])
        }
      }
    }
    setIsShowModelDialog(false)
    setEditingModel(null)
  }

  const handleDeleteModel = (modelId: string) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) =>
        p.id === selectedProviderId ? { ...p, models: p.models.filter((m) => m.id !== modelId) } : p
      )
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].models = providers[providerIndex].models.filter((m) => m.id !== modelId)
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
  }

  const saveDefaultModel = (modelId: string) => {
    if (selectedProviderId.startsWith('custom-')) {
      const updated = customProviders.map((p) => (p.id === selectedProviderId ? { ...p, defaultModel: modelId } : p))
      setCustomProviders(updated)
      updateCustomProviders(updated)
    } else {
      const providers = getAllProviders()
      const providerIndex = providers.findIndex((p) => p.id === selectedProviderId)
      if (providerIndex !== -1) {
        providers[providerIndex].defaultModel = modelId
        providers[providerIndex].apiSettings = providers[providerIndex].apiSettings || DEFAULT_API_SETTINGS
        saveBuiltinProviderConfig(providers[providerIndex])
      }
    }
  }

  const updateCustomProviders = (updated: CustomProviderConfig[]) => {
    updateSettings('providers', {
      ...(settings.providers || {}),
      customProviders: updated
    })
  }

  const saveBuiltinProviderConfig = (provider: ProviderConfig) => {
    const builtinConfigs = (settings.providers as any)?.builtinConfigs || {}
    builtinConfigs[provider.id] = {
      enabled: provider.enabled,
      baseUrl: provider.baseUrl,
      apiKeys: provider.apiKeys,
      defaultModel: provider.defaultModel,
      models: provider.models,
      apiSettings: provider.apiSettings
    }
    updateSettings('providers', {
      ...(settings.providers || {}),
      builtinConfigs
    } as any)
  }

  const getBuiltinProviderConfig = (providerId: string): Partial<ProviderConfig> | undefined => {
    const builtinConfigs = (settings.providers as any)?.builtinConfigs
    return builtinConfigs?.[providerId]
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const currentProvider = getAllProviders().find((p) => p.id === selectedProviderId)
  const builtinConfig = selectedProviderId.startsWith('custom-')
    ? undefined
    : getBuiltinProviderConfig(selectedProviderId)

  const mergedProvider: ProviderConfig | null = currentProvider
    ? {
        ...currentProvider,
        ...builtinConfig
      }
    : null

  const orderedProviders = getOrderedProviders()

  const groupedModels = mergedProvider?.models
    ? mergedProvider.models.reduce(
        (acc, model) => {
          const group = model.groupId || 'default'
          if (!acc[group]) {
            acc[group] = []
          }
          acc[group].push(model)
          return acc
        },
        {} as Record<string, ModelConfig[]>
      )
    : {}

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* 左侧服务商列表 */}
      <div
        style={{
          width: '200px',
          borderRight: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <div
          style={{
            flex: 1,
            overflowY: 'auto'
          }}>
          {orderedProviders.map((provider) => {
            const isActive = provider.id === selectedProviderId
            const isCustom = provider.id.startsWith('custom-')

            return (
              <div
                key={provider.id}
                draggable
                onDragStart={(e) => handleDragStart(e, provider.id)}
                onDragOver={(e) => handleDragOver(e, provider.id)}
                onDrop={(e) => handleDrop(e, provider.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: isActive ? '#3b82f6' : dragOverId === provider.id ? '#dbeafe' : 'transparent',
                  color: isActive ? 'white' : '#374151',
                  opacity: provider.enabled === false ? 0.5 : 1,
                  WebkitAppRegion: 'no-drag'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && dragOverId !== provider.id) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
                onClick={() => setSelectedProviderId(provider.id)}
                onMouseLeaveCapture={() => setDragOverId(null)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <GripVertical size={16} color={isActive ? 'white' : '#9ca3af'} style={{ cursor: 'grab' }} />
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px'
                    }}>
                    {provider.avatar.startsWith('http') ? (
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                      />
                    ) : (
                      <span>{provider.avatar}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: isActive ? '500' : 'normal' }}>{provider.name}</div>
                    {provider.remark && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: isActive ? 'rgba(255,255,255,0.8)' : '#6b7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '120px'
                        }}>
                        {provider.remark}
                      </div>
                    )}
                  </div>
                  {!provider.enabled && (
                    <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '4px' }}>(已禁用)</span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isCustom && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const provider = customProviders.find((p) => p.id === selectedProviderId)
                          if (provider) {
                            handleEditProvider({
                              ...provider,
                              baseUrl: mergedProvider?.baseUrl || '',
                              apiKeys: mergedProvider?.apiKeys || [],
                              models: mergedProvider?.models || [],
                              defaultModel: mergedProvider?.defaultModel,
                              enabled: mergedProvider?.enabled ?? true,
                              apiSettings: mergedProvider?.apiSettings ?? DEFAULT_API_SETTINGS
                            })
                          }
                        }}
                        title="编辑"
                        style={{
                          padding: '4px',
                          border: 'none',
                          background: 'transparent',
                          color: '#6b7280',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}>
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCustomProvider(provider.id)
                        }}
                        title="删除"
                        style={{
                          padding: '4px',
                          border: 'none',
                          background: 'transparent',
                          color: '#ef4444',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}>
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                  <ChevronRight size={16} color={isActive ? 'white' : '#9ca3af'} />
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ padding: '12px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => {
              setEditingProvider(null)
              setIsShowDialog(true)
            }}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px dashed #d1d5db',
              borderRadius: '6px',
              background: 'transparent',
              color: '#3b82f6',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
            <Plus size={14} />
            添加服务商
          </button>
        </div>
      </div>

      {/* 右侧配置面板 */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {mergedProvider && (
          <div>
            {/* 服务商头部 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                {mergedProvider.avatar.startsWith('http') ? (
                  <img
                    src={mergedProvider.avatar}
                    alt={mergedProvider.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                ) : (
                  <span>{mergedProvider.avatar}</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>{mergedProvider.name}</h2>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}>
                    <input
                      type="checkbox"
                      checked={mergedProvider.enabled ?? true}
                      onChange={(e) => toggleProviderEnabled(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span>启用</span>
                  </label>
                </div>
                <div style={{ marginTop: '4px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>类型: {mergedProvider.type}</p>
                  {mergedProvider.remark && (
                    <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0', fontStyle: 'italic' }}>
                      备注: {mergedProvider.remark}
                    </p>
                  )}
                  {mergedProvider.officialUrl && (
                    <a
                      href={mergedProvider.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '13px',
                        color: '#3b82f6',
                        textDecoration: 'none',
                        margin: '4px 0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none'
                      }}>
                      官网: {mergedProvider.officialUrl}
                    </a>
                  )}
                </div>
              </div>
            </div>
            {/* API 密钥 */}
            <ConfigItem title="API 密钥">
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (editingApiKeyIndex !== null) {
                          updateApiKey(editingApiKeyIndex, tempApiKey)
                        } else {
                          addApiKey()
                        }
                      }
                    }}
                    placeholder="sk-... 或输入您的 API 密钥"
                    type="password"
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={() => {
                      if (editingApiKeyIndex !== null) {
                        updateApiKey(editingApiKeyIndex, tempApiKey)
                      } else {
                        addApiKey()
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                    {editingApiKeyIndex !== null ? '保存' : '添加'}
                  </button>
                  {editingApiKeyIndex !== null && (
                    <button
                      onClick={() => {
                        setEditingApiKeyIndex(null)
                        setTempApiKey('')
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                      取消
                    </button>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>API 密钥将使用系统加密存储</p>
              </div>

              {mergedProvider.apiKeys.length === 0 ? (
                <p
                  style={{
                    fontSize: '13px',
                    color: '#9ca3af',
                    textAlign: 'center',
                    padding: '20px'
                  }}>
                  暂无 API 密钥
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {mergedProvider.apiKeys.map((apiKey, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 12px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb'
                      }}>
                      {editingApiKeyIndex === index ? (
                        <input
                          value={tempApiKey}
                          onChange={(e) => setTempApiKey(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              updateApiKey(index, tempApiKey)
                            }
                          }}
                          autoFocus
                          style={{
                            flex: 1,
                            padding: '6px 10px',
                            border: '1px solid #3b82f6',
                            borderRadius: '4px',
                            fontSize: '13px'
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            flex: 1,
                            fontSize: '13px',
                            fontFamily: 'monospace',
                            wordBreak: 'break-all'
                          }}>
                          {apiKey.slice(0, 8)}
                          {''.padEnd(Math.max(0, apiKey.length - 12), '•')}
                          {apiKey.slice(-4)}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          if (editingApiKeyIndex === index) {
                            setEditingApiKeyIndex(null)
                            setTempApiKey('')
                          } else {
                            setEditingApiKeyIndex(index)
                            setTempApiKey(apiKey)
                          }
                        }}
                        style={{
                          padding: '6px',
                          border: 'none',
                          background: 'transparent',
                          color: editingApiKeyIndex === index ? '#6b7280' : '#3b82f6',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteApiKey(index)}
                        style={{
                          padding: '6px',
                          border: 'none',
                          background: 'transparent',
                          color: '#ef4444',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </ConfigItem>

            {/* API 地址 */}
            <ConfigItem title="API 地址">
              <input
                value={mergedProvider.baseUrl || ''}
                onChange={(e) => setTempBaseUrl(e.target.value)}
                onBlur={() => saveBaseUrl(tempBaseUrl)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    saveBaseUrl(tempBaseUrl)
                  }
                }}
                placeholder="https://api.example.com"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </ConfigItem>

            {/* 模型管理 */}
            <ConfigItem title={`模型管理 (${mergedProvider.models.length})`}>
              <button
                onClick={() => {
                  setEditingModel(null)
                  setIsShowModelDialog(true)
                }}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px dashed #d1d5db',
                  borderRadius: '6px',
                  background: 'transparent',
                  color: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}>
                <Plus size={14} />
                添加模型
              </button>

              {/* Ollama 特有的刷新按钮 */}
              {selectedProviderId === 'ollama' && (
                <button
                  onClick={loadOllamaModelsAutomatically}
                  style={{
                    width: '100%',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: '4px',
                    background: '#10b981',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                  🔄 刷新 Ollama 模型列表
                </button>
              )}
              <div style={{ marginTop: '16px' }}>
                {Object.entries(groupedModels).map(([groupId, groupModels]) => (
                  <div key={groupId} style={{ marginBottom: '20px' }}>
                    <h4
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                      {groupId === 'default' ? '默认分组' : groupId}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {groupModels.map((model) => (
                        <div
                          key={model.id}
                          style={{
                            padding: '12px',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                          }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between'
                            }}>
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  marginBottom: '4px'
                                }}>
                                <span
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#111827'
                                  }}>
                                  {model.name}
                                </span>
                                {model.types.length > 0 && (
                                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    {model.types.map((type) => (
                                      <span
                                        key={type}
                                        style={{
                                          fontSize: '11px',
                                          padding: '2px 6px',
                                          backgroundColor: '#dbeafe',
                                          color: '#1d4ed8',
                                          borderRadius: '9999px',
                                          fontWeight: '500'
                                        }}>
                                        {type === 'vision' && '视觉'}
                                        {type === 'websearch' && '联网'}
                                        {type === 'reasoning' && '推理'}
                                        {type === 'tools' && '工具'}
                                        {type === 'reranking' && '重排'}
                                        {type === 'embedding' && '嵌入'}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  fontSize: '12px',
                                  color: '#6b7280',
                                  fontFamily: 'monospace',
                                  marginBottom: '4px'
                                }}>
                                ID: {model.id}
                              </div>
                              {model.currency &&
                                (model.inputPrice !== undefined || model.outputPrice !== undefined) && (
                                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                    {model.inputPrice !== undefined && `输入: ${model.inputPrice} ${model.currency}/M`}
                                    {model.inputPrice !== undefined && model.outputPrice !== undefined && ' | '}
                                    {model.outputPrice !== undefined &&
                                      `输出: ${model.outputPrice} ${model.currency}/M`}
                                  </div>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => {
                                  setEditingModel(model)
                                  setIsShowModelDialog(true)
                                }}
                                style={{
                                  padding: '6px',
                                  border: 'none',
                                  background: 'transparent',
                                  color: '#3b82f6',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}>
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteModel(model.id)}
                                style={{
                                  padding: '6px',
                                  border: 'none',
                                  background: 'transparent',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                  borderRadius: '4px',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ConfigItem>

            {/* 更多 API 设置 */}
            <ConfigSection
              title="更多 API 设置"
              expanded={expandedSections.apiSettings}
              onToggle={() => toggleSection('apiSettings')}>
              <div style={{ display: 'grid', gap: '12px' }}>
                <ApiSettingItem
                  title="支持数组格式的 message content"
                  description="允许在 message.content 中使用数组格式（例如包含文本和图片）"
                  checked={mergedProvider.apiSettings?.supportsArrayMessageContent ?? false}
                  onChange={(v) => updateApiSetting('supportsArrayMessageContent', v)}
                />
                <ApiSettingItem
                  title="支持 Developer Message"
                  description="支持在系统消息中添加开发商特定的元数据"
                  checked={mergedProvider.apiSettings?.supportsDeveloperMessage ?? false}
                  onChange={(v) => updateApiSetting('supportsDeveloperMessage', v)}
                />
                <ApiSettingItem
                  title="支持 stream_options"
                  description="在流式请求中支持 stream_options 参数配置"
                  checked={mergedProvider.apiSettings?.supportsStreamOptions ?? false}
                  onChange={(v) => updateApiSetting('supportsStreamOptions', v)}
                />
                <ApiSettingItem
                  title="支持 service_tier"
                  description="支持服务层级配置（如 auto、default、scale 等）"
                  checked={mergedProvider.apiSettings?.supportsServiceTier ?? false}
                  onChange={(v) => updateApiSetting('supportsServiceTier', v)}
                />
                <ApiSettingItem
                  title="支持 enable_thinking"
                  description="启用思考模式，让模型展示推理过程"
                  checked={mergedProvider.apiSettings?.supportsEnableThinking ?? false}
                  onChange={(v) => updateApiSetting('supportsEnableThinking', v)}
                />
                <ApiSettingItem
                  title="支持 verbosity"
                  description="支持输出详细程度控制"
                  checked={mergedProvider.apiSettings?.supportsVerbosity ?? false}
                  onChange={(v) => updateApiSetting('supportsVerbosity', v)}
                />
                <div style={{ paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                    缓存 Token 阈值
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={mergedProvider.apiSettings?.cacheTokenThreshold ?? 1000}
                    onChange={(e) => updateApiSetting('cacheTokenThreshold', parseInt(e.target.value) || 0)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                    消息超过此 Token 数才会被缓存。设为 0 时禁用缓存。
                  </p>
                </div>
              </div>
            </ConfigSection>
          </div>
        )}

        <AddProviderDialog
          isOpen={isShowDialog}
          onClose={() => {
            setIsShowDialog(false)
            setEditingProvider(null)
          }}
          onAdd={handleAddCustomProvider}
          editingProvider={editingProvider}
        />

        <AddModelDialog
          isOpen={isShowModelDialog}
          onClose={() => {
            setIsShowModelDialog(false)
            setEditingModel(null)
          }}
          onAdd={editingModel ? handleEditModel : handleAddModel}
          editingModel={editingModel}
        />
      </div>
    </div>
  )
}

function ConfigItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: '24px',
        paddingBottom: '24px'
      }}>
      <h3
        style={{
          fontSize: '15px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px'
        }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

function ConfigSection({
  title,
  expanded,
  onToggle,
  children
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        marginTop: '24px',
        paddingBottom: '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '15px',
          fontWeight: '600',
          color: '#111827'
        }}>
        <span>{title}</span>
        {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {expanded && <div style={{ marginTop: '16px' }}>{children}</div>}
    </div>
  )
}

function ApiSettingItem({
  title,
  description,
  checked,
  onChange
}: {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f9fafb'
      }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: '2px', cursor: 'pointer' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{description}</div>
      </div>
    </label>
  )
}
