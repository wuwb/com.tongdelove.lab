'use client'

import { useEffect, useState } from 'react'
import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { UserConfig } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'
import { getTranslation } from './routing'

/**
 * App Router 下的客户端 i18n 初始化。
 *
 * Pages Router 依赖 `appWithTranslation`，它要求 `props.router.locale`（Pages Router API），
 * App Router 下不存在，因此这里自行初始化 i18next 实例。
 *
 * 实例在创建时即通过 initReactI18next 绑定到 react-i18next，
 * 使 `src/i18n/index.ts` 导出的 useTranslation 在客户端组件中照常工作，
 * 业务代码无需改动。
 *
 * 配置沿用 next-i18next.config.js，保持 hashTransKey 行为一致，
 * 使既有 public/locales 下的 translation.json 无需改动。
 */
const createI18nInstance = (locale: string) => {
  const instance = createInstance()
  const userConfig = nextI18NextConfig as UserConfig
  const fallbackLng = userConfig.i18n?.defaultLocale ?? 'zh'

  instance.use(initReactI18next).init({
    ...userConfig,
    lng: locale,
    fallbackLng,
    // 客户端直接使用已构建的翻译资源，避免 fs backend
    resources: {
      [locale]: { translation: getTranslation(locale) },
    },
    react: {
      ...userConfig.react,
      useSuspense: false,
    },
  })

  return instance
}

/**
 * 在应用根部初始化客户端 i18n。
 *
 * 语言由 `[locale]` 路由段决定，在根布局挂载一次即可。
 */
export function ClientI18nInitializer({
  locale,
  children,
}: {
  locale: string
  children: React.ReactNode
}) {
  const [i18n] = useState(() => createI18nInstance(locale))

  useEffect(() => {
    if (i18n.language === locale) return

    try {
      i18n.addResourceBundle(
        locale,
        'translation',
        getTranslation(locale),
        true,
        true
      )
    } catch (error) {
      console.error(`[i18n] failed to load locale "${locale}"`, error)
    }

    void i18n.changeLanguage(locale)
  }, [i18n, locale])

  return <>{children}</>
}
