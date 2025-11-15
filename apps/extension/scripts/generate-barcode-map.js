// scripts/generate-barcode-map.js
import { readdir } from 'fs/promises';
import { writeFileSync } from 'fs';

const ASSETS_DIR = 'src/assets/imgs/temu-barcodes';
const OUTPUT_FILE = 'src/entrypoints/temu.content/print/map.ts';

function sanitizeIdentifier(filename) {
  const baseName = filename.replace(/\.\w+$/, '');
  let safe = baseName.replace(/[^a-zA-Z0-9_$]/g, '_');
  if (!/^[a-zA-Z_$]/.test(safe)) {
    safe = '_' + safe;
  }
  return safe;
}

async function generateMap() {
  const files = await readdir(ASSETS_DIR);
  const imageFiles = files.filter(f => f.match(/\.(png|jpe?g|webp)$/i));

  let content = `// This file is auto-generated. Do not edit manually.\n// Generated at: ${new Date().toISOString()}\n\n`;
  const entries = [];

  for (const file of imageFiles) {
    const baseName = file.replace(/\.\w+$/, ''); // 获取不带扩展名的文件名
    const varName = sanitizeIdentifier(file);   // 清洗后作为合法变量名

    const modulePath = '@/assets/imgs/temu-barcodes/' + file;

    content += `import ${varName} from '${modulePath}';\n`;

    // map 的 key 使用清洗后的版本，确保与运行时 getMapKey 一致
    const mapKey = sanitizeIdentifier(file);
    entries.push(`  ${mapKey}: ${varName}`);
  }

  content += `\nexport const map: Record<string, string> = {\n${entries.join(',\n')}\n};\n`;
  writeFileSync(OUTPUT_FILE, content, 'utf-8');
}

generateMap().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
