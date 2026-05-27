// Learn more: https://docs.expo.dev/guides/monorepos/
const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')
const { FileStore } = require('metro-cache')
const { withNativeWind } = require('nativewind/metro')

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot)

// 1️⃣ 启用符号链接支持（关键！）
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 2️⃣ 添加 monorepo 路径到 watchFolders
config.watchFolders = [
  path.resolve(monorepoRoot, 'packages'),
  path.resolve(monorepoRoot, 'node_modules/.pnpm'),
];

// 3️⃣ 配置 nodeModulesPaths 解析顺序
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules/.pnpm/node_modules'),
];

// 4️⃣ Singleton Pinning：防止重复实例导致 "Invalid hook call"
const singletons = [
  'react',
  'react-native',
  'expo',
  'expo-router',
  'expo-modules-core',
  '@expo/metro-runtime',
];
config.resolver.extraNodeModules = singletons.reduce((acc, name) => {
  acc[name] = path.resolve(projectRoot, 'node_modules', name);
  return acc;
}, {});

// 5️⃣ 设置 EXPO_ROUTER_APP_ROOT（pnpm 下可能需要）
process.env.EXPO_ROUTER_APP_ROOT = path.resolve(projectRoot, 'src/app');

module.exports = withTurborepoManagedCache(
  withMonorepoPaths(
    withNativeWind(config, {
      input: './src/styles.css',
      configPath: './tailwind.config.ts',
    })
  )
)

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths (config) {
  const projectRoot = __dirname
  const workspaceRoot = path.resolve(projectRoot, '../..')

  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot]

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ]

  return config
}

/**
 * Move the Metro cache to the `node_modules/.cache/metro` folder.
 * This repository configured Turborepo to use this cache location as well.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache (config) {
  config.cacheStores = [
    new FileStore({ root: path.join(__dirname, 'node_modules/.cache/metro') }),
  ]
  return config
}
