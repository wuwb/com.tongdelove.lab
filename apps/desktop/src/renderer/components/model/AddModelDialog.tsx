import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ModelType, ModelConfig } from '@/shared/ipc'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/components/ui/dialog'
import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Label } from '@/renderer/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/renderer/components/ui/select'
import { Checkbox } from '@/renderer/components/ui/checkbox'
import { Badge } from '@/renderer/components/ui/badge'

interface AddModelDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (model: ModelConfig) => void
  editingModel?: ModelConfig | null
}

const MODEL_TYPES: { value: ModelType; label: string }[] = [
  { value: 'vision', label: '视觉' },
  { value: 'websearch', label: '联网' },
  { value: 'reasoning', label: '推理' },
  { value: 'tools', label: '工具' },
  { value: 'reranking', label: '重排' },
  { value: 'embedding', label: '嵌入' }
]

const COMMON_CURRENCIES = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'KRW']

export function AddModelDialog({ isOpen, onClose, onAdd, editingModel }: AddModelDialogProps) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [types, setTypes] = useState<ModelType[]>([])
  const [supportsStreaming, setSupportsStreaming] = useState(true)
  const [currency, setCurrency] = useState('USD')
  const [inputPrice, setInputPrice] = useState<number | undefined>(undefined)
  const [outputPrice, setOutputPrice] = useState<number | undefined>(undefined)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (editingModel) {
        setId(editingModel.id)
        setName(editingModel.name)
        setGroupId(editingModel.groupId)
        setTypes(editingModel.types)
        setSupportsStreaming(editingModel.supportsStreaming)
        setCurrency(editingModel.currency || 'USD')
        setInputPrice(editingModel.inputPrice)
        setOutputPrice(editingModel.outputPrice)
        setShowAdvanced(true)
      } else {
        setId('')
        setName('')
        setGroupId('default')
        setTypes([])
        setSupportsStreaming(true)
        setCurrency('USD')
        setInputPrice(undefined)
        setOutputPrice(undefined)
        setShowAdvanced(false)
      }
    }
  }, [editingModel, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!id.trim()) {
      alert('请输入模型ID')
      return
    }

    if (!name.trim()) {
      alert('请输入模型名称')
      return
    }

    onAdd({
      id: id.trim(),
      name: name.trim(),
      groupId: groupId.trim() || 'default',
      types,
      supportsStreaming,
      currency,
      inputPrice,
      outputPrice
    })

    handleClose()
  }

  const handleClose = () => {
    setId('')
    setName('')
    setGroupId('default')
    setTypes([])
    setSupportsStreaming(true)
    setCurrency('USD')
    setInputPrice(undefined)
    setOutputPrice(undefined)
    setShowAdvanced(false)
    onClose()
  }

  const toggleType = (type: ModelType) => {
    setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingModel ? '编辑模型' : '添加模型'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model-id">模型ID *</Label>
              <Input
                id="model-id"
                placeholder="例如: gpt-4, claude-3-opus-20240229"
                value={id}
                onChange={(e) => setId(e.target.value)}
                autoFocus={!editingModel}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model-name">模型名称 *</Label>
              <Input
                id="model-name"
                placeholder="例如: GPT-4, Claude 3 Opus"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model-group">分组名称 *</Label>
              <Input
                id="model-group"
                placeholder="例如: GPT系列, Claude系列"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex w-full items-center justify-between rounded-t-lg bg-muted/50 p-4 text-sm font-medium transition-colors hover:bg-muted/70">
              <span>高级配置</span>
              {showAdvanced ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>

            {showAdvanced && (
              <div className="space-y-4 p-4 pt-0">
                <div className="space-y-3">
                  <Label>模型类型</Label>
                  <div className="flex flex-wrap gap-2">
                    {MODEL_TYPES.map(({ value, label }) => (
                      <Badge
                        key={value}
                        variant={types.includes(value) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleType(value)}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="supports-streaming"
                    checked={supportsStreaming}
                    onCheckedChange={(checked) => setSupportsStreaming(checked as boolean)}
                  />
                  <Label htmlFor="supports-streaming" className="cursor-pointer">
                    支持增量文本输出
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">模型币种</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_CURRENCIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="input-price">模型输入价格（每百万Token）</Label>
                    <Input
                      id="input-price"
                      type="number"
                      step="0.000001"
                      placeholder="例如: 5.00"
                      value={inputPrice ?? ''}
                      onChange={(e) => setInputPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="output-price">模型输出价格（每百万Token）</Label>
                    <Input
                      id="output-price"
                      type="number"
                      step="0.000001"
                      placeholder="例如: 15.00"
                      value={outputPrice ?? ''}
                      onChange={(e) => setOutputPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit">{editingModel ? '保存' : '添加'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
