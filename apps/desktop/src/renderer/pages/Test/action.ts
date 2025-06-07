import sharp from 'sharp'
import { PDFDocument } from 'pdf-lib'
import * as fs from 'fs/promises'
import * as path from 'path'

interface IConfig {
  frameWidthMM: number
  frameHeightMM: number
  borderMM: number
  targetSubdir: string
  outputPdfName: string
  DPI: number
}

type FitMethod = 'contain' | 'cover'

const config3inch: IConfig = {
  frameWidthMM: 63.5,
  frameHeightMM: 89,
  borderMM: 5,
  targetSubdir: 'target',
  outputPdfName: 'merged_output.pdf',
  DPI: 300,
}

const config4inch: IConfig = {
  frameWidthMM: 76,
  frameHeightMM: 102,
  borderMM: 5,
  targetSubdir: 'target',
  outputPdfName: 'merged_output.pdf',
  DPI: 300,
}

const MM_TO_INCH: number = 1 / 25.4

export async function main(
  sourceFolder: string,
  size: string,
  fit: FitMethod = 'cover'
): Promise<string | void> {
  async function createFramedImage(imgPath: string): Promise<Buffer> {
    try {
      // Resize the image to fit within the content area
      const resizedImageBuffer: Buffer = await sharp(imgPath)
        .resize({
          width: innerContentWidth,
          height: innerContentHeight,
          fit: fit, // Use the specified fit method
          // Set the background to white. To make it transparent, use alpha: 0
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toFormat('jpeg')
        .toBuffer()

      let topOffset = borderPx
      let leftOffset = borderPx

      // For 'contain', we need to calculate the offset to center the image.
      if (fit === 'contain') {
        const metadata = await sharp(resizedImageBuffer).metadata()
        topOffset += Math.round(
          (innerContentHeight - (metadata.height ?? 0)) / 2
        )
        leftOffset += Math.round(
          (innerContentWidth - (metadata.width ?? 0)) / 2
        )
      }

      // Create a white background frame and composite the resized image onto it
      const framedImage: Buffer = await sharp({
        create: {
          width: frameWidthPx,
          height: frameHeightPx,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      })
        .composite([
          {
            input: resizedImageBuffer,
            top: topOffset,
            left: leftOffset,
          },
        ])
        .jpeg()
        .toBuffer()

      return framedImage
    } catch (error) {
      console.error(`Error processing image ${imgPath}:`, error)
      throw error
    }
  }

  if (!sourceFolder) {
    console.error(
      'Error: Please provide the path to the folder you want to process.'
    )
    return
  }

  let config: IConfig | undefined = undefined

  if (size === '3inch') {
    config = config3inch
  } else if (size === '4inch') {
    config = config4inch
  }

  if (typeof config === 'undefined') {
    console.error(`Error: Invalid size '${size}' specified.`)
    return
  }

  const frameWidthPx: number = Math.round(
    config.frameWidthMM * MM_TO_INCH * config.DPI
  )
  const frameHeightPx: number = Math.round(
    config.frameHeightMM * MM_TO_INCH * config.DPI
  )
  const borderPx: number = Math.round(config.borderMM * MM_TO_INCH * config.DPI)

  const innerContentWidth: number = frameWidthPx - 2 * borderPx
  const innerContentHeight: number = frameHeightPx - 2 * borderPx

  const finalImageWidth: number = 2 * frameWidthPx
  const finalImageHeight: number = frameHeightPx

  try {
    const stats = await fs.stat(sourceFolder)
    if (!stats.isDirectory()) {
      throw new Error(`'${sourceFolder}' is not a valid directory.`)
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    return 'failed'
  }

  console.log(`Processing folder: ${sourceFolder} with fit mode: '${fit}'`)

  const targetFolder: string = path.join(sourceFolder, config.targetSubdir)
  await fs.mkdir(targetFolder, { recursive: true })

  const allFiles: string[] = await fs.readdir(sourceFolder)
  const validExtensions: string[] = [
    '.png',
    '.jpg',
    '.jpeg',
    '.bmp',
    '.gif',
    '.tiff',
    '.webp',
  ]
  let imageFiles: string[] = allFiles
    .filter(file => validExtensions.includes(path.extname(file).toLowerCase()))
    .sort()

  if (imageFiles.length === 0) {
    console.error('Error: No image files found in the source folder.')
    return
  }

  if (imageFiles.length % 2 !== 0) {
    console.warn(
      `Warning: Found ${imageFiles.length} images, which is an odd number. The last image will be ignored.`
    )
    imageFiles.pop()
  }

  if (imageFiles.length === 0) {
    console.error('Not enough images to merge.')
    return
  }

  console.log(
    `Found ${imageFiles.length} images, which will be merged into ${
      imageFiles.length / 2
    } pages.`
  )

  const mergedImagePaths: string[] = []

  for (let i = 0; i < imageFiles.length; i += 2) {
    const img1Name: string = imageFiles[i]
    const img2Name: string = imageFiles[i + 1]
    const img1Path: string = path.join(sourceFolder, img1Name)
    const img2Path: string = path.join(sourceFolder, img2Name)
    const outputFilename: string = `merge_${String(i / 2 + 1).padStart(
      3,
      '0'
    )}.jpg`
    const outputPath: string = path.join(targetFolder, outputFilename)

    console.log(
      `  -> Merging '${img1Name}' and '${img2Name}' -> ${outputFilename}`
    )

    try {
      const leftFrameBuffer: Buffer = await createFramedImage(img1Path)
      const rightFrameBuffer: Buffer = await createFramedImage(img2Path)

      await sharp({
        create: {
          width: finalImageWidth,
          height: finalImageHeight,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      })
        .composite([
          { input: leftFrameBuffer, gravity: 'west' },
          { input: rightFrameBuffer, gravity: 'east' },
        ])
        .jpeg({ quality: 95 })
        .toFile(outputPath)

      mergedImagePaths.push(outputPath)
    } catch (error) {
      console.error(`Failed to merge files ${img1Name} and ${img2Name}.`)
    }
  }

  console.log('\nAll images have been merged!')

  if (mergedImagePaths.length > 0) {
    console.log(`\nCreating PDF from ${mergedImagePaths.length} images...`)
    const pdfDoc = await PDFDocument.create()

    for (const imagePath of mergedImagePaths) {
      const imageBytes: Buffer = await fs.readFile(imagePath)
      const jpgImage = await pdfDoc.embedJpg(imageBytes)
      const page = pdfDoc.addPage([jpgImage.width, jpgImage.height])
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgImage.width,
        height: jpgImage.height,
      })
    }

    const pdfBytes: Uint8Array = await pdfDoc.save()
    const pdfOutputPath: string = path.join(targetFolder, config.outputPdfName)
    await fs.writeFile(pdfOutputPath, pdfBytes)
    console.log(`✅ PDF created successfully: ${pdfOutputPath}`)
  }

  console.log('\n🎉 All tasks completed!')

  return 'ok'
}
