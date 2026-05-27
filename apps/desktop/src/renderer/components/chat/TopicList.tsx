import { Plus, ListFilter, Trash2, AlertTriangle, Pin } from 'lucide-react'
import { useState } from 'react'
import type { Conversation } from '../../types/chat'
import { Button } from '@/renderer/components/ui/button'
import { IconButton } from '@/renderer/components/ui/icon-button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/renderer/components/ui/dialog'
import { cn } from '@/renderer/lib/utils'

interface TopicListProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onCreateConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function TopicList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation
}: TopicListProps) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  const formatDate = (ts: number) => {
    const d = new Date(ts)
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  const handleDeleteClick = (conversationId: string) => {
    setDeleteTargetId(conversationId)
  }

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      onDeleteConversation(deleteTargetId)
      setDeleteTargetId(null)
    }
  }

  const handleCancelDelete = () => {
    setDeleteTargetId(null)
  }

  return (
    <div
      className={cn(
        'w-[280px] h-full bg-white dark:bg-gray-900 border-l',
        'border-gray-200 dark:border-gray-700',
        'flex flex-col'
      )}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateConversation}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-0 h-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>新建话题</span>
          </Button>
          <IconButton
            aria-label="Filter"
            variant="ghost"
            size="sm"
            className="text-gray-400 h-8 w-8"
          >
            <ListFilter className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-3 pb-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={cn(
              'p-3 cursor-pointer rounded-md group relative',
              activeConversationId === conversation.id
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={cn(
                'text-sm font-medium truncate w-[90%]',
                'text-gray-900 dark:text-gray-100'
              )}>
                {conversation.title || '默认话题'}
              </span>
              <div className="hidden group-hover:flex items-center gap-1">
                <IconButton
                  size="xs"
                  variant="ghost"
                  aria-label="Delete topic"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(conversation.id)
                  }}
                  className="h-5 w-5 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </div>
            <span className="text-xs text-gray-400">
              {formatDate(conversation.updatedAt || Date.now())}
            </span>
          </div>
        ))}

        {conversations.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-8 mx-4">
            <span className="text-xl text-gray-400 mb-2">没有话题</span>
            <span className="text-sm text-gray-300">点击上方按钮创建新话题</span>
          </div>
        )}
      </div>

      <Dialog open={deleteTargetId !== null} onOpenChange={(open) => !open && handleCancelDelete()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>确认删除话题</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 items-center py-6">
            <div className="p-4 rounded-full bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold mb-2">确定要删除这个话题吗？</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                此操作无法撤销，话题中的所有消息将被永久删除。
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleCancelDelete}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              删除话题
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function MockItem({ title, date, pinned }: { title: string; date: string; pinned?: boolean }) {
  return (
    <div className="p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <div className="flex justify-between items-start mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </span>
        {pinned && (
          <Pin className="h-3 w-3 text-gray-400" style={{ transform: 'rotate(45deg)' }} />
        )}
      </div>
      <span className="text-xs text-gray-400">
        {date}
      </span>
    </div>
  )
}
