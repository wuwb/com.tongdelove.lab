import { storage } from '#imports'
import { AppSettings, DEFAULT_SETTINGS } from '@/types/temu/config'

export const sessionStartTime = storage.defineItem<number>('session:start-time')

// 定义一个单一的存储项来保存整个对象
export const settingsStorage = storage.defineItem<AppSettings>('local:app_settings', {
  defaultValue: DEFAULT_SETTINGS,
  version: 1, // 如果以后结构大改，可以用来做迁移
})
