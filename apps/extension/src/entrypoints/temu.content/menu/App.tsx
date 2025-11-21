// AppRoot.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@tongdelove/ui/dialog'
// import { Button } from '@tongdelove/ui/button'
// import { Label } from '@tongdelove/ui/label'
// import { Input } from '@tongdelove/ui/input'

type AppRootProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AppRoot = ({ open, onOpenChange }: AppRootProps) => {
  const [margin, setMargin] = useState('2')
  const [color, setColor] = useState('#4CAF50')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 背景点击关闭 */}
      <DialogContent
        style={{
          margin: '20px', // 关键：四周留白 20px
          width: 'calc(100vw - 40px)', // 自动计算宽度
          height: 'calc(100vh - 40px)', // 自动计算高度
          maxWidth: 'none', // 禁用 max-width 限制
          maxHeight: 'none',
          padding: '24px',
          borderRadius: '12px', // 可选：更圆润边角
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>插件配置</DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* 配置内容区 */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          content
        </div>  

        {/* 操作按钮 */}
        <div className="flex-shrink-0">
          {/* <Button
            className="w-full"
            onClick={() => {
              console.log('保存配置:', { margin, color })
              onOpenChange(false)
            }}
          >
            保存并关闭
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
