export const defaultLocale = 'zh-Hans'
export const locales = ['zh-Hans', 'zh-Hant', 'en', 'ja', 'ko'] as const
export type Locale = (typeof locales)[number]
