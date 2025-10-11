import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import reactPlugin from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import injectProcessEnvPlugin from 'rollup-plugin-inject-process-env'
import { dirname, normalize, resolve } from 'node:path'
import { main, resources } from './package.json'
import { settings } from './src/lib/electron-router-dom'

const [nodeModules, devFolder] = normalize(dirname(main)).split(/\/|\\/g)
const devPath = [nodeModules, devFolder].join('/')

// console.log('nodeModules: ', nodeModules)
// console.log('devFolder: ', devFolder)
console.log('devPath: ', devPath)

const tsconfigPaths = tsconfigPathsPlugin({
  projects: [resolve('tsconfig.json')]
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve('src/main/index.ts')
        },
        output: {
          dir: resolve(devPath, 'main')
        }
      }
    }
  },
  preload: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
    build: {
      outDir: resolve(devPath, 'preload')
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
      codeInspectorPlugin({
        bundler: 'vite',
        hotKeys: ['altKey'],
        hideConsole: true
      }),
      reactPlugin()
    ],

    publicDir: resolve(resources, 'public'),
    build: {
      outDir: resolve(devPath, 'renderer'),
      rollupOptions: {
        plugins: [
          injectProcessEnvPlugin({
            NODE_ENV: 'production',
            platform: process.platform
          })
        ] as any,
        input: {
          index: resolve('src/renderer/index.html')
        },
        output: {
          dir: resolve(devPath, 'renderer')
        }
      }
    }
  }
})
