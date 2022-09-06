const path = require('path');

module.exports = {
  debug: true,
  i18n: {
    defaultLocale: 'zh',
    locales: [
      'zh', // 中文
      // 'en', // 英文
      // 'ja', // 日文
      // 'ru', // 俄文
    ],
  },
  // fallbackLng: {
  //   default: ['en'],
  // },
  nonExplicitSupportedLngs: true,
  nsSeparator: '.',
  localePath: path.resolve('./public/locales'),
  ns: [
    'common',
    // 'modals', 'landing', 'dashboard', 'builder'
  ],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  keySeparator: 'false',
  namespaceSeparator: false,
  pluralSeparator: '——',
  contextSeparator: '——',
  // https://github.com/i18next/next-i18next#unserialisable-configs
  serializeConfig: false,
  react: {
    useSuspense: false,
  },
};
