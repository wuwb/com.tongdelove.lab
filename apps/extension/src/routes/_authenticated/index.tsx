import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react'
import { Checkbox } from '@tongdelove/ui/components/checkbox'
import { Label } from '@tongdelove/ui/components/label'
import { Button } from '@tongdelove/ui/components/button'
import { storage } from 'wxt/utils/storage'
import { CONFIG_UI_SCHEMA, DEFAULT_SETTINGS, AppSettings, ConfigItemSchema } from '@/types/temu/config'
import { cn } from '@tongdelove/ui/lib/utils'

const STORAGE_KEY_SETTINGS = 'local:app_settings'

const CATEGORY_NAMES: Record<string, string> = {
  shipping: '📦 发货配置',
  order: '📄 订单配置',
  ui: '🎨 界面显示',
}

export const Route = createFileRoute('/_authenticated/')({
  component: ConfigPage,
})

function ConfigPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const stored = await storage.getItem<AppSettings>(STORAGE_KEY_SETTINGS)
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...stored })
      }
    } catch (e) {
      console.error('Failed to load settings', e)
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = async (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)

    // A. 保存到 Storage
    await storage.setItem(STORAGE_KEY_SETTINGS, newSettings)

    // B. 发送通用事件
    window.dispatchEvent(
      new CustomEvent('EVENT_APP_SETTINGS_UPDATED', {
        detail: newSettings,
        composed: true,
        bubbles: true,
      })
    )

    // C. 兼容旧的 specific event (如果不兼容可能导致旧逻辑失效)
    // 之前只有 shipping_hideAlert -> hideReadyToShip
    if (key === 'shipping_hideAlert') {
      window.dispatchEvent(
        new CustomEvent('EVENT_CONFIG_UPDATED', {
          detail: { hideReadyToShip: value },
          composed: true,
          bubbles: true,
        })
      )
    }
  }

  const groupedConfig = useMemo(() => {
    const groups: Record<string, ConfigItemSchema[]> = {}
    CONFIG_UI_SCHEMA.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [])

  const resetToDefaults = async () => {
    if (confirm('确定要重置所有设置吗？')) {
      setSettings(DEFAULT_SETTINGS)
      await storage.setItem(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS)
      window.dispatchEvent(
        new CustomEvent('EVENT_APP_SETTINGS_UPDATED', {
          detail: DEFAULT_SETTINGS,
        })
      )
    }
  }

  if (loading) return <div className="p-8">加载配置中...</div>

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">插件配置</h1>
            <p className="text-muted-foreground">管理扩展的功能开关和界面偏好设置。</p>
          </div>
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            重置默认
          </Button>
        </div>

        <div className="grid gap-6">
          {Object.entries(groupedConfig).map(([category, items]) => (
            <div key={category} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight text-lg">
                  {CATEGORY_NAMES[category] || category.toUpperCase()}
                </h3>
              </div>
              <div className="p-6 pt-0 grid gap-6">
                {items.map((item) => (
                  <ConfigItemRenderer
                    key={item.key}
                    item={item}
                    value={settings[item.key]}
                    onChange={(val) => handleSettingChange(item.key, val)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConfigItemRenderer({
  item,
  value,
  onChange,
}: {
  item: ConfigItemSchema
  value: any
  onChange: (val: any) => void
}) {
  if (item.type === 'switch') {
    return (
      <div className="flex items-start space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors">
        <Checkbox id={item.key} checked={!!value} onCheckedChange={(checked) => onChange(checked)} className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor={item.key}
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {item.label}
          </Label>
          {item.description && <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>}
        </div>
      </div>
    )
  }

  if (item.type === 'select') {
    return (
      <div className="grid gap-2">
        <Label htmlFor={item.key} className="text-base font-medium">
          {item.label}
        </Label>
        <select
          id={item.key}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {item.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
      </div>
    )
  }

  if (item.type === 'color') {
    return (
      <div className="flex items-center justify-between rounded-md border p-4">
        <div className="grid gap-1.5">
          <Label htmlFor={item.key} className="text-base font-medium">
            {item.label}
          </Label>
          {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">{value}</span>
          <input
            id={item.key}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-16 cursor-pointer rounded-md border border-input bg-background p-1"
          />
        </div>
      </div>
    )
  }

  // Fallback for text input
  return (
    <div className="grid gap-2">
      <Label htmlFor={item.key} className="text-base font-medium">
        {item.label}
      </Label>
      <input
        type="text"
        id={item.key}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
    </div>
  )
}
