import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  clean: true,
  dts: true,
  platform: 'browser',
  target: ['es2020', 'chrome70', 'edge18', 'firefox70', 'node22'],
  tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
  entry: ['src/index.ts', './components/**/*.ts?(x)'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  minify: !options.watch,
  treeshake: false,
  // tsconfig: 'tsconfig.json',
  splitting: false,
  sourcemap: true,
  external: ['react'],
  onSuccess: 'tsc --emitDeclarationOnly --declaration',
}));
