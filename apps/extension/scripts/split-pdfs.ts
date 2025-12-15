import fs from 'fs-extra'
import path, { join } from 'node:path'
import { PDFDocument } from 'pdf-lib'
import { PDFParse } from 'pdf-parse'

import type { PDFData } from '@/entrypoints/temu.content/print/types'

import { sanitizeIdentifier } from '@/entrypoints/temu.content/print/utils'

// --- 提取关键 ID ---
export function parsePDFText(text: string): null | PDFData {
  try {
    // 1. 清理文本：去除多余空格、换行符，并合并连续空白
    const cleaned = text.trim().replace(/\s+/g, ' ')

    // 2. 移除分页标记（如 "-- 1 of 1 --"）
    const withoutPageInfo = cleaned.replace(/\s*--\s*\d+\s+of\s+\d+\s*--/g, '').trim()

    // 3. 分割行为两部分：主体内容 和 地址+SKU 行
    const lines = withoutPageInfo
      .split('Made In China')
      .filter(Boolean)
      .map((s) => s.trim())

    if (lines.length < 1) {
      throw new Error('只有一行数据，无法提取。')
    }

    // 最后一部分是 "SKU Made In China"
    const addressMatch = /(\d+)\s+Made In China/.exec(cleaned)
    if (!addressMatch) {
      throw new Error('没有匹配到 Made In China。')
    }

    const sku = addressMatch[1]
    const address = 'Made In China'

    // 主体部分：在 SKU 之前的所有内容
    const mainContent = cleaned.substring(0, addressMatch.index).trim()

    if (!mainContent) {
      throw new Error('没有匹配到 SKU 之前的所有内容。')
    }

    let skuLabel: string
    let skuDescription: string

    // --- 情况1：以纯数字开头（如 6388971399）---
    const startsWithNumber = /^(\d+)(?:\s+(.+))?$/.exec(mainContent)
    if (startsWithNumber) {
      skuLabel = startsWithNumber[1].trim()
      skuDescription = startsWithNumber[2]?.trim() || ''
    }
    // --- 情况2：以字母+下划线格式开头（如 Z100_XXX_XXX）---
    else {
      const labelMatch = /^([A-Z0-9]+(?:_[A-Z0-9]+)+)(?:\s+(.*))?$/i.exec(mainContent)
      if (labelMatch) {
        skuLabel = labelMatch[1].trim()
        skuDescription = labelMatch[2]?.trim() || ''
      } else {
        // --- 情况3：都不匹配？尝试提取最长的大写/数字/下划线前缀 ---
        const fallbackMatch = /^(\w+)/.exec(mainContent)
        if (fallbackMatch) {
          skuLabel = fallbackMatch[1].trim()
          skuDescription = mainContent.substring(skuLabel.length).trim()
        } else {
          throw new Error('无法识别 skuLabel')
        }
      }
    }

    return {
      address,
      sku,
      skuDescription,
      skuLabel,
    }
  } catch (err) {
    console.warn('Failed to parse PDF text:', err)
    return null
  }
}

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    const parser = new PDFParse({ data: buffer })
    const data = await parser.getText()
    const result = data.text.trim()
    if (result.includes('前后规格不同，请不要贴错')) {
      return '前后规格不同，请不要贴错'
    }
    return result
  } catch (err) {
    console.warn('PDF 解析失败:', err)
    throw new Error('PDF 解析失败')
  }
}

// --- 防止文件名冲突 ---
async function getUniqueFilePath(dir: string, filename: string, overwrite: boolean): Promise<string> {
  const fullPath = join(dir, filename)
  if (overwrite || !(await fs.pathExists(fullPath))) {
    return fullPath
  }

  const nameWithoutExt = filename.replace(/\.\w+$/, '')
  const ext = filename.substring(filename.lastIndexOf('.'))
  let counter = 1
  while (await fs.pathExists(join(dir, `${nameWithoutExt}_${counter}${ext}`))) {
    counter++
  }
  return join(dir, `${nameWithoutExt}_${counter}${ext}`)
}

async function splitPdfFiles(inputDir: string, outputDir: string, overwrite = false) {
  if (!(await fs.pathExists(inputDir))) {
    console.error(`❌ 输入目录不存在: ${inputDir}`)
    process.exit(1)
  }

  await fs.ensureDir(outputDir)

  const dirents = await fs.readdir(inputDir, { withFileTypes: true })
  const pdfFiles = dirents.filter((dirent) => dirent.isFile() && /\.pdf$/i.test(dirent.name))

  if (pdfFiles.length === 0) {
    console.log('📭 没有找到 PDF 文件。')
    return
  }

  console.log(`📁 发现 ${pdfFiles.length} 个 PDF 文件，开始拆分...\n`)

  for (const file of pdfFiles) {
    const filePath = join(inputDir, file.name)

    try {
      console.log(`📄 正在处理: ${file.name}\n`)
      const pdfBytes = await fs.readFile(filePath)
      const pdfDoc = await PDFDocument.load(pdfBytes)
      const pageCount = pdfDoc.getPageCount()

      for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
        const singlePageDoc = await PDFDocument.create()
        const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [pageIndex])
        singlePageDoc.addPage(copiedPage)

        const singlePageBuffer = await singlePageDoc.save()

        // --- 提取文本并重命名 ---
        let extractedData: null | PDFData = null
        try {
          const text = await extractTextFromPdf(Buffer.from(singlePageBuffer))
          if (text === '前后规格不同，请不要贴错') {
            continue
          }
          extractedData = parsePDFText(text)
          console.log('extractedData: ', extractedData)
          const finalBaseName = sanitizeIdentifier(`${extractedData?.skuLabel}_${extractedData?.sku}`)

          const tempFileName = `${finalBaseName}.pdf`
          const finalPath = await getUniqueFilePath(outputDir, tempFileName, overwrite)

          await fs.writeFile(finalPath, singlePageBuffer)
          console.log(`✅ 已生成: ${path.basename(finalPath)}`)
        } catch (err) {
          console.warn(`⚠️ 文本提取失败 (${file.name} 第 ${pageIndex + 1} 页):`, err)
        }
      }

      console.log(`🟢 完成拆分 "${file.name}"\n`)
    } catch (err) {
      console.error(`💥 处理失败: ${file.name}`, err)
    }
  }

  console.log(`🎉 所有 PDF 拆分并重命名完成！输出路径: ${outputDir}`)
}

;(async () => {
  const inputDir = path.resolve('./public/pdf/temu-origin')
  const outputDir = path.resolve('./public/pdf/temu-barcodes')

  try {
    await splitPdfFiles(inputDir, outputDir, true)
  } catch (err) {
    console.error('脚本执行出错:', err)
    process.exit(1)
  }
})()
