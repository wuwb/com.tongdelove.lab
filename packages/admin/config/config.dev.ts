// https://umijs.org/config/
import { defineConfig } from '@umijs/max';

export default defineConfig({
  // devtool: false,
  // mock: false,
  analytics: false,
  targets: {
    chrome: 107,
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    // 'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // chainWebpack: function (config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }: any) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     }
  //   });
  // },
});
