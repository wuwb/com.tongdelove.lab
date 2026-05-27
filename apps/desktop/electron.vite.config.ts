import { defineConfig } from 'electron-vite'
import reactPlugin from '@vitejs/plugin-react'
import { CodeInspectorPlugin } from 'code-inspector-plugin'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import injectProcessEnvPlugin from 'rollup-plugin-inject-process-env'
import { dirname, normalize, resolve } from 'node:path'
import { main, resources } from './package.json'
import { settings } from './src/lib/electron-router-dom'
import { visualizer } from 'rollup-plugin-visualizer'

import pkg from './package.json'

const [nodeModules, devFolder] = normalize(dirname(main)).split(/\/|\\/g)
const devPath = [nodeModules, devFolder].join('/')

const visualizerPlugin = (type: 'renderer' | 'main') => {
  return process.env[`VISUALIZER_${type.toUpperCase()}`] ? [visualizer({ open: true })] : []
}

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const tsconfigPaths = tsconfigPathsPlugin({
  projects: [resolve('tsconfig.json'), resolve('tsconfig.node.json'), resolve('tsconfig.web.json')]
})

export default defineConfig({
  main: {
    plugins: [
      tsconfigPaths,
      ...visualizerPlugin('main')
    ],
    resolve: {
      alias: {
        // '@main': resolve('src/main'),
        // '@types': resolve('src/renderer/src/types'),
        // '@shared': resolve('packages/shared'),
        // '@logger': resolve('src/main/services/LoggerService'),
        // '@mcp-trace/trace-core': resolve('packages/mcp-trace/trace-core'),
        // '@mcp-trace/trace-node': resolve('packages/mcp-trace/trace-node')
      }
    },
    build: {
      externalizeDeps: {
        include: ['better-sqlite3', 'electron']
      },
      rolldownOptions: {
        external: [
          'better-sqlite3', 
          'electron', 
          'bufferutil', 
          'utf-8-validate', 
          ...Object.keys(pkg.dependencies)
        ],
        output: {
          manualChunks: undefined, // 彻底禁用代码分割 - 返回 null 强制单文件打包
          inlineDynamicImports: true // 内联所有动态导入，这是关键配置
        },
        onwarn(warning, warn) {
          if (warning.code === 'COMMONJS_VARIABLE_IN_ESM') {
            return warn(warning)
          }
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
        exclude: [/\/pdf\//, /\.solid\.tsx$/, /\/node_modules\//]
      }),
      tsconfigPaths,
    ],
    resolve: {
      alias: {
        // '@shared': resolve('packages/shared'),
        // '@mcp-trace/trace-core': resolve('packages/mcp-trace/trace-core')
      }
    },
    build: {
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
        exclude: [/\/pdf\//, /\.solid\.tsx$/, /\/node_modules\//]
      }),
      ...(isDev
        ? [
            CodeInspectorPlugin({
              bundler: 'vite'
              // hotKeys: ['altKey'],
              // hideConsole: true
            })
          ]
        : []),
      ...visualizerPlugin('renderer')
    ],
    resolve: {
      alias: {
        // '@renderer': resolve('src/renderer/src'),
        // '@shared': resolve('packages/shared'),
        // '@types': resolve('src/renderer/src/types'),
        // '@logger': resolve('src/renderer/src/services/LoggerService'),
        // '@mcp-trace/trace-core': resolve('packages/mcp-trace/trace-core'),
        // '@mcp-trace/trace-web': resolve('packages/mcp-trace/trace-web'),
        // '@cherrystudio/ai-core/provider': resolve('packages/aiCore/src/core/providers'),
        // '@cherrystudio/ai-core/built-in/plugins': resolve('packages/aiCore/src/core/plugins/built-in'),
        // '@cherrystudio/ai-core': resolve('packages/aiCore/src'),
        // '@cherrystudio/extension-table-plus': resolve('packages/extension-table-plus/src'),
        // '@cherrystudio/ai-sdk-provider': resolve('packages/ai-sdk-provider/src')
      }
    },
    optimizeDeps: {
      exclude: ['pyodide'],
    },
    worker: {
      format: 'es'
    },

    build: {
      target: 'esnext', // for build
      rolldownOptions: {
        plugins: [
          injectProcessEnvPlugin({
            platform: process.platform
          })
        ] as any,
        input: {
          index: resolve(__dirname, 'src/renderer/index.html')
        },
        onwarn(warning, warn) {
          if (warning.code === 'COMMONJS_VARIABLE_IN_ESM') return
          warn(warning)
        }
      }
    },
    esbuild: isProd ? { legalComments: 'none' } : {}
  }
})
