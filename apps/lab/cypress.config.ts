import { lighthouse, prepareAudit } from '@cypress-audit/lighthouse'
import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'cypress'

const { combinedEnv } = loadEnvConfig(process.cwd())
export default defineConfig({
  env: combinedEnv,

  e2e: {
    taskTimeout: 240000,
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 90000,
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        lighthouse: lighthouse(),
      })
    },
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
    supportFile: 'cypress/support/index.ts',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  projectId: '',
})
