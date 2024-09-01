const path = require('path')
const crc32 = require('crc').crc32

const isDev = process.env.NODE_ENV !== 'production'
const debugI18n = ['true', 1].includes(
  process?.env?.NEXTJS_DEBUG_I18N ?? 'false'
)

const localePublicFolder = undefined
const defaultLocale = 'en'

/**
 * @type {import('next-i18next').UserConfig}
 */
const nextI18NextConfig = {
  // https://www.i18next.com/overview/configuration-options#logging
  i18n: {
    defaultLocale: 'zh',
    locales: [
      'zh',
      'en',
      'zh-CN',
      'de-DE',
      'es-ES',
      'fr-FR',
      'ja-JP',
      'pt-BR',
      'ru-RU',
    ],
    localeDetection: false,
  },
  serializeConfig: false,
  defaultNS: 'translation',
  reloadOnPrerender: process?.env?.NODE_ENV === 'development',
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./public/locales')
      : localePublicFolder,
  react: {
    transSupportBasicHtmlNodes: false,
    useSuspense: false,
    hashTransKey(defaultValue) {
      // return a key based on defaultValue or if you prefer to just remind you should set a key return false and throw an error
      return `k${crc32(defaultValue).toString(16)}`
    },
  },

  saveMissing: false,
  debug: debugI18n,
  /*
  interpolation: {
    escapeValue: false,
  },
  */

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */

  // fallbackLng: {
  //   default: ['zh'],
  //   en: ['zh']
  // },
  // de, fr and en will be loaded as fallback languages for de-CH
  // nonExplicitSupportedLngs: true,
  // defaultNS: 'common',
  // localeExtension: 'json',
  // interpolation: {
  //   prefix: '{{',
  //   suffix: '}}',
  // },
  // localeStructure: '{{lng}}/{{ns}}',
  // https://github.com/i18next/next-i18next#unserialisable-configs
  // serializeConfig: false,
  // use: [],

  // https://www.i18next.com/overview/configuration-options
  // https://react.i18next.com/latest/i18next-instance
  // ns: [
  //   'common',
  //   // 'modals', 'landing', 'dashboard', 'builder'
  // ],
  // keySeparator: 'false',
  // namespaceSeparator: false,
  // // pluralSeparator: '——',
  // // contextSeparator: '——',
  // react: {
  //   useSuspense: false,
  // },
  // nsSeparator: '.',
}

module.exports = nextI18NextConfig
