import { Settings2 } from 'lucide-react'
import { useState, useMemo } from 'react'
import type { ProviderName, AppSettings } from '@/shared/ipc'
import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Badge } from '@/renderer/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/renderer/components/ui/dialog'
import { cn } from '@/renderer/lib/utils'

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

export function ModelSelector({ currentModel, currentProvider, onSelect, settings }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const providerConfigs = useMemo(() => {
    const providers: Record<string, ProviderConfig> = { ...DEFAULT_PROVIDERS }

    const builtinConfigs = (settings.providers as any)?.builtinConfigs || {}
    Object.entries(builtinConfigs).forEach(([providerId, config]: [string, any]) => {
      if (providers[providerId]) {
        if (config.models && config.models.length > 0) {
          providers[providerId].models = config.models.map((m: any) => ({
            id: m.id || m.name,
            name: m.name || m.id
          }))
        }
        providers[providerId].enabled = config.enabled ?? true
      }
    })

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
        variant={currentModel ? 'default' : 'outline'}
        onClick={() => setIsOpen(true)}
      >
        <Settings2 className="h-3.5 w-3.5 mr-2" />
        {currentModel || '选择模型'}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>选择模型</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 flex-1 overflow-hidden">
            <Input
              placeholder="搜索模型（如：gpt-4o, claude, 最新, 免费...）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800"
            />

            <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
              {filteredModels.map(([provider, config]) => (
                <div
                  key={provider}
                  className={cn(
                    'border rounded-md p-3',
                    'border-gray-200 dark:border-gray-700'
                  )}
                >
                  <div className="flex justify-between mb-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <span className="text-xl">{config.avatar}</span>
                        <Badge variant={getProviderColor(provider) as any}>
                          {config.name}
                        </Badge>
                        <span className="text-sm text-gray-500 font-medium">
                          {config.models.length} 个模型
                        </span>
                      </div>
                      {config.remark && (
                        <span className="text-xs text-gray-400 max-w-sm line-clamp-2">
                          {config.remark}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                    {config.models.length === 0 ? (
                      <div className="flex justify-center py-4">
                        <span className="text-sm text-gray-400">无可用模型</span>
                      </div>
                    ) : (
                      config.models.map((model) => (
                        <div
                          key={model.id}
                          className={cn(
                            'p-2 rounded-md cursor-pointer flex justify-between items-center',
                            'hover:bg-gray-50 dark:hover:bg-gray-800',
                            currentModel === model.name && currentProvider === provider
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : 'transparent'
                          )}
                          onClick={() => handleSelectModel(model.name, provider as ProviderName)}
                        >
                          <span
                            className={cn(
                              'text-sm',
                              currentModel === model.name && 'font-medium'
                            )}
                          >
                            {model.name}
                          </span>
                          {currentModel === model.name && currentProvider === provider && (
                            <Badge variant="green">
                              当前
                            </Badge>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
              {filteredModels.length === 0 && (
                <div className="flex justify-center py-8">
                  <span className="text-sm text-gray-400 text-center">
                    未找到匹配的模型
                  </span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
