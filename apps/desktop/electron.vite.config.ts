import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import reactPlugin from '@vitejs/plugin-react-swc'
import { CodeInspectorPlugin } from 'code-inspector-plugin'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import injectProcessEnvPlugin from 'rollup-plugin-inject-process-env'
import { dirname, normalize, resolve } from 'node:path'
import { main, resources } from './package.json'
import { settings } from './src/lib/electron-router-dom'

import pkg from './package.json'

const [nodeModules, devFolder] = normalize(dirname(main)).split(/\/|\\/g)
const devPath = [nodeModules, devFolder].join('/')

// console.log('nodeModules: ', nodeModules)
// console.log('devFolder: ', devFolder)
// console.log('devPath: ', devPath)

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'


const tsconfigPaths = tsconfigPathsPlugin({
  projects: [
    resolve('tsconfig.json'),
    resolve('tsconfig.node.json'),
    resolve('tsconfig.web.json')
  ]
})

export default defineConfig({
  main: {
    plugins: [
      tsconfigPaths,
      externalizeDepsPlugin({
        include: ['better-sqlite3', 'electron']
      })
    ],
    build: {
      rollupOptions: {
        external: [
          'better-sqlite3', 
          'electron',
          'bufferutil', 
          'utf-8-validate', 
          ...Object.keys(pkg.dependencies)
        ],
        input: {
          index: resolve('src/main/index.ts')
        },
        output: {
          dir: resolve(devPath, 'main'),
          // manualChunks: undefined, // 彻底禁用代码分割 - 返回 null 强制单文件打包
          // inlineDynamicImports: true // 内联所有动态导入，这是关键配置
        },
        onwarn(warning, warn) {
          if (warning.code === 'COMMONJS_VARIABLE_IN_ESM') return
          warn(warning)
        }
      },
      sourcemap: isDev
    },
    esbuild: isProd ? { legalComments: 'none' } : {},
    optimizeDeps: {
      noDiscovery: isDev
    }
  },
  preload: {
    plugins: [
      reactPlugin({
        tsDecorators: true
      }),
      tsconfigPaths, 
      externalizeDepsPlugin()
    ],
    build: {
      outDir: resolve(devPath, 'preload'),
      sourcemap: isDev
    }
  },
  renderer: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.platform': JSON.stringify(process.platform)
    },
    server: {
      port: settings.port
    },
    plugins: [
      tsconfigPaths,
      tailwindcss(),
      reactPlugin({
        tsDecorators: true
      }),
      ...(isDev ? [CodeInspectorPlugin({ 
        bundler: 'vite',
        hotKeys: ['altKey'],
        hideConsole: true
      })] : []),
    ],
    optimizeDeps: {
      exclude: ['pyodide'],
      esbuildOptions: {
        target: 'esnext' // for dev
      }
    },
    worker: {
      format: 'es'
    },

    publicDir: resolve(resources, 'public'),
    build: {
      target: 'esnext', // for build
      outDir: resolve(devPath, 'renderer'),
      rollupOptions: {
        plugins: [
          injectProcessEnvPlugin({
            NODE_ENV: 'production',
            platform: process.platform
          })
        ] as any,
        input: {
          index: resolve(__dirname, 'src/renderer/index.html'),
          miniWindow: resolve(__dirname, 'src/renderer/miniApp.html'),
        },
        onwarn(warning, warn) {
          if (warning.code === 'COMMONJS_VARIABLE_IN_ESM') return
          warn(warning)
        },

        output: {
          dir: resolve(devPath, 'renderer')
        }
      }
    },
    esbuild: isProd ? { legalComments: 'none' } : {}
  }
})
