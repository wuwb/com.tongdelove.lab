import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-mdx-gfm', 'storybook-dark-mode', '@storybook/addon-styling'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
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
