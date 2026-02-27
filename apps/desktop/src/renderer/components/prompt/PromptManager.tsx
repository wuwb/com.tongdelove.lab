import { useState } from 'react'
import { Plus, Settings } from 'lucide-react'
import { Button } from '@tongdelove/ui/components/button'
import { PromptList } from './PromptList'
import { CreatePromptDialog } from './CreatePromptDialog'
import { DataMigrator } from './DataMigrator'
import type { Prompt } from '../../../shared/ipc'

export function PromptManager({ onSelect }: { onSelect: (prompt: Prompt) => void }) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showMigrator, setShowMigrator] = useState(false)

  const handleMigrateComplete = () => {
    window.location.reload()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">我的助手</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowMigrator(true)}>
            <Settings className="h-4 w-4 mr-2" />
            迁移数据
          </Button>
          <Button size="sm" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建助手
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <PromptList onSelect={onSelect} />
      </div>

      <CreatePromptDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />

      <DataMigrator
        open={showMigrator}
        onOpenChange={setShowMigrator}
        onMigrate={handleMigrateComplete}
      />
    </div>
  )
}
