import { defineAppConfig } from '#imports'

// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    theme?: 'light' | 'dark';
    apiKey?: string;
    skipWelcome: boolean;
  }
}

export default defineAppConfig({
  theme: 'dark',
  apiKey: import.meta.env.WXT_API_KEY,
  skipWelcome: import.meta.env.WXT_SKIP_WELCOME === 'true',
})
