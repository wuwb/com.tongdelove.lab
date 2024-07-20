const path = require('path')
const { initReactI18next } = require('react-i18next')

module.exports = {
  // debug: process.env.NODE_ENV === 'development',
  // lng: 'zh',
  i18n: {
    // defaultNS: 'common',
    // ns: ['common'],
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    // localeDetection: true,
    domains: [
      {
        domain: 'printlake.com',
        defaultLocale: 'en',
      },
      {
        domain: 'zh.printlake.com',
        defaultLocale: 'zh',
        locales: ['zh-CN'],
      },
    ],
  },
  // fallbaclLng: "zh",
  localePath: path.resolve('public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  keySeparator: 'false',
  namespacseSeparator: false,
  pluralSeparator: '——',
  contextSeparator: '——',

  serializeConfig: false,
  use: [initReactI18next],
  react: {
    useSuspense: false,
  },
}
