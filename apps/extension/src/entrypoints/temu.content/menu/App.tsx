import { useState, useEffect } from 'react'
import { X } from 'lucide-react' // 或者使用 react-icons/tb 里的关闭图标
import { cn } from '@tongdelove/ui/lib/utils' // 确保你能用 cn 合并类名
import { Button } from '@tongdelove/ui/components/button'

interface AppRootProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AppRoot = ({ open, onOpenChange }: AppRootProps) => {
  useEffect(() => {
    if (open) {
      // 记录之前的 overflow 样式
      const originalStyle = window.getComputedStyle(document.body).overflow
      // 锁定滚动
      document.body.style.overflow = 'hidden'
      
      // 清理函数：恢复滚动
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [open])
  
  return (
    <div
      // ✅ 关键 1：使用 CSS 控制显隐，而不是条件渲染
      // 当 open 为 false 时，display: none，但 DOM 依然存在
      style={{ display: open ? 'flex' : 'none' }}
      // ✅ 关键 2：模拟 DialogOverlay 的样式 (全屏、遮罩、高 z-index)
      className={cn(
        "fixed inset-0 z-[99999] items-center justify-center bg-black/20",
        // 如果想加动画，需要配合 animation 库，但 display:none 很难做离场动画，
        // 为了性能建议直接切换
        open ? "animate-in fade-in-0" : ""
      )}
    >
      {/* 遮罩层点击关闭 */}
      <div 
        className="absolute inset-0" 
        onClick={() => onOpenChange(false)} 
      />

      {/* ✅ 关键 3：模拟 DialogContent 的样式 */}
      <div
        className={cn(
          "relative bg-background p-6 shadow-lg w-full border sm:rounded-lg",
          // 这里复用你之前的自定义样式
          "flex flex-col"
        )}
        style={{
          // 你的自定义尺寸配置
          margin: '20px',
          width: 'calc(100vw - 40px)',
          height: 'calc(100vh - 40px)',
          maxWidth: 'none',
          maxHeight: 'none',
        }}
        // 阻止点击内容区域冒泡关闭弹窗
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 (手动实现 DialogClose) */}
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 p-0"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* 标题头 */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left flex-shrink-0 mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            插件配置
          </h2>
        </div>

        {/* ⬇️ 这里是你的复杂内容，它永远不会被卸载 ⬇️ */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
           <ComplexHeavyComponent />
        </div>
      </div>
    </div>
  )
}

// 模拟一个很重的组件，测试是否重新渲染
const ComplexHeavyComponent = () => {
  useEffect(() => {
    console.log('🔴 复杂组件挂载了 (Mounted)')
    return () => console.log('⚪️ 复杂组件卸载了 (Unmounted)')
  }, [])

  return <div>我是非常复杂的内容，包含 iframe 或 Canvas...</div>
}
