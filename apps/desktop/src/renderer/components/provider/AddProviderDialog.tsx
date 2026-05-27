import { useState, useEffect } from 'react'
import { Upload, RefreshCw } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/components/ui/dialog'
import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Label } from '@/renderer/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/renderer/components/ui/select'
import { Textarea } from '@/renderer/components/ui/textarea'
import { Card, CardContent } from '@/renderer/components/ui/card'
import { Badge } from '@/renderer/components/ui/badge'

interface Provider {
  id: string
  name: string
  type: string
  avatar: string
  remark?: string
  officialUrl?: string
  baseUrl?: string
  apiKeys?: string[]
  defaultModel?: string
  models?: any[]
  enabled?: boolean
  apiSettings?: any
}

interface AddProviderDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (provider: Omit<Provider, 'id'>) => void
  editingProvider?: Provider | null
}

const BUILTIN_AVATARS = [
  '🤖',
  '🧠',
  '🦾',
  '⚡',
  '🚀',
  '💎',
  '🌟',
  '🔮',
  '🎯',
  '🎨',
  '🧪',
  '🔬',
  '📊',
  '⚙️',
  '🌐',
  '☁️',
  '🔑',
  '🎭',
  '🎪',
  '📎',
  '🎁',
  '🏭',
  '🔔'
]

const PROVIDER_TYPES = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'openai-response', label: 'OpenAI-Response' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'azure-openai', label: 'Azure OpenAI' },
  { value: 'new-api', label: 'New API' },
  { value: 'ollama', label: 'Ollama' },
  { value: 'custom', label: 'Custom' }
]

export function AddProviderDialog({ isOpen, onClose, onAdd, editingProvider }: AddProviderDialogProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('openai')
  const [avatar, setAvatar] = useState('🤖')
  const [avatarType, setAvatarType] = useState<'builtin' | 'custom'>('builtin')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [remark, setRemark] = useState('')
  const [officialUrl, setOfficialUrl] = useState('')
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (editingProvider) {
        setName(editingProvider.name || '')
        setType(editingProvider.type || 'openai')
        setAvatar(editingProvider.avatar || '🤖')
        setAvatarType((editingProvider.avatar || '').startsWith('http') ? 'custom' : 'builtin')
        setRemark(editingProvider.remark || '')
        setOfficialUrl(editingProvider.officialUrl || '')
        setShowAvatarPicker(false)
      } else {
        setName('')
        setType('openai')
        setAvatar('🤖')
        setAvatarType('builtin')
        setAvatarUrl('')
        setRemark('')
        setOfficialUrl('')
        setShowAvatarPicker(false)
      }
    }
  }, [editingProvider, isOpen])

  const handleResetAvatar = () => {
    setAvatar('🤖')
    setAvatarType('builtin')
    setAvatarUrl('')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过2MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setAvatarUrl(dataUrl)
      setAvatar(dataUrl)
      setAvatarType('custom')
      setShowAvatarPicker(false)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('请输入服务商名称')
      return
    }

    const finalAvatar = avatarType === 'custom' ? avatarUrl : avatar

    if (editingProvider) {
      onAdd({
        ...editingProvider,
        name: name.trim(),
        type,
        avatar: finalAvatar,
        remark: remark || undefined,
        officialUrl: officialUrl || undefined
      })
    } else {
      onAdd({
        name: name.trim(),
        type,
        avatar: finalAvatar,
        remark: remark || undefined,
        officialUrl: officialUrl || undefined
      })
    }

    handleClose()
  }

  const handleClose = () => {
    setShowAvatarPicker(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingProvider ? '编辑服务商' : '添加服务商'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>服务商头像</Label>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-muted text-3xl overflow-hidden">
                  {avatarType === 'custom' && avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span>{avatar}</span>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
                    {avatarType === 'builtin' ? '选择内置头像' : '更换头像'}
                  </Button>

                  {showAvatarPicker && (
                    <Card>
                      <CardContent className="space-y-4 p-4">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">内置头像</Label>
                          <div className="grid grid-cols-8 gap-2">
                            {BUILTIN_AVATARS.map((emoji, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setAvatar(emoji)
                                  setAvatarType('builtin')
                                  setAvatarUrl('')
                                  setShowAvatarPicker(false)
                                }}
                                className={`flex h-11 w-11 items-center justify-center rounded-lg border text-2xl transition-colors hover:bg-accent ${
                                  avatar === emoji ? 'border-primary bg-primary/10' : 'border-border'
                                }`}>
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">上传头像</Label>
                          <Label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary hover:bg-primary/5">
                            <Upload className="h-4 w-4" />
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                            <span>点击上传图片</span>
                          </Label>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleResetAvatar}
                            className="text-xs">
                            <RefreshCw className="mr-1 h-3 w-3" />
                            重置为默认
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAvatarPicker(false)}
                            className="text-xs text-muted-foreground">
                            取消
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-name">服务商名称 *</Label>
              <Input
                id="provider-name"
                placeholder="例如: Azure OpenAI"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={!editingProvider}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-type">服务商类型</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="provider-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROVIDER_TYPES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-remark">服务商备注</Label>
              <Textarea
                id="provider-remark"
                placeholder="输入服务商的备注信息，如价格、特点等..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-url">官方链接</Label>
              <Input
                id="provider-url"
                type="url"
                placeholder="https://example.com"
                value={officialUrl}
                onChange={(e) => setOfficialUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit">{editingProvider ? '保存' : '添加'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
