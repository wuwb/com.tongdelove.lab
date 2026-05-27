import { useState } from 'react'
import { useSettings } from '../../hooks/useSettings'
import type { Prompt, InsertPrompt, QuickPhrase, PromptCustomParameter, PromptCategory } from '@/shared/ipc'
import { ChevronDown, Plus, Trash2, X } from 'lucide-react'
import { cn } from '@/renderer/lib/utils'
import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Textarea } from '@/renderer/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from '@/renderer/components/ui/dialog'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/renderer/components/ui/select'
import { Switch } from '@/renderer/components/ui/switch'
import { Label } from '@/renderer/components/ui/label'

interface PromptEditorProps {
    prompt: Prompt | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (prompt: InsertPrompt) => Promise<void>
    onCancel?: () => void
    categories?: PromptCategory[]
}

const AVATARS = ['🤖', '👨‍💻', '👩‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🎨', '🧑‍🚀', '🧑‍🔧', '🧙‍♂️', '🧛‍♂️', '🧞‍♀️', '🧜‍♂️', '🧝‍♀️']
const UNCATEGORIZED_VALUE = '_uncategorized_'

export function PromptEditor({ prompt, open, onOpenChange, onSave, onCancel, categories = [] }: PromptEditorProps) {
    const { settings } = useSettings()

    const [name, setName] = useState(prompt?.name || '')
    const [avatar, setAvatar] = useState(prompt?.avatar || '🤖')
    const [icon, setIcon] = useState(prompt?.icon || '')
    const [description, setDescription] = useState(prompt?.description || '')
    const [systemPrompt, setSystemPrompt] = useState(prompt?.systemPrompt || '')
    const [knowledgeBaseIds, setKnowledgeBaseIds] = useState(prompt?.knowledgeBaseIds || [])
    const [defaultModel, setDefaultModel] = useState(prompt?.defaultModel || 'gpt-3.5-turbo')
    const [selectedCategory, setSelectedCategory] = useState<string>(
        prompt?.categoryId || UNCATEGORIZED_VALUE
    )
    const [temperature, setTemperature] = useState(prompt?.temperature ?? 0.7)
    const [topP, setTopP] = useState(prompt?.topP ?? 1.0)
    const [contextWindow, setContextWindow] = useState(prompt?.contextWindow ?? 8192)
    const [maxTokens, setMaxTokens] = useState(prompt?.maxTokens ?? 4096)
    const [streamingEnabled, setStreamingEnabled] = useState(prompt?.streamingEnabled ?? true)
    const [toolCallMethod, setToolCallMethod] = useState<'function' | 'prompt'>(prompt?.toolCallMethod || 'function')
    const [mcpServerMode, setMcpServerMode] = useState<'disabled' | 'auto' | 'manual'>(prompt?.mcpServerMode || 'auto')
    const [globalMemoryEnabled, setGlobalMemoryEnabled] = useState(prompt?.globalMemoryEnabled ?? false)
    const [customParameters, setCustomParameters] = useState<PromptCustomParameter[]>(prompt?.customParameters || [])
    const [quickPhrases, setQuickPhrases] = useState<QuickPhrase[]>(prompt?.quickPhrases || [])

    const handleSave = async () => {
        const categoryId = selectedCategory === UNCATEGORIZED_VALUE ? '' : selectedCategory
        const newPrompt: InsertPrompt = {
            name,
            avatar,
            icon,
            description,
            systemPrompt,
            knowledgeBaseIds,
            defaultModel,
            categoryId,
            temperature,
            topP,
            contextWindow,
            maxTokens,
            streamingEnabled,
            toolCallMethod,
            customParameters,
            mcpServerMode,
            quickPhrases,
            globalMemoryEnabled
        }

        await onSave(newPrompt)
    }

    const addCustomParameter = () => {
        setCustomParameters([...customParameters, { name: '', type: 'text', value: '' }])
    }

    const removeCustomParameter = (index: number) => {
        setCustomParameters(customParameters.filter((_, i) => i !== index))
    }

    const updateCustomParameter = (index: number, updates: Partial<PromptCustomParameter>) => {
        setCustomParameters(customParameters.map((param, i) => (i === index ? { ...param, ...updates } : param)))
    }

    const addQuickPhrase = () => {
        setQuickPhrases([...quickPhrases, { title: '', content: '' }])
    }

    const removeQuickPhrase = (index: number) => {
        setQuickPhrases(quickPhrases.filter((_, i) => i !== index))
    }

    const updateQuickPhrase = (index: number, updates: Partial<QuickPhrase>) => {
        setQuickPhrases(quickPhrases.map((phrase, i) => (i === index ? { ...phrase, ...updates } : phrase)))
    }

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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>{prompt ? '编辑提示词' : '创建提示词'}</DialogTitle>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <DialogDescription className="sr-only">
                        {prompt ? '编辑现有提示词的配置' : '创建一个新的提示词'}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 py-2">
                    <div>
                        <Label className="text-sm font-medium mb-3 block">头像</Label>
                        <div className="flex gap-2 flex-wrap">
                            {AVATARS.map((ava) => (
                                <Button
                                    key={ava}
                                    variant={avatar === ava ? 'default' : 'outline'}
                                    size="lg"
                                    onClick={() => setAvatar(ava)}
                                    className={cn(
                                        'h-10 w-10 p-0 text-xl',
                                        avatar === ava ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' : 'bg-white dark:bg-gray-800'
                                    )}
                                >
                                    {ava}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-medium">基本信息</Label>
                        <div>
                            <Label className="text-xs text-gray-500 mb-1.5 block">
                                提示词名称 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                placeholder="请输入提示词名称"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="选择分类（可选）" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={UNCATEGORIZED_VALUE}>未分类</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="图标 (emoji，可选)"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                        />
                        <Textarea
                            placeholder="描述（可选）"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[60px]"
                        />
                        <Textarea
                            placeholder="系统提示词（可选）"
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="min-h-[120px]"
                        />
                        <Input
                            placeholder="知识库 IDs (逗号分隔，可选)"
                            value={knowledgeBaseIds.join(',')}
                            onChange={(e) => {
                                const ids = e.target.value
                                    .split(',')
                                    .map((t) => t.trim())
                                    .filter((t) => t.length > 0)
                                setKnowledgeBaseIds(ids)
                            }}
                        />
                    </div>

                    <div className="border rounded-lg">
                        <details className="group">
                            <summary className="flex items-center justify-between p-3 cursor-pointer list-none hover:bg-gray-50 dark:hover:bg-gray-800 rounded-t-lg">
                                <span className="text-sm font-medium">高级设置</span>
                                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="p-4 pt-0 flex flex-col gap-4">
                                <div>
                                    <Label className="text-xs text-gray-500 mb-2 block">默认模型</Label>
                                    <Select value={defaultModel} onValueChange={setDefaultModel}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择模型" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {models.map((model) => (
                                                <SelectItem key={model.id} value={model.id}>
                                                    {model.name} ({model.provider})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-gray-500 mb-2 block">温度</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={2}
                                            step={0.1}
                                            value={temperature}
                                            onChange={(e) => setTemperature(Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500 mb-2 block">Top-P</Label>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            value={topP}
                                            onChange={(e) => setTopP(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-gray-500 mb-2 block">上下文窗口</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={contextWindow}
                                            onChange={(e) => setContextWindow(Number(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500 mb-2 block">最大 Tokens</Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={maxTokens}
                                            onChange={(e) => setMaxTokens(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs text-gray-500">流式输出</Label>
                                        <Switch
                                            checked={streamingEnabled}
                                            onCheckedChange={setStreamingEnabled}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs text-gray-500">全局记忆</Label>
                                        <Switch
                                            checked={globalMemoryEnabled}
                                            onCheckedChange={setGlobalMemoryEnabled}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs text-gray-500 mb-2 block">工具调用方式</Label>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant={toolCallMethod === 'function' ? 'default' : 'outline'}
                                            onClick={() => setToolCallMethod('function')}
                                        >
                                            函数
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={toolCallMethod === 'prompt' ? 'default' : 'outline'}
                                            onClick={() => setToolCallMethod('prompt')}
                                        >
                                            提示词
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-xs text-gray-500 mb-2 block">MCP 服务器</Label>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant={mcpServerMode === 'disabled' ? 'default' : 'outline'}
                                            onClick={() => setMcpServerMode('disabled')}
                                        >
                                            禁用
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={mcpServerMode === 'auto' ? 'default' : 'outline'}
                                            onClick={() => setMcpServerMode('auto')}
                                        >
                                            自动
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={mcpServerMode === 'manual' ? 'default' : 'outline'}
                                            onClick={() => setMcpServerMode('manual')}
                                        >
                                            手动
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Label className="text-xs text-gray-500">自定义参数</Label>
                                        <Button size="sm" variant="outline" onClick={addCustomParameter}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {customParameters.map((param, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <Input
                                                    placeholder="参数名"
                                                    value={param.name}
                                                    onChange={(e) => updateCustomParameter(index, { name: e.target.value })}
                                                    className="flex-1"
                                                />
                                                <div className="flex gap-1 flex-1">
                                                    <Button
                                                        size="sm"
                                                        variant={param.type === 'number' ? 'default' : 'outline'}
                                                        onClick={() => updateCustomParameter(index, { type: 'number' })}
                                                        className="px-2 h-8 text-xs"
                                                    >
                                                        数字
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant={param.type === 'text' ? 'default' : 'outline'}
                                                        onClick={() => updateCustomParameter(index, { type: 'text' })}
                                                        className="px-2 h-8 text-xs"
                                                    >
                                                        文本
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant={param.type === 'boolean' ? 'default' : 'outline'}
                                                        onClick={() => updateCustomParameter(index, { type: 'boolean' })}
                                                        className="px-2 h-8 text-xs"
                                                    >
                                                        布尔
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant={param.type === 'json' ? 'default' : 'outline'}
                                                        onClick={() => updateCustomParameter(index, { type: 'json' })}
                                                        className="px-2 h-8 text-xs"
                                                    >
                                                        JSON
                                                    </Button>
                                                </div>
                                                <Input
                                                    placeholder="值"
                                                    value={param.value}
                                                    onChange={(e) =>
                                                        updateCustomParameter(index, {
                                                            value: param.type === 'number' ? Number(e.target.value) : e.target.value
                                                        })
                                                    }
                                                    className="flex-1"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 p-0"
                                                    onClick={() => removeCustomParameter(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {customParameters.length === 0 && (
                                            <p className="text-xs text-gray-400 py-2 text-center">
                                                暂无自定义参数
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <Label className="text-xs text-gray-500">常用短语</Label>
                                        <Button size="sm" variant="outline" onClick={addQuickPhrase}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {quickPhrases.map((phrase, index) => (
                                            <div key={index} className="border rounded-md p-3">
                                                <div className="flex gap-2 items-center mb-2">
                                                    <Input
                                                        placeholder="标题"
                                                        value={phrase.title}
                                                        onChange={(e) => updateQuickPhrase(index, { title: e.target.value })}
                                                        className="flex-1"
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-8 w-8 p-0"
                                                        onClick={() => removeQuickPhrase(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Textarea
                                                    placeholder="内容"
                                                    value={phrase.content}
                                                    onChange={(e) => updateQuickPhrase(index, { content: e.target.value })}
                                                    className="min-h-[60px] text-sm"
                                                />
                                            </div>
                                        ))}
                                        {quickPhrases.length === 0 && (
                                            <p className="text-xs text-gray-400 py-2 text-center">
                                                暂无常用短语
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={onCancel}>
                        取消
                    </Button>
                    <Button onClick={handleSave} disabled={!name}>
                        保存
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
