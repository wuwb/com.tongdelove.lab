import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { crc32 } from 'crc'
import { defaultLocale, getTranslation, isValidLocale } from './routing'

/**
 * App Router 下的服务端 i18next 实例。
 *
 * 复用 next-i18next.config.js 的 hashTransKey 策略，
 * 保证既有 public/locales 下 translation.json 无需改动即可命中。
 */
function createInstanceWithResources(locale: string) {
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale

  const instance = createInstance()

  instance.use(initReactI18next).init({
    lng: safeLocale,
    fallbackLng: defaultLocale,
    defaultNS: 'translation',
    ns: ['translation'],
    resources: {
      [safeLocale]: { translation: getTranslation(safeLocale) },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      transSupportBasicHtmlNodes: false,
    },
  })

  return instance
}

export function getServerI18n(locale: string) {
  try {
    return createInstanceWithResources(locale)
  } catch (error) {
    console.error(`[i18n] failed to load locale "${locale}"`, error)
    return createInstanceWithResources(defaultLocale)
  }
}

/**
 * 与 src/i18n/index.ts 的 useTranslation 保持一致的 hash key 翻译函数，
 * 供 Server Component 直接调用，避免每个页面都写成 client component。
 */
export function createServerTranslator(
  instance: ReturnType<typeof createInstance>
) {
  return (key: string, defaultValue?: string) => {
    const hashKey = `k${crc32(key).toString(16)}`
    const words = instance.t(hashKey, defaultValue as never) as unknown
    return typeof words === 'string' && words !== hashKey ? words : key
  }
}
