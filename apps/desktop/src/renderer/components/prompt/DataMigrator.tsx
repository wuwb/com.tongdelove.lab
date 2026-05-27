import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/renderer/components/ui/dialog'
import { Button } from '@/renderer/components/ui/button'
import { Alert, AlertDescription } from '@/renderer/components/ui/alert'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface DataMigratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMigrate: () => void
}

const STORAGE_KEYS = ['chat_conversations_v1', 'app_settings_v1', 'prompts_v1']

export function DataMigrator({ open, onOpenChange, onMigrate }: DataMigratorProps) {
  const [status, setStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [foundKeys, setFoundKeys] = useState<string[]>([])

  useEffect(() => {
    if (open && status === 'idle') {
      checkLocalStorage()
    }
  }, [open, status])

  const checkLocalStorage = () => {
    const keys: string[] = []
    STORAGE_KEYS.forEach((key) => {
      if (localStorage.getItem(key)) {
        keys.push(key)
      }
    })
    setFoundKeys(keys)
  }

  const handleMigrate = async () => {
    setStatus('migrating')
    setProgress(0)
    setMessage('开始迁移数据...')

    try {
      const totalKeys = foundKeys.length
      for (let i = 0; i < totalKeys; i++) {
        const key = foundKeys[i]
        setMessage(`正在迁移 ${key}...`)

        await window.database.importLocalStorage(key)

        setProgress(Math.round(((i + 1) / totalKeys) * 100))
      }

      setStatus('success')
      setMessage('数据迁移完成!')
      setTimeout(() => {
        onOpenChange(false)
        onMigrate()
      }, 2000)
    } catch (e) {
      console.error('Migration failed:', e)
      setStatus('error')
      setMessage(`迁移失败: ${e instanceof Error ? e.message : '未知错误'}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>迁移本地数据</DialogTitle>
          <DialogDescription>将现有的 localStorage 数据迁移到 SQLite 数据库</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {status === 'idle' && (
            <>
              {foundKeys.length > 0 ? (
                <>
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>找到 {foundKeys.length} 个数据源需要迁移</AlertDescription>
                  </Alert>
                  <ul className="space-y-1 text-sm">
                    {foundKeys.map((key) => (
                      <li key={key} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        {key}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>未找到可迁移的数据</AlertDescription>
                </Alert>
              )}
            </>
          )}

          {status === 'migrating' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{message}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-right text-muted-foreground text-xs">{progress}%</div>
            </div>
          )}

          {status === 'success' && (
            <Alert variant="default" className="border-green-500">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700 dark:text-green-400">{message}</AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={status === 'migrating'}>
            取消
          </Button>
          {status === 'idle' && foundKeys.length > 0 && <Button onClick={handleMigrate}>开始迁移</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
