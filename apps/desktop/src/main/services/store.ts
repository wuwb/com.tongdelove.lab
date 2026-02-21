import { app, safeStorage } from 'electron'
import { join } from 'node:path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'

const STORE_PATH = join(app.getPath('userData'), 'store.json')

export type AppSettings = {
  apiKeys: {
    openai?: string
    anthropic?: string
    google?: string
    ollama?: string
  }
  models: {
    openai?: string
    anthropic?: string
    google?: string
    ollama?: string
  }
  providers: {
    [key: string]: any
  }
}

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

class Store {
  private data: AppSettings
  private isEncryptionAvailable: boolean

  constructor() {
    this.isEncryptionAvailable = safeStorage.isEncryptionAvailable()
    this.data = this.load()
  }

  private encrypt(value: string): string {
    if (!this.isEncryptionAvailable) return value
    return safeStorage.encryptString(value).toString('base64')
  }

  private decrypt(encryptedValue: string): string {
    if (!this.isEncryptionAvailable) return encryptedValue
    try {
      return safeStorage.decryptString(Buffer.from(encryptedValue, 'base64'))
    } catch (e) {
      console.error('Failed to decrypt API key:', e)
      return encryptedValue
    }
  }

  private load(): AppSettings {
    try {
      if (!existsSync(STORE_PATH)) {
        this.save(DEFAULT_SETTINGS)
        return DEFAULT_SETTINGS
      }
      const raw = readFileSync(STORE_PATH, 'utf-8')
      const loaded = JSON.parse(raw)

      const settings = { ...DEFAULT_SETTINGS, ...loaded }

      if (this.isEncryptionAvailable && loaded.apiKeys) {
        const apiKeys: AppSettings['apiKeys'] = {}
        Object.entries(loaded.apiKeys).forEach(([key, value]) => {
          if (value) {
            apiKeys[key as keyof AppSettings['apiKeys']] = this.decrypt(value as string)
          }
        })
        settings.apiKeys = apiKeys
      }

      return settings
    } catch (e) {
      console.error('Failed to load store:', e)
      return DEFAULT_SETTINGS
    }
  }

  private save(data: AppSettings) {
    try {
      if (!existsSync(app.getPath('userData'))) {
        mkdirSync(app.getPath('userData'), { recursive: true })
      }

      const dataToSave = { ...data }

      if (this.isEncryptionAvailable && data.apiKeys) {
        const encryptedApiKeys: Record<string, string> = {}
        Object.entries(data.apiKeys).forEach(([key, value]) => {
          if (value) {
            encryptedApiKeys[key] = this.encrypt(value)
          }
        })
        dataToSave.apiKeys = encryptedApiKeys as any
      }

      writeFileSync(STORE_PATH, JSON.stringify(dataToSave, null, 2))
    } catch (e) {
      console.error('Failed to save store:', e)
    }
  }

  get<K extends keyof AppSettings>(key: K): AppSettings[K] {
    return this.data[key]
  }

  set<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    this.data[key] = value
    this.save(this.data)
  }

  getAll(): AppSettings {
    return this.data
  }
}

export const store = new Store()
