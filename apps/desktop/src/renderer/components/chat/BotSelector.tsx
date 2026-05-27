import { Bot, Sparkles } from 'lucide-react'
import { useState, useMemo } from 'react'
import type { Prompt } from '@/shared/ipc'
import { usePrompts } from '../../hooks/usePrompts'
import { useCategories } from '../../hooks/useCategories'
import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/renderer/components/ui/avatar'
import { Badge } from '@/renderer/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/renderer/components/ui/dialog'
import { cn } from '@/renderer/lib/utils'

interface BotSelectorProps {
  currentPromptId?: string
  onSelect: (prompt: Prompt | null) => void
}

export function BotSelector({ currentPromptId, onSelect }: BotSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { prompts, loading } = usePrompts()
  const { categories } = useCategories()

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      if (!searchQuery) return true

      const queryLower = searchQuery.toLowerCase()
      return (
        prompt.name.toLowerCase().includes(queryLower) ||
        (prompt.description && prompt.description.toLowerCase().includes(queryLower)) ||
        (prompt.systemPrompt && prompt.systemPrompt.toLowerCase().includes(queryLower))
      )
    })
  }, [prompts, searchQuery])

  const groupedPrompts = useMemo(() => {
    const groups: Record<string, Prompt[]> = {}

    filteredPrompts.forEach((prompt) => {
      const categoryId = prompt.categoryId || 'uncategorized'
      if (!groups[categoryId]) {
        groups[categoryId] = []
      }
      groups[categoryId].push(prompt)
    })

    return groups
  }, [filteredPrompts])

  const handleSelectPrompt = (prompt: Prompt | null) => {
    onSelect(prompt)
    setIsOpen(false)
    setSearchQuery('')
  }

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'uncategorized') return '未分类'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.name || '未知分类'
  }

  const getCategoryColor = (categoryId: string) => {
    if (categoryId === 'uncategorized') return 'gray'
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.color || 'gray'
  }

  const currentPrompt = prompts.find((p) => p.id === currentPromptId)

  return (
    <>
      <Button
        size="sm"
        variant={currentPrompt ? 'default' : 'outline'}
        onClick={() => setIsOpen(true)}
        disabled={loading}
        className={cn(
          currentPrompt && 'bg-blue-600 hover:bg-blue-700 text-white'
        )}
      >
        {currentPrompt ? (
          <Bot className="h-3.5 w-3.5 mr-2" />
        ) : (
          <Sparkles className="h-3.5 w-3.5 mr-2" />
        )}
        {currentPrompt ? currentPrompt.name : '选择Bot'}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>选择Bot提示词</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 flex-1 overflow-hidden">
            <Input
              placeholder="搜索Bot（名称、描述、提示词...）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800"
            />

            <div
              className={cn(
                'p-3 border rounded-md cursor-pointer',
                'bg-white dark:bg-gray-900',
                'border-gray-200 dark:border-gray-700',
                !currentPromptId && 'bg-blue-50 dark:bg-blue-900/20',
                'hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
              onClick={() => handleSelectPrompt(null)}
            >
              <div className="flex gap-3 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <span className="font-medium">默认助手</span>
                  <span className="text-sm text-gray-500">使用基础模型，无特殊提示词</span>
                </div>
                {!currentPromptId && (
                  <Badge variant="blue" className="ml-auto">
                    当前
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
              {Object.entries(groupedPrompts).map(([categoryId, categoryPrompts]) => (
                <div key={categoryId}>
                  <div className="flex gap-2 items-center mb-3">
                    <Badge variant={getCategoryColor(categoryId) as any}>
                      {getCategoryName(categoryId)}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {categoryPrompts.length} 个Bot
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {categoryPrompts.map((prompt) => (
                      <div
                        key={prompt.id}
                        className={cn(
                          'p-3 border rounded-md cursor-pointer',
                          'bg-white dark:bg-gray-900',
                          'border-gray-200 dark:border-gray-700',
                          currentPromptId === prompt.id && 'bg-blue-50 dark:bg-blue-900/20',
                          'hover:bg-gray-50 dark:hover:bg-gray-800'
                        )}
                        onClick={() => handleSelectPrompt(prompt)}
                      >
                        <div className="flex gap-3 items-start">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={prompt.avatar} />
                            <AvatarFallback>
                              {prompt.icon || <Bot className="h-4 w-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-0 flex-1 min-w-0">
                            <span className="font-medium">{prompt.name}</span>
                            {prompt.description && (
                              <span className="text-sm text-gray-500 truncate">
                                {prompt.description}
                              </span>
                            )}
                            {prompt.systemPrompt && (
                              <span className="text-xs text-gray-400 truncate">
                                提示词: {prompt.systemPrompt.slice(0, 60)}...
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {prompt.defaultModel && (
                              <Badge variant="green">
                                {prompt.defaultModel}
                              </Badge>
                            )}
                            {currentPromptId === prompt.id && (
                              <Badge variant="blue">
                                当前
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredPrompts.length === 0 && (
                <div className="flex justify-center py-8">
                  <span className="text-sm text-gray-400 text-center">
                    {searchQuery ? '未找到匹配的Bot' : '暂无可用的Bot提示词'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
