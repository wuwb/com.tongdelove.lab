const path = require('path');

module.exports = {
  debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh']
  },
  localePath: path.resolve('public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  keySeparator: false,
  namespaceSeparator: false,
  pluralSeparator: '——',
  contextSeparator: '——',

  serializeConfig: false,
  react: {
    useSuspense: false,
  }
};
