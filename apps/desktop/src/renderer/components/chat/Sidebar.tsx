import { Plus, Trash2, MessageSquare } from 'lucide-react'
import type { Conversation } from '../../types/chat'
import { Button } from '@/renderer/components/ui/button'
import { IconButton } from '@/renderer/components/ui/icon-button'
import { cn } from '@/renderer/lib/utils'

interface SidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onCreateConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
  onDeleteConversation
}: SidebarProps) {
  return (
    <div className="w-[250px] h-full bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Button onClick={onCreateConversation} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-0">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              'p-3 cursor-pointer flex justify-between items-center',
              'hover:bg-gray-200 dark:hover:bg-gray-700',
              activeConversationId === conversation.id
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-transparent'
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-center overflow-hidden gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm truncate">
                {conversation.title || 'New Chat'}
              </span>
            </div>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteConversation(conversation.id)
              }}
              aria-label="Delete conversation"
            >
              <Trash2 className="h-3.5 w-3.5 text-red-500" />
            </IconButton>
          </div>
        ))}
        {conversations.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <span className="text-sm">No chats yet</span>
          </div>
        )}
      </div>
    </div>
  )
}
