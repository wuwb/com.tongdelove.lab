import { Plus, Bot, Briefcase, Code, Stethoscope, Search, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/renderer/components/ui/input'
import { IconButton } from '@/renderer/components/ui/icon-button'
import { cn } from '@/renderer/lib/utils'

interface Prompt {
  id: string
  name: string
  icon: any
  color: string
}

const MOCK_ASSISTANTS: Prompt[] = [
  { id: 'default', name: '默认助手', icon: Bot, color: 'text-orange-400' },
  { id: 'merchant', name: '商家运营 - Merchant Operations', icon: Briefcase, color: 'text-pink-400' },
  { id: 'pm', name: '产品经理 - Product Manager', icon: Briefcase, color: 'text-yellow-400' },
  { id: 'analyst', name: '商业数据分析 - Business Data...', icon: Briefcase, color: 'text-purple-400' },
  { id: 'dev', name: '开发工程师 - Software Engineer', icon: Code, color: 'text-gray-600' },
  { id: 'frontend', name: '前端工程师 - Frontend Engineer', icon: Code, color: 'text-gray-500' },
  { id: 'doctor', name: '医生 - Doctor', icon: Stethoscope, color: 'text-teal-400' }
]

export function PromptList() {
  const [selectedId, setSelectedId] = useState('default')

  return (
    <div className="w-72 h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-4 border-b-0">
        <button
          className="flex items-center justify-start w-full text-gray-500 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all mb-2"
        >
          <Plus className="h-4 w-4" />
          <span className="ml-2">添加助手</span>
        </button>
        <div className="relative">
          <Input
            placeholder="搜索助手"
            className="bg-gray-100 dark:bg-gray-800 border-none pl-9 h-9 text-sm"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-0 px-2 pb-2">
        {MOCK_ASSISTANTS.map((prompt) => (
          <div
            key={prompt.id}
            className={cn(
              'p-2 rounded-md cursor-pointer flex gap-3 items-center',
              'hover:bg-gray-50 dark:hover:bg-gray-800',
              selectedId === prompt.id
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'bg-transparent'
            )}
            onClick={() => setSelectedId(prompt.id)}
          >
            <div
              className={cn(
                'p-2 rounded-full flex items-center justify-center',
                prompt.id === 'default'
                  ? 'bg-orange-100 dark:bg-orange-900/30'
                  : 'bg-gray-100 dark:bg-gray-800',
                prompt.color
              )}
            >
              <prompt.icon className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <span
                className={cn(
                  'text-sm truncate block',
                  selectedId === prompt.id ? 'font-medium' : 'font-normal'
                )}
              >
                {prompt.name}
              </span>
            </div>
            {selectedId === prompt.id && (
              <IconButton
                aria-label="More"
                variant="ghost"
                size="sm"
              >
                <MoreVertical className="h-3.5 w-3.5 text-gray-400" />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
