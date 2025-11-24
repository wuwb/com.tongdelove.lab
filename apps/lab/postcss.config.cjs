// Customized postcss
// @link https://nextjs.org/docs/advanced-features/customizing-postcss-config
// @link https://tailwindcss.com/docs/using-with-preprocessors
// https://github.com/tailwindlabs/tailwindcss/discussions/5934
// https://tailwindcss.com/docs/installation/using-postcss
// https://tailwindcss.com/docs/using-with-preprocessors#nesting

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // purge: [
  //   './src/**/*.tsx',
  // ],
  plugins: {
    // 'postcss-import': {},
    "@tailwindcss/postcss": {},
    // ⚠️ 注意：@tailwindcss/typography 在 v4 中通常在 CSS 文件中通过 @plugin 引入，
    // 但如果你还没迁移 CSS 写法，先把它注释掉或尝试保留看是否报错，
    // 推荐做法是在 CSS 文件里写: @plugin "@tailwindcss/typography";
    // '@tailwindcss/typography': {},

    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      // 注意：v4 处理嵌套和 autoprefixer 已经很完善，但 Mantine 需要这个处理变量
      // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#stability-and-portability
      stage: 3,
      autoprefixer: { grid: true },
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    ...(isProd
      ? {
          'postcss-preset-env': {
            // v4 已经处理了大部分前缀，这里主要为了 Mantine 的兼容性
            // https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#stability-and-portability
            stage: 3,
            autoprefixer: { grid: true },
          },
        }
      : {}),
  },
}
