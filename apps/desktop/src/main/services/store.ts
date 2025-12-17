import { app } from 'electron'
import { join } from 'node:path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'

const STORE_PATH = join(app.getPath('userData'), 'store.json')

export type AppSettings = {
  apiKeys: {
    openai?: string
    ollama?: string
  }
  models: {
    openai?: string
    ollama?: string
  }
}

const DEFAULT_SETTINGS: AppSettings = {
  apiKeys: {},
  models: {
    openai: 'gpt-3.5-turbo',
    ollama: 'llama2'
  }
}

class Store {
  private data: AppSettings

  constructor() {
    this.data = this.load()
  }

  private load(): AppSettings {
    try {
      if (!existsSync(STORE_PATH)) {
        this.save(DEFAULT_SETTINGS)
        return DEFAULT_SETTINGS
      }
      const raw = readFileSync(STORE_PATH, 'utf-8')
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
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
      writeFileSync(STORE_PATH, JSON.stringify(data, null, 2))
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
