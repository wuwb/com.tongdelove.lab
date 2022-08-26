const path = require('path');

module.exports = {
  debug: true,
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh']
  },
  localePath: path.resolve('public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  keySeparator: 'false',
  namespaceSeparator: false,
  pluralSeparator: '——',
  contextSeparator: '——',
  // https://github.com/i18next/next-i18next#unserialisable-configs
  serializeConfig: false,
  react: {
    useSuspense: false,
  }
};
