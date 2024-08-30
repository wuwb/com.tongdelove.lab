import {
  IndentationText,
  scanUntranslatedText,
  defaultIgnoreText,
} from '@tongdelove/i18n'
import path from 'path'

/**
 * Call with pnpm translation:scan
 */

const root = path.resolve(process.cwd(), './src/**/*.tsx').replaceAll('\\', '/')
const tsConfigFilePath = path.resolve(process.cwd(), './tsconfig.json')
console.log('root:', root)

async function main() {
  const untranslatedText = await scanUntranslatedText(root, {
    project: {
      tsConfigFilePath,
      manipulationSettings: {
        indentationText: IndentationText.TwoSpaces,
      },
    },
    autoImport: true,
    verbose: true,
    ignoreFiles: [
      '**/*.stories.tsx',
      '**/stories/**',
      '**/pages/playground/**',
      '**/pages/about/index.tsx',
      '**/pages/image/[modelUri]/index.tsx',
      '**/pages/s1.tsx',
      '**/pages/privacy-policy.tsx',
      '**/pages/terms.tsx',
    ],
    ignoreText: [
      ...defaultIgnoreText,
      'FlowGPT',
      'https://flowgpt.com/',
      'FLOWGPT',
      '| FlowGPT',
      "'| FlowGPT'",
      'Flow Official',
      "'Flow Official'",
      'Flow Official',
      "'The official account of FlowGPT'",
      "'FlowGPT Studio'",
      '- FlowGPT',
      'discord',
      '"discord"',
      'Loading...',
      "'N/A'",
      '/ 1k',
      '/1k',
      '+',
      'K',
      '·',
      "'. . .'",
      '|',
      '&nbsp;·&nbsp;',
      '&nbsp;',
      '99+',
      '5.0',
      '.',
      '1',
      '2',
      '3',
      '5',
      '1.',
      '2.',
      '3.',
      '4.',
      '5.',
      '1 /',
      '15 /',
      '%',
      '?',
      '-',
      '0.5 / 1000',
      '/5.0',
      '3 / 1000',
      '$',
      '$0.00',
      '(',
      ')',
      '/',
      '"https://"',
      'No.',
      'Flux',
      '[Google]',
      "'99+'",
      "'aria-label'",
      "'5.0'",
      '100 flux',
      "'Change Image'",
      "'st'", // first's suffix
      "'nd'", // second's suffix
      "'rd'", // third's suffix
      "'th'", // fourth's suffix
      '⭐️',
      '(3:2)',
      '(1:1)',
      "'+'",
      "'-'",
      "' - '",
      "' >'",
      "'.'",
      "'ChatGPT'",
      "'Dan'",
      "'Chronos Hermes'",
      "'Claude V2'",
      "'Claude Instant'",
      "'Google Gemini'",
      "'Google Palm 2'",
      "'Mythalion 13B'",
      "'Pygmalion 13B'",
      "'GPT-4 Turbo'",
      "'GPT-4o'",
      "'Llama 2'",
      "'ChatGPT Long'",
      "'ChatGPT'",
      "'Mixtral 8x7B'",
      "'Dolphin 2.6 8x7B'",
      '"12000"',
      '"100"',
      '"blur"',
    ],
  })
  let count = 0

  Object.entries(untranslatedText).map(([path, list]) => {
    console.group(path)
    list.forEach((item) => {
      console.log(`- ${item}`)
      count++
    })
    console.groupEnd()
  })

  // TODO: Give helpful message to the user on what to do
  console.log(`Scan completed, found ${count} words that's not translated.`)

  if (count > 0) {
    process.exit(1)
  }
}

main()
