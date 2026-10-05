/**
 * 路由级 locale 列表（纯常量，无副作用）。
 *
 * 单独成文件是为了让 src/proxy.ts（edge runtime）可以安全引入：
 * src/i18n/routing.ts 依赖 require() 动态加载翻译资源，不能在 edge 中使用。
 *
 * 取值与 next-i18next.config.js 的 i18n.locales 完全一致。
 */
export const defaultLocale = 'zh'

export const locales = [
  'en',
  'de',
  'fr',
  'zh',
  'es',
  'ja',
  'pt',
  'ru',
  'ko',
  'tr',
  'it',
  'nl',
  'pl',
  'sv',
  'id',
  'hu',
  'el',
  'cs',
  'ro',
  'vi',
  'th',
  'ms',
  'bg',
  'fi',
  'hi',
  'hr',
  'lt',
  'uk',
  'ar',
  'bn',
  'pt-BR',
  'en-US',
  'es-ES',
  'fr-FR',
  'it-IT',
  'pt-PT',
  'de-DE',
  'tr-TR',
  'pl-PL',
  'ru-RU',
  'id-ID',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'ko-KR',
  'th-TH',
  'vi-VN',
  'bg-BG',
  'cs-CZ',
  'el-GR',
  'fi-FI',
  'hi-IN',
  'hr-HR',
  'hu-HU',
  'lt-LT',
  'nl-NL',
  'ro-RO',
  'sv-SE',
  'uk-UA',
  'ms-MY',
] as const

export type AppLocale = (typeof locales)[number]

const localeSet: Set<string> = new Set<string>(locales)

export const isValidLocale = (value: unknown): value is AppLocale =>
  typeof value === 'string' && localeSet.has(value)
