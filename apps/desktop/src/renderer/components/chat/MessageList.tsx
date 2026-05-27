import { User, Sparkles } from 'lucide-react'
import type { ChatMessage } from '@/shared/ipc'
import { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/renderer/components/ui/avatar'
import { cn } from '@/renderer/lib/utils'

interface MessageListProps {
  messages: ChatMessage[]
  streamingMessage?: string
}

export function MessageList({ messages, streamingMessage }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingMessage])

  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto p-6 flex flex-col gap-6 items-stretch pb-10',
        'scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700'
      )}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn(
            'flex gap-4',
            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback
              className={cn(
                'h-8 w-8 flex items-center justify-center',
                msg.role === 'user'
                  ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  : 'bg-transparent text-orange-400'
              )}
            >
              {msg.role === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4.5 w-4.5" />
              )}
            </AvatarFallback>
          </Avatar>

          <div
            className={cn(
              'max-w-[85%] leading-relaxed text-base',
              msg.role === 'user'
                ? 'bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl'
                : 'text-gray-800 dark:text-gray-100'
            )}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
      ))}

      {streamingMessage && (
        <div className="flex flex-row gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="h-8 w-8 flex items-center justify-center bg-transparent text-orange-400">
              <Sparkles className="h-4.5 w-4.5" />
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[85%] leading-relaxed text-base text-gray-800 dark:text-gray-100">
            <p className="whitespace-pre-wrap">{streamingMessage}</p>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
