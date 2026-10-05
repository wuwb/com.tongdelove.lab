/**
 * 路由级 locale 配置（App Router `[locale]` 动态段）。
 *
 * 与 `src/i18n/config.ts` 区分：
 * - config.ts 是诗词内容模块的内容语言枚举（zh-Hans / zh-Hant ...）
 * - routing.ts 是 URL 路径段使用的 locale，取值与 next-i18next.config.js 一致
 *
 * locale 列表本身放在 locales.ts，供 edge runtime（src/proxy.ts）复用。
 */
export { defaultLocale, locales, isValidLocale } from './locales'
export type { AppLocale } from './locales'

export function getTranslation(
  locale: string,
  namespace = 'translation'
): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(`../../public/locales/${locale}/${namespace}.json`)
}
