import { useState, useEffect } from 'react'
import { settingsStorage } from '@/utils/storage'
import { AppSettings, DEFAULT_SETTINGS } from '@/types/temu/config'
import { EVENT_CONFIG_UPDATED } from '@/constants/app'

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    settingsStorage
      .getValue()
      .then(setSettings)
      .finally(() => setLoading(false))

    const unwatch = settingsStorage.watch((newValue) => {
      setSettings(newValue || DEFAULT_SETTINGS)
    })

    return () => unwatch()
  }, [])

  const updateSetting = async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)

    await settingsStorage.setValue(newSettings)

    // 广播事件给 Main World (传递整个配置对象，简单粗暴且有效)
    window.dispatchEvent(
      new CustomEvent(EVENT_CONFIG_UPDATED, {
        detail: newSettings,
        composed: true,
        bubbles: true,
      })
    )
  }

  return { settings, updateSetting, loading }
}
