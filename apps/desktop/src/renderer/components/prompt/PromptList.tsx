import { MessageSquare, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@tongdelove/ui/components/button'
import { Card } from '@tongdelove/ui/components/card'
import { Badge } from '@tongdelove/ui/components/badge'
import { usePrompts } from '../../hooks/usePrompts'
import type { Prompt as PromptType } from '../../../shared/ipc'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@tongdelove/ui/components/dialog'

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
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1" onClick={() => onSelect(prompt)}>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: `${prompt.color}20` }}
            >
              {prompt.icon || '🤖'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{prompt.name}</h3>
              {prompt.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {prompt.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {prompt.provider}
                </Badge>
                <span className="truncate">{prompt.model}</span>
              </div>
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
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
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteConfirm(true)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除助手</DialogTitle>
            <DialogDescription>
              确定要删除助手 "{prompt.name}" 吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
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
  const { prompts, isLoading } = usePrompts()

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">加载中...</div>
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
        <h3 className="font-semibold text-lg mb-2">还没有助手</h3>
        <p className="text-muted-foreground mb-4">创建您的第一个自定义助手来开始聊天</p>
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
