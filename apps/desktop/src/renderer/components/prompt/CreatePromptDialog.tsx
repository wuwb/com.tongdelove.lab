import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@tongdelove/ui/components/dialog'
import { Button } from '@tongdelove/ui/components/button'
import { Input } from '@tongdelove/ui/components/input'
import { Textarea } from '@tongdelove/ui/components/textarea'
import { Label } from '@tongdelove/ui/components/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tongdelove/ui/components/select'
import { usePrompts } from '../../hooks/usePrompts'
import type { InsertPrompt } from '../../../shared/ipc'
import { Plus, X } from 'lucide-react'

const PROVIDER_OPTIONS = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic (Claude)' },
  { value: 'google', label: 'Google (Gemini)' },
  { value: 'ollama', label: 'Ollama' }
]

const DEFAULT_MODELS = {
  openai: 'gpt-3.5-turbo',
  anthropic: 'claude-3-haiku-20240307',
  google: 'gemini-1.5-flash',
  ollama: 'qwen3:8b'
}

interface CreatePromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePromptDialog({ open, onOpenChange }: CreatePromptDialogProps) {
  const { createPrompt } = usePrompts()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [provider, setProvider] = useState('openai')
  const [model, setModel] = useState(DEFAULT_MODELS.openai)
  const [prompt, setPrompt] = useState('')
  const [icon, setIcon] = useState('🤖')
  const [color, setColor] = useState('#6366f1')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const handleCreate = async () => {
    if (!name.trim()) return

    const newPrompt: InsertPrompt = {
      name: name.trim(),
      description: description.trim() || undefined,
      provider,
      model,
      prompt: prompt.trim() || undefined,
      icon,
      color,
      tags: tags.length > 0 ? tags : undefined
    }

    const created = await createPrompt(newPrompt)
    if (created) {
      handleReset()
      onOpenChange(false)
    }
  }

  const handleReset = () => {
    setName('')
    setDescription('')
    setProvider('openai')
    setModel(DEFAULT_MODELS.openai)
    setPrompt('')
    setIcon('🤖')
    setColor('#6366f1')
    setTagInput('')
    setTags([])
  }

  const handleProviderChange = (value: string) => {
    setProvider(value)
    setModel(DEFAULT_MODELS[value as keyof typeof DEFAULT_MODELS])
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>创建新助手</DialogTitle>
          <DialogDescription>配置您的自定义 AI 助手</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">名称 *</Label>
              <Input
                id="name"
                placeholder="例如: 编程助手"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">图标</Label>
              <div className="flex gap-2">
                <Input
                  id="icon"
                  placeholder="🤖"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-16"
                />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Input
              id="description"
              placeholder="助手的功能描述..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>提供商 *</Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROVIDER_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">模型 *</Label>
              <Input
                id="model"
                placeholder="gpt-3.5-turbo"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">系统提示词</Label>
            <Textarea
              id="prompt"
              placeholder="例如: 你是一个专业的编程助手..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>标签</Label>
            <div className="flex gap-2">
              <Input
                placeholder="添加标签..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
              />
              <Button type="button" variant="secondary" size="icon" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            创建
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
