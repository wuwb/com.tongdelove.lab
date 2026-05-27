import { Send, StopCircle, Paperclip, Globe, Image as ImageIcon } from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from '@/renderer/components/ui/button'
import { Textarea } from '@/renderer/components/ui/textarea'
import { IconButton } from '@/renderer/components/ui/icon-button'
import { cn } from '@/renderer/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  onCancel: () => void
  loading: boolean
}

export function ChatInput({ onSend, onCancel, loading }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!input.trim() || loading) return
    onSend(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        'bg-gray-50 dark:bg-gray-800 rounded-xl p-2 shadow-sm',
        'border border-gray-200 dark:border-gray-700'
      )}
    >
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="在这里输入消息，按 Enter 发送"
        className={cn(
          'min-h-[40px] max-h-[200px] resize-none',
          'border-none bg-transparent focus-visible:ring-0 p-3 text-sm',
          'dark:text-white'
        )}
        autoFocus
      />

      <div className="flex justify-between px-2 pb-1 pt-2">
        <div className="flex gap-1 text-gray-400">
          <IconButton
            aria-label="Add file"
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Paperclip className="h-4.5 w-4.5" />
          </IconButton>
          <IconButton
            aria-label="Web search"
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Globe className="h-4.5 w-4.5" />
          </IconButton>
          <IconButton
            aria-label="Image generation"
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ImageIcon className="h-4.5 w-4.5" />
          </IconButton>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400">
            {loading ? 'Thinking...' : `${input.length} chars`}
          </div>

          <Button
            onClick={loading ? onCancel : handleSend}
            size="sm"
            variant={input.trim() ? 'default' : 'ghost'}
            disabled={!input.trim() && !loading}
            className={cn(
              'rounded-lg',
              loading
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : input.trim()
                  ? 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900'
                  : ''
            )}
          >
            {loading ? <StopCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
