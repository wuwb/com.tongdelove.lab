import { useState, useEffect } from 'react'
import type { AppSettings } from '../../shared/ipc'

const DEFAULT_SETTINGS: AppSettings = {
  apiKeys: {},
  models: {
    openai: 'gpt-3.5-turbo',
    anthropic: 'claude-3-5-sonnet-20241022',
    google: 'gemini-1.5-pro',
    ollama: 'qwen3:8b'
  },
  providers: {}
}

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await window.settings.get()
      setSettingsState(data || DEFAULT_SETTINGS)
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (key: keyof AppSettings, value: any) => {
    try {
      await window.settings.set(key, value)
      setSettingsState((prev) => ({ ...prev, [key]: value }))
    } catch (err) {
      console.error('Failed to update settings:', err)
    }
  }

  const setApiKey = (provider: keyof AppSettings['apiKeys'], key: string) => {
    const newApiKeys = { ...settings.apiKeys, [provider]: key }
    updateSettings('apiKeys', newApiKeys)
  }

  const setModel = (provider: keyof AppSettings['models'], model: string) => {
    const newModels = { ...settings.models, [provider]: model }
    updateSettings('models', newModels)
  }

  return { settings, loading, updateSettings, setApiKey, setModel, reload: loadSettings }
}
