import fs from 'fs-extra'
import * as path from 'node:path'
import { PDFDocument } from 'pdf-lib'

interface SplitOptions {
  inputDir: string
  outputDir: string
  overwrite?: boolean
}

async function splitPdfFiles(options: SplitOptions): Promise<void> {
  const { inputDir, outputDir, overwrite = false } = options

  // 检查输入目录是否存在
  if (!(await fs.pathExists(inputDir))) {
    console.error(`❌ 输入目录不存在: ${inputDir}`)
    process.exit(1)
  }

  // 确保输出目录存在
  await fs.ensureDir(outputDir)

  // 读取目录中的所有文件
  const dirents = await fs.readdir(inputDir, { withFileTypes: true })
  const pdfFiles = dirents.filter(
    dirent => dirent.isFile() && /\.pdf$/i.test(dirent.name),
  )

  if (pdfFiles.length === 0) {
    console.log('📭 没有在输入目录中找到 PDF 文件。')
    return
  }

  console.log(`📁 发现 ${pdfFiles.length} 个 PDF 文件，开始拆分...\n`)

  for (const file of pdfFiles) {
    const filePath = path.join(inputDir, file.name)
    const fileNameWithoutExt = path.basename(file.name, path.extname(file.name))

    try {
      console.log(`📄 正在处理: ${file.name}`)

      const pdfBytes = await fs.readFile(filePath)
      const pdfDoc = await PDFDocument.load(pdfBytes)

      const pageCount = pdfDoc.getPageCount()

      if (pageCount === 0) {
        console.warn(`⚠️  文件为空（无页面）: ${file.name}`)
        continue
      }

      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const singlePageDoc = await PDFDocument.create()
        const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [pageIndex])
        singlePageDoc.addPage(copiedPage)

        const singlePageBuffer = await singlePageDoc.save()

        const outputFileName = `${fileNameWithoutExt}_page_${pageIndex + 1}.pdf`
        const outputPath = path.join(outputDir, outputFileName)

        if (!overwrite && (await fs.pathExists(outputPath))) {
          console.warn(`⚠️  跳过已存在的文件: ${outputFileName}`)
          continue
        }

        await fs.writeFile(outputPath, singlePageBuffer)
        console.log(`✅ 已生成: ${outputFileName}`)
      }

      console.log(`🟢 完成拆分 "${file.name}" (${pageCount} 页)\n`)
    }
    catch (err) {
      console.error(`💥 处理文件失败: ${file.name}`, err)
    }
  }

  console.log(`🎉 所有 PDF 拆分完成！输出路径: ${outputDir}`)
}

// ========================
// ====== 判断是否直接运行 ======
// ========================
const inputDir = path.resolve('./public/pdf/temu-origin') // 可修改为实际路径
const outputDir = path.resolve('./public/pdf/temu-dist') // 可修改为实际路径

splitPdfFiles({
  inputDir,
  outputDir,
  overwrite: false,
}).catch((err) => {
  console.error('脚本执行出错:', err)
  process.exit(1)
})
