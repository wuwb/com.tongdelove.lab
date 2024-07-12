// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'
import { withSentryConfig } from '@sentry/nextjs' // https://docs.sentry.io/platforms/javascript/guides/nextjs/
import { createSecureHeaders } from 'next-secure-headers'
import pc from 'picocolors'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import withBundleAnalyzer from '@next/bundle-analyzer'
import nextI18nConfig from './next-i18next.config.js'
import nextUtils from './next-utils.config.mjs'

const jiti = createJiti(fileURLToPath(import.meta.url))

// validate during build
jiti('./src/env/client')
jiti('./src/env/server')

const { tsconfigPath } = nextUtils.loadCustomBuildParams()

const isProd = process.env.NODE_ENV === 'production'

const workspaceRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', '..')

/**
 * Once supported replace by node / eslint / ts and out of experimental, replace by
 * `import packageJson from './package.json' assert { type: 'json' };`
 * @type {import('type-fest').PackageJson}
 */
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString('utf-8'))

if (!process.env.NEXT_BUILD_ENV_SOURCEMAPS) {
  console.log(`- ${pc.green('info')} Sourcemaps generation have been disabled through NEXT_BUILD_ENV_SOURCEMAPS`)
}

// @link https://github.com/jagaapple/next-secure-headers
// const secureHeaders = createSecureHeaders({
//   contentSecurityPolicy: {
//     directives:
//       process.env.NEXT_BUILD_ENV_CSP === true
//         ? {
//           defaultSrc: "'self'",
//           styleSrc: [
//             "'self'",
//             "'unsafe-inline'",
//             'https://unpkg.com/@graphql-yoga/graphiql/dist/style.css',
//             'https://meet.jitsi.si',
//             'https://8x8.vc',
//           ],
//           scriptSrc: [
//             "'self'",
//             "'unsafe-eval'",
//             "'unsafe-inline'",
//             'https://unpkg.com/@graphql-yoga/graphiql',
//             // 'https://meet.jit.si/external_api.js',
//             // 'https://8x8.vc/external_api.js',
//           ],
//           frameSrc: [
//             "'self'",
//             // 'https://meet.jit.si',
//             // 'https://8x8.vc',
//           ],
//           connectSrc: [
//             "'self'",
//             'https://vitals.vercel-insights.com',
//             'https://*.sentry.io',
//             // 'wss://ws.pusherapp.com',
//             // 'wss://ws-eu.pusher.com',
//             // 'https://sockjs.pusher.com',
//             // 'https://sockjs-eu.pusher.com',
//           ],
//           imgSrc: ["'self'", 'https:', 'http:', 'data:'],
//           workerSrc: ['blob:'],
//         }
//         : {},
//   },
//   ...(process.env.NEXT_BUILD_ENV_CSP === true && process.env.NODE_ENV === 'production'
//     ? {
//       forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
//     }
//     : {}),
//   referrerPolicy: 'same-origin',
// })

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // basePath: '',
  // productionBrowserSourceMaps: process.env.NEXT_BUILD_ENV_SOURCEMAPS === true,
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: nextI18nConfig.i18n,

  // Required by Next i18n with API routes, otherwise API routes 404 when fetching without trailing slash
  // trailingSlash: true,

  optimizeFonts: true,
  // poweredByHeader: false,

  httpAgentOptions: {
    // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
    keepAlive: true,
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: (process.env.NEXT_BUILD_ENV_CI ? 3600 : 25) * 1000,
  },

  // @link https://nextjs.org/docs/advanced-features/compiler#minification
  // Sometimes buggy so enable/disable when debugging.
  swcMinify: true,

  compiler: {
    // Remove console aside from 'error' in production
    // removeConsole: {
    //   exclude: ['error'],
    // },
    // emotion: true,
    // Remove data-testid used for React Testing Library in production
    // reactRemoveProperties: {
    //   properties: ['^data-custom$', '^data-testid$'],
    // },
  },

  sentry: {
    hideSourceMaps: true,
    // To disable the automatic instrumentation of API route handlers and server-side data fetching functions
    // In other words, disable if you prefer to explicitly handle sentry per api routes (ie: wrapApiHandlerWithSentry)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-server-side-auto-instrumentation
    autoInstrumentServerFunctions: false,
  },

  // @link https://nextjs.org/docs/basic-features/image-optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 432000,
    formats: ['image/webp'],
    loader: 'default',
    dangerouslyAllowSVG: false,
    disableStaticImages: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // @decarated changed to remotePatterns
    domains: [
      'www.gravatar.com',
      // 加入 wordpress 相关域名
      'blog.tongdelove.com',
      '127.0.0.1',
      'localhost',
      'via.placeholder.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'via.placeholder.com',
      },
    ],
    unoptimized: false,
  },

  transpilePackages: [
    // '@tongdelove/api',
    // '@tongdelove/auth',
    // '@tongdelove/db',
    '@tongdelove/ui',
    '@tongdelove/validators',
  ],

  // Standalone build
  // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
  ...(process.env.NEXT_BUILD_ENV_OUTPUT === 'standalone' ? { output: 'standalone', outputFileTracing: true } : {}),

  experimental: {
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
    ...(process.env.NEXT_BUILD_ENV_OUTPUT === 'standalone' ? { outputFileTracingRoot: workspaceRoot } : {}),

    // Useful in conjunction with to `output: 'standalone'` and `outputFileTracing: true`
    // to keep lambdas sizes / docker images low when vercel/nft isn't able to
    // drop unneeded deps for you. ie: esbuil-musl, swc-musl... when not actually needed
    //
    // Note that yarn 3+/4 is less impacted thanks to supportedArchitectures.
    // See https://yarnpkg.com/configuration/yarnrc#supportedArchitectures and
    // config example in https://github.com/belgattitude/nextjs-monorepo-example/pull/3582
    // NPM/PNPM might adopt https://github.com/npm/rfcs/pull/519 in the future.
    //
    // Caution: use it with care because you'll have to maintain this over time.
    //
    // How to debug in vercel: set NEXT_DEBUG_FUNCTION_SIZE=1 in vercel env, then
    // check the last lines of vercel build.
    //
    // Related issue: https://github.com/vercel/next.js/issues/42641

    // Caution if using pnpm you might also need to consider that things are hoisted
    // under node_modules/.pnpm/<something variable>. Depends on version
    outputFileTracingExcludes: {
      '*': [
        'node_modules/canvas',
        'node_modules/.pnpm/canvas@2.11.2',
        '**/node_modules/@swc/core-linux-x64-gnu/**/*',
        '**/node_modules/@swc/core-linux-x64-musl/**/*',
        // If you're nor relying on mdx-remote... drop this
        '**/node_modules/esbuild/linux/**/*',
        '**/node_modules/webpack/**/*',
        '**/node_modules/terser/**/*',
        // If you're not relying on sentry edge or any weird stuff... drop this too
        // https://github.com/getsentry/sentry-javascript/pull/6982
        '**/node_modules/rollup/**/*',
      ],
    },

    webVitalsAttribution: ['CLS', 'LCP'],
    // https://nextjs.org/docs/app/api-reference/functions/server-actions
    // serverActions: true,
    // serverActionsBodySizeLimit: '2mb',

    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    // Google fonts
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },

  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },

  eslint: {
    ignoreDuringBuilds: true,
    // dirs: [`${__dirname}/src`], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },

  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: process.env.NEXT_BUILD_ENV_TSCONFIG,
    //   tsconfigPath,
    //   ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|wasm|gif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2629746, must-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=2629746, must-revalidate',
          },
        ],
      },
      {
        source: '/api/auth/csrf',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        source: '/api/auth/session',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        // All page routes, not the api ones
        source: '/:path((?!api).*)*',
        headers: [
          // ...secureHeaders,
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
        ],
      },
    ]
  },

  // async redirects() {
  //   return [
  //     // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
  //     {
  //       source: '/blog/:slug*',
  //       destination: '/news/:slug*',
  //       permanent: false,
  //     },
  //   ];
  // },
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       // These rewrites are checked after headers/redirects
  //       // and before all files including _next/public files which
  //       // allows overriding page files
  //       {
  //         source: '/some-page',
  //         destination: '/somewhere-else',
  //         has: [{ type: 'query', key: 'overrideMe' }],
  //       },
  //     ],
  //     afterFiles: [
  //       // These rewrites are checked after pages/public files
  //       // are checked but before dynamic routes
  //       {
  //         source: '/blog',
  //         destination: '/postss',
  //       },
  //     ],
  //     // fallback: [
  //     //   // These rewrites are checked after both pages/public files
  //     //   // and dynamic routes are checked
  //     //   {
  //     //     source: '/:path*',
  //     //     destination: `https://localhost:3000/:path*`,
  //     //   },
  //     // ],
  //   };
  // },

  // @link https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return [
      {
        source: '/mp/lib.min.js',
        destination: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js',
      },
      {
        source: '/mp/lib.js',
        destination: 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.js',
      },
      {
        source: '/mp/decide',
        destination: 'https://decide.mixpanel.com/decide',
      },
      {
        source: '/mp/:slug',
        // use "api-eu.mixpanel.com" if you need to use EU servers
        destination: 'https://api.mixpanel.com/:slug',
      },
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:7001/api/:path*',
      // },
    ]
  },

  // Hack to make Tailwind darkMode 'class' strategy with CSS Modules
  // Ref: https://github.com/tailwindlabs/tailwindcss/issues/3258#issuecomment-968368156
  webpack: (config, { webpack, isServer }) => {
    // if (!isServer) {
    //     // Fixes npm packages that depend on `fs` module
    //     // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
    //     config.resolve.fallback = {
    //         ...config.resolve.fallback,
    //         fs: 'empty',
    //         os: false,
    //         path: false,
    //         net: false,
    //         dns: false,
    //         child_process: false,
    //         tls: false
    //     }
    // }

    // // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
    // config.plugins.push(
    //     new webpack.DefinePlugin({
    //         __SENTRY_DEBUG__: process.env.NEXT_BUILD_ENV_SENTRY_DEBUG,
    //         __SENTRY_TRACING__: process.env.NEXT_BUILD_ENV_SENTRY_TRACING,
    //     })
    // )

    // // Enable WebAssembly support
    // config.experiments = {
    //     asyncWebAssembly: true,// Enable async WebAssembly modules
    //     layers: true,// Enable layers experiment
    // }

    // config.module.rules.push({
    //     test: /\.svg$/,
    //     issuer: /\.(js|ts)x?$/,
    //     use: [
    //         {
    //             loader: '@svgr/webpack',
    //             // https://react-svgr.com/docs/webpack/#passing-options
    //             options: {
    //                 svgo: isProd,
    //                 // @link https://github.com/svg/svgo#configuration
    //                 // svgoConfig: { }
    //             },
    //         },
    //     ],
    // })

    //   const rules = config.module.rules.find(r => !!r.oneOf);
    //   rules.oneOf.forEach(loaders => {
    //     if (Array.isArray(loaders.use)) {
    //       loaders.use.forEach(l => {
    //         if (typeof l !== 'string' && typeof l.loader === 'string' && /(?<!post)css-loader/.test(l.loader)) {
    //           if (!l.options.modules) return;
    //           const { getLocalIdent, ...others } = l.options.modules;
    //           l.options = {
    //             ...l.options,
    //             modules: {
    //               ...others,
    //               getLocalIdent: (ctx, localIdentName, localName, options) => {
    //                 if (localName === 'dark') return localName;
    //                 return getLocalIdent(ctx, localIdentName, localName, options);
    //               },
    //             },
    //           };
    //         }
    //       });
    //     }
    //   });
    config.resolve.fallback = { fs: false };
    return config
  },

  env: {
    APP_NAME: packageJson.name ?? 'not-in-package.json',
    APP_VERSION: packageJson.version ?? 'not-in-package.json',
    BUILD_TIME: new Date().toISOString(),
  },
}

const plugins = [
  // const withImages = require('next-images')({
  //     disableStaticImages: true,
  // });
  // const withOffline = require('next-offline')
  // [withImages],
  // [withOffline, {
  //     workboxOpts: {
  //         swDest: 'static/service-worker.js',
  //         runtimeCaching: [
  //             {
  //                 urlPattern: /[.](png|jpg|ico|css)/,
  //                 handler: 'CacheFirst',
  //                 options: {
  //                     cacheName: 'assets-cache',
  //                     cacheableResponse: {
  //                         statuses: [0, 200],
  //                     },
  //                 },
  //             },
  //             {
  //                 urlPattern: /^http.*/,
  //                 handler: 'NetworkFirst',
  //                 options: {
  //                     cacheName: 'http-cache',
  //                 },
  //             },
  //         ],
  //     },
  // }],
  // withLess(
  //   {
  //     lessLoaderOptions: {
  //       lessOptions: {
  //         paths: [path.resolve(__dirname, './src')],
  //       },
  //     },
  //   },
  // ),

  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  }),
]

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = (phase, { defaultConfig }) => {
  let result = config

  // if (process.env.CI === 'true' && process.env.NEXT_BUILD_ENV_SENTRY_ENABLED === true) {
  //   // @ts-ignore cause sentry is not always following nextjs types
  //   result = withSentryConfig(
  //     config,
  //     {
  //       // For all available options, see:
  //       // https://github.com/getsentry/sentry-webpack-plugin#options

  //       // Additional config options for the Sentry Webpack plugin. Keep in mind that
  //       // the following options are set automatically, and overriding them is not
  //       // recommended:
  //       //   release, url, org, project, authToken, configFile, stripPrefix,
  //       //   urlPrefix, include, ignore
  //       // For all available options, see:
  //       // https://github.com/getsentry/sentry-webpack-plugin#options.
  //       // silent: isProd, // Suppresses all logs
  //       dryRun: process.env.NEXT_BUILD_ENV_SENTRY_UPLOAD_DRY_RUN === true,
  //       silent: process.env.NEXT_BUILD_ENV_SENTRY_DEBUG === false,

  //       // Suppresses source map uploading logs during build
  //       silent: true,

  //       org: 'httpsgithubcomflowgpt',
  //       project: 'flow-gpt',
  //     },
  //     {
  //       // For all available options, see:
  //       // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  //       // Upload a larger set of source maps for prettier stack traces (increases build time)
  //       widenClientFileUpload: true,

  //       // Transpiles SDK to be compatible with IE11 (increases bundle size)
  //       transpileClientSDK: true,

  //       // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  //       tunnelRoute: '/monitoring',

  //       // Hides source maps from generated client bundles
  //       hideSourceMaps: true,

  //       // Automatically tree-shake Sentry logger statements to reduce bundle size
  //       disableLogger: true,

  //       // To disable the automatic instrumentation of API route handlers and server-side data fetching functions
  //       // In other words, disable if you prefer to explicitly handle sentry per api routes (ie: wrapApiHandlerWithSentry)
  //       // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-server-side-auto-instrumentation
  //       autoInstrumentServerFunctions: false,
  //     }
  //   )
  // } else {
  //   const { sentry, ...rest } = nextConfig
  //   result = rest
  // }

  return plugins.reduce((acc, next) => next(acc), {
    ...defaultConfig,
    ...result,
  })
}

export default nextConfig
