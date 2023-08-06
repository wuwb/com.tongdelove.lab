const path = require('path');

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: [
      'zh', // 中文
      // 'en', // 英文
      // 'ja', // 日文
      // 'ru', // 俄文
    ],
  },
  fallbackLng: {
    default: ['zh'],
    en: ['zh']
  },
  // de, fr and en will be loaded as fallback languages for de-CH
  nonExplicitSupportedLngs: true,
  defaultNS: 'common',
  localePath: path.resolve('./public/locales'),
  localeExtension: 'json',
  interpolation: {
    prefix: '{{',
    suffix: '}}',
  },
  localeStructure: '{{lng}}/{{ns}}',
  reloadOnPrerender: isDev,
  // https://github.com/i18next/next-i18next#unserialisable-configs
  serializeConfig: false,
  // use: [],

  // https://www.i18next.com/overview/configuration-options
  // https://react.i18next.com/latest/i18next-instance
  // debug: isDev,
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
};
