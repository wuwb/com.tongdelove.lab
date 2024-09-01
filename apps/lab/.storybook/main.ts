import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/nextjs'
import { env as t3Env } from '../src/env/client'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
    getAbsolutePath('storybook-dark-mode'),
    getAbsolutePath('@storybook/addon-styling'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  env: (config) => ({
    ...config,
    ...t3Env,
  }),
  async webpackFinal(config, { configType }) {
    if (config.experiments) {
      config.experiments.asyncWebAssembly = true
      config.experiments.layers = true
    } else {
      config.experiments = {
        asyncWebAssembly: true,
        layers: true,
      }
    }

    return config
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
