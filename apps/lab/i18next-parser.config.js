module.exports = {
  createOldCatalogs: false,
  defaultNamespace: 'common',
  defaultValue: (lng, _ns, key) => (lng === 'zh' ? key : ''),
  keySeparator: false,
  namespaceSeparator: false,
  pluralSeparator: '——',
  contextSeparator: '——',
  lineEnding: 'lf',
  locales: [
    'zh', // 中文
    'en', // 英文
    // 'ja', // 日文
    // 'ru', // 俄文
  ],
  // output: path.join(localePath, '$LOCALE/$NAMESPACE.json'),
  input: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  sort: true,
}
