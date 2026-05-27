import { MessageSquare, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/renderer/components/ui/button'
import { Card } from '@/renderer/components/ui/card'
import { Badge } from '@/renderer/components/ui/badge'
import { usePrompts } from '../../hooks/usePrompts'
import type { Prompt as PromptType } from '@/shared/ipc'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/renderer/components/ui/dialog'

interface PromptCardProps {
  prompt: PromptType
  onSelect: (prompt: PromptType) => void
}

function PromptCard({ prompt, onSelect }: PromptCardProps) {
  const { deletePrompt } = usePrompts()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = async () => {
    await deletePrompt(prompt.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <Card className="group cursor-pointer p-4 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-1 items-start gap-3" onClick={() => onSelect(prompt)}>
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-2xl"
              style={{ backgroundColor: `${prompt.color}20` }}>
              {prompt.icon || '🤖'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-lg">{prompt.name}</h3>
              {prompt.description && (
                <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">{prompt.description}</p>
              )}
              <div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs">
                <Badge variant="outline" className="text-xs">
                  {prompt.provider}
                </Badge>
                <span className="truncate">{prompt.model}</span>
              </div>
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {prompt.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {prompt.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{prompt.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
              }}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteConfirm(true)
              }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除助手</DialogTitle>
            <DialogDescription>确定要删除助手 "{prompt.name}" 吗？此操作无法撤销。</DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface PromptListProps {
  onSelect: (prompt: PromptType) => void
}

export function PromptList({ onSelect }: PromptListProps) {
  const { prompts, isLoading, createPrompt } = usePrompts()

  const handleCreatePrompt = () => {
    createPrompt({
      name: '新助手',
      description: '新助手',
      provider: 'openai',
      model: 'gpt-3.5-turbo',
      prompt: '你好，我是新助手',
      icon: '🤖',
      color: '#6366f1'
    })
  }

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">加载中...</div>
  }

  if (prompts.length === 0) {
    return (
      <div className="py-12 text-center">
        <MessageSquare className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-20" />
        <h3 className="mb-2 font-semibold text-lg">还没有助手</h3>
        <p className="mb-4 text-muted-foreground" onClick={handleCreatePrompt}>
          创建您的第一个自定义助手来开始聊天
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} onSelect={onSelect} />
      ))}
    </div>
  )
}
