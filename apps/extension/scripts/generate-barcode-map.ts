import { writeFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import process from 'node:process'

import { sanitizeIdentifier } from '@/entrypoints/temu.content/print/utils'

// 引入你自己项目中的 sanitizeIdentifier
const ASSETS_DIR = 'src/assets/imgs/temu-barcodes'
const OUTPUT_FILE = 'src/entrypoints/temu.content/print/map.ts'

async function generateMap() {
  const files = await readdir(ASSETS_DIR)
  const imageFiles = files.filter(f => f.match(/\.(png|jpe?g|webp)$/i))

  let content = `// This file is auto-generated. Do not edit manually.\n// Generated at: ${new Date().toISOString()}\n\n`
  const entries: string[] = []

  for (const file of imageFiles) {
    const varName = sanitizeIdentifier(file) // 使用共享方法
    const modulePath = `@/assets/imgs/temu-barcodes/${file}`

    content += `import ${varName} from '${modulePath}'\n`

    entries.push(`  ${varName},`)
  }

  content += `\nexport const map: Record<string, string> = {\n${entries.join(',\n')}\n};\n`
  writeFileSync(OUTPUT_FILE, content, 'utf-8')
}

generateMap().catch((err) => {
  console.error('❌ Script failed:', err)
  process.exit(1)
})
