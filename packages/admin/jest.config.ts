import { configUmiAlias, createConfig } from '@umijs/max/test';

export default async () => {
  const config = await configUmiAlias({
    ...createConfig({
      target: 'browser',
    }),
  });

  console.log();
  return {
    ...config,
    testEnvironmentOptions: {
      ...(config?.testEnvironmentOptions || {}),
      url: 'http://localhost:8000',
    },
    testURL: 'http://localhost:8000',
    verbose: false,
    setupFiles: [...(config.setupFiles || []), './tests/setupTests.jsx'],
    globals: {
      ...config.globals,
      localStorage: null,
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    },
  };
};
