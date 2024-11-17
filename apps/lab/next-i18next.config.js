const path = require('path')
const crc32 = require('crc').crc32

const localePublicFolder = '/public/locales'

/**
 * @type {import('next-i18next').UserConfig}
 */
const nextI18NextConfig = {
  // debug: process.env.NODE_ENV === 'development',
  // https://www.i18next.com/overview/configuration-options#logging
  i18n: {
    defaultLocale: 'zh',
    locales: [
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
    ],
    localeDetection: false,
  },
  // fallbackLng: {
  //   default: ['en'],
  //   'de-CH': ['fr'],
  // },
  // nonExplicitSupportedLngs: true,
  serializeConfig: false,
  defaultNS: 'translation',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath: path.resolve('./public/locales'),
  // localePath:
  //   typeof window === 'undefined'
  //     ? path.resolve('./public/locales')
  //     : localePublicFolder,
  react: {
    transSupportBasicHtmlNodes: false,
    useSuspense: false,
    hashTransKey(defaultValue) {
      // return a key based on defaultValue or if you prefer to just remind you should set a key return false and throw an error
      return `k${crc32(defaultValue).toString(16)}`
    },
  },

  saveMissing: false,
  /*
  interpolation: {
    escapeValue: false,
  },
  */

  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */

  // de, fr and en will be loaded as fallback languages for de-CH
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
