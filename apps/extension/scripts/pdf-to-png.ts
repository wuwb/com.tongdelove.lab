import fs from 'fs'
import path from 'path'
import { pdfToPng } from 'pdf-to-png-converter'

const inDir  = 'public/pdf/temu-barcodes';
const outDir = 'src/assets/imgs/temu-barcodes';

fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const file of fs.readdirSync(inDir)) {
    if (!file.toLowerCase().endsWith('.pdf')) continue;

    const pngPages = await pdfToPng(path.join(inDir, file), {
      viewportScale: 5,               // 清晰度倍率，可再提高
      outputFolder: outDir,
      outputFileMaskFunc: () => path.parse(file).name + '.png', // 同名输出
      pagesToProcess: [1]             // 如只转首页；要全部省略即可
    });
    console.log(`✅ ${file} → ${pngPages.length} 张 PNG`);
  }
})();
