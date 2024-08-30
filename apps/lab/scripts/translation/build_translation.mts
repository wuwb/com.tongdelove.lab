import { buildTranslationFile, defaultTransform } from '@tongdelove/i18n'
import path from 'path'
// import nextI18NextConfig from '../next-i18next.config'
const nextI18NextConfig = await import('../next-i18next.config.js').then(
  (m) => m.default
)

/**
 * Call with pnpm translation
 */

const args = process.argv
const scriptArgs = args.slice(2)

let hasAParam = false
for (let i = 0; i < scriptArgs.length; i++) {
  if (scriptArgs[i] === '-a') {
    hasAParam = true
    break
  }
}

buildTranslationFile({
  input: ['src/**/*.{ts,tsx}', '!src/**/*.spec.{js,jsx,ts,tsx}'],
  output: path.resolve(process.cwd(), './public/locales'),
  lngs: nextI18NextConfig.i18n.locales,
  transform: defaultTransform,
  autoResolveConflict: hasAParam,
})
