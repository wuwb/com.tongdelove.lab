import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@tongdelove/ui/lib/utils'
import { Button } from '@tongdelove/ui/components/button'
import { Checkbox } from '@tongdelove/ui/components/checkbox'
import { Label } from '@tongdelove/ui/components/label'
import { storage } from '#imports';

interface AppRootProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// 定义存储 Key 和 事件名常量
export const STORAGE_KEY_HIDE_ALERT = 'local:config_hide_shipping_alert';
export const EVENT_CONFIG_UPDATED = 'tongde:config-updated';

export const AppRoot = ({ open, onOpenChange }: AppRootProps) => {
  // 1. 定义状态
  const [hideAlert, setHideAlert] = useState(false);

  // 2. 初始化：从存储中读取设置
  useEffect(() => {
    const loadSettings = async () => {
      const storedValue = await storage.getItem<boolean>(STORAGE_KEY_HIDE_ALERT);
      // 默认为 false
      setHideAlert(!!storedValue);
    };
    loadSettings();
  }, []);

  // 3. 处理变更：保存并通知 Main World
  const handleCheckboxChange = async (checked: boolean) => {
    setHideAlert(checked);
    
    // A. 保存到 Storage (持久化)
    await storage.setItem(STORAGE_KEY_HIDE_ALERT, checked);

    // B. 发送事件给 Main World (实时生效)
    window.dispatchEvent(new CustomEvent(EVENT_CONFIG_UPDATED, {
      detail: { hideReadyToShip: checked },
      composed: true,
      bubbles: true
    }));
  };

  // ... useEffect 处理 body overflow 锁定 (保持不变) ...
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [open])

  return (
    <div style={{ display: open ? 'flex' : 'none' }} className={cn("fixed inset-0 z-[99999] items-center justify-center bg-black/20", open ? "animate-in fade-in-0" : "")}>
      <div className="absolute inset-0" onClick={() => onOpenChange(false)} />

      <div className={cn("relative bg-white p-6 shadow-lg w-full border sm:rounded-lg flex flex-col")} style={{ margin: '20px', width: 'calc(100vw - 40px)', height: 'calc(100vh - 40px)', maxWidth: 'none', maxHeight: 'none' }} onClick={(e) => e.stopPropagation()}>
        
        {/* 关闭按钮 */}
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex flex-col space-y-1.5 text-center sm:text-left flex-shrink-0 mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">插件配置</h2>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          
          {/* ✅ 新增：设置项区域 */}
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <Checkbox 
                id="hide-alert" 
                checked={hideAlert}
                onCheckedChange={handleCheckboxChange}
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="hide-alert"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  隐藏待装箱发货提醒
                </Label>
                <p className="text-sm text-muted-foreground">
                  开启后，页面上将不再弹出红色的发货提醒框。
                </p>
              </div>
            </div>
            
            <ComplexHeavyComponent />
          </div>

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
