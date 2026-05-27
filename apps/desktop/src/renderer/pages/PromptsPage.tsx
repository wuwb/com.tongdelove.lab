import { useState, useMemo } from 'react'
import { Search, Settings2, Trash2, Plus, Bot, ChevronDown } from 'lucide-react'
import { usePrompts } from '../hooks/usePrompts'
import { useCategories } from '../hooks/useCategories'
import { PromptEditor } from '../components/prompt/PromptEditor'
import type { Prompt, InsertPrompt, InsertPromptCategory } from '@/shared/ipc'
import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Badge } from '@/renderer/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/renderer/components/ui/avatar'
import { IconButton } from '@/renderer/components/ui/icon-button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter
} from '@/renderer/components/ui/alert-dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/renderer/components/ui/select'
import { cn } from '@/renderer/lib/utils'

export function PromptsPage() {
  const { prompts, loading, createPrompt, updatePrompt, deletePrompt, movePromptToCategory } = usePrompts()

  const { categories, createCategory, deleteCategory } = useCategories()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [movingPrompt, setMovingPrompt] = useState<Prompt | null>(null)
  const [showMoveDialog, setShowMoveDialog] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('blue')
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null)

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'uncategorized') {
          if (prompt.categoryId) return false
        } else if (prompt.categoryId !== selectedCategory) {
          return false
        }
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          prompt.name.toLowerCase().includes(query) ||
          (prompt.description && prompt.description.toLowerCase().includes(query)) ||
          (prompt.systemPrompt && prompt.systemPrompt.toLowerCase().includes(query))
        )
      }
      return true
    })
  }, [prompts, searchQuery, selectedCategory])

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

  const handleAddPrompt = () => {
    setEditingPrompt(null)
    setIsEditorOpen(true)
  }

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setIsEditorOpen(true)
  }

  const handleDeletePrompt = (prompt: Prompt) => {
    setDeletingPrompt(prompt)
  }

  const confirmDelete = async () => {
    if (deletingPrompt) {
      await deletePrompt(deletingPrompt.id)
      setDeletingPrompt(null)
    }
  }

  const handleMovePrompt = (prompt: Prompt) => {
    setMovingPrompt(prompt)
    setShowMoveDialog(true)
  }

  const handleSaveMove = async (categoryId: string) => {
    if (movingPrompt) {
      await movePromptToCategory(movingPrompt.id, categoryId)
      setShowMoveDialog(false)
      setMovingPrompt(null)
    }
  }

  const handleCreateCategory = async () => {
    if (newCategoryName.trim()) {
      const category: InsertPromptCategory = {
        name: newCategoryName.trim(),
        color: newCategoryColor
      }
      await createCategory(category)
      setShowCategoryDialog(false)
      setNewCategoryName('')
      setNewCategoryColor('blue')
    }
  }

  const handleSaveEditor = async (promptData: InsertPrompt) => {
    if (editingPrompt) {
      await updatePrompt(editingPrompt.id, promptData)
    } else {
      await createPrompt(promptData)
    }
    setIsEditorOpen(false)
    setEditingPrompt(null)
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">提示词管理</h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">管理所有提示词和分类</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCategoryDialog(true)}>
            <Settings2 className="h-3.5 w-3.5" />
            管理分类
          </Button>
          <Button onClick={handleAddPrompt}>
            <Plus className="h-3.5 w-3.5" />
            新建提示词
          </Button>
        </div>
      </div>

      <div className="flex w-full gap-2">
        <div className="relative flex-1">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="搜索提示词（名称、描述、提示词...）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="全部分类" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部分类</SelectItem>
            <SelectItem value="uncategorized">未分类</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-8 text-gray-500">加载中...</div>
        ) : filteredPrompts.length === 0 ? (
          <div className="flex justify-center py-8 text-gray-400">
            {searchQuery ? '未找到匹配的提示词' : '暂无提示词，请创建一个新的提示词'}
          </div>
        ) : (
          filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className={cn(
                'w-full rounded-md border p-3',
                'transition-shadow hover:shadow-md',
                'bg-white dark:bg-gray-800',
                'border-gray-200 dark:border-gray-700'
              )}>
              <div className="flex items-start justify-between">
                <div className="flex min-w-0 flex-1 gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={prompt.avatar} />
                    <AvatarFallback>{prompt.icon || <Bot className="h-4 w-4" />}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{prompt.name}</span>
                      {prompt.categoryId && (
                        <Badge variant={getCategoryColor(prompt.categoryId) as any}>
                          {getCategoryName(prompt.categoryId)}
                        </Badge>
                      )}
                      {!prompt.categoryId && <Badge variant="gray">未分类</Badge>}
                      {prompt.defaultModel && <Badge variant="green">{prompt.defaultModel}</Badge>}
                    </div>
                    {prompt.description && (
                      <p className="truncate text-gray-500 text-sm dark:text-gray-400">{prompt.description}</p>
                    )}
                    {prompt.systemPrompt && (
                      <p className="truncate text-gray-400 text-xs dark:text-gray-500">
                        提示词: {prompt.systemPrompt.slice(0, 80)}...
                      </p>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex gap-1">
                  <IconButton
                    size="xs"
                    aria-label="编辑提示词"
                    variant="ghost"
                    onClick={() => handleEditPrompt(prompt)}>
                    编辑
                  </IconButton>
                  <IconButton size="xs" aria-label="移动分类" variant="ghost" onClick={() => handleMovePrompt(prompt)}>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton
                    size="xs"
                    aria-label="删除提示词"
                    variant="ghost"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                    onClick={() => handleDeletePrompt(prompt)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isEditorOpen && (
        <PromptEditor
          prompt={editingPrompt}
          open={isEditorOpen}
          onOpenChange={setIsEditorOpen}
          onSave={handleSaveEditor}
          categories={categories}
          onCancel={() => {
            setIsEditorOpen(false)
            setEditingPrompt(null)
          }}
        />
      )}

      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>移动提示词</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <p>将 "{movingPrompt?.name}" 移动到：</p>
            <div className="flex w-full flex-col gap-2">
              <Button variant={!movingPrompt?.categoryId ? 'default' : 'outline'} onClick={() => handleSaveMove('')}>
                未分类
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={movingPrompt?.categoryId === category.id ? 'default' : 'outline'}
                  onClick={() => handleSaveMove(category.id)}>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>管理分类</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-2">
              <Input
                placeholder="新分类名称"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button onClick={handleCreateCategory}>添加</Button>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full justify-between px-2 py-2">
                <span className="font-medium">未分类</span>
                <Badge variant="outline">{prompts.filter((p) => !p.categoryId).length} 个提示词</Badge>
              </div>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex w-full items-center justify-between rounded-md border border-gray-200 px-2 py-2 dark:border-gray-700">
                  <Badge variant={category.color as any}>{category.name}</Badge>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {prompts.filter((p) => p.categoryId === category.id).length} 个提示词
                    </Badge>
                    <IconButton
                      size="xs"
                      aria-label="删除分类"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => deleteCategory(category.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </IconButton>
                  </div>
                </div>
              ))}
              {categories.length === 0 && <div className="flex justify-center py-4 text-gray-400">暂无自定义分类</div>}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingPrompt} onOpenChange={(open) => !open && setDeletingPrompt(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="flex flex-col gap-3">
                <p>确定要删除提示词 "{deletingPrompt?.name}" 吗？</p>
                <p className="text-gray-500 text-sm">此操作不可撤销。</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeletingPrompt(null)}>
              取消
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              删除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
