import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const prisma = new PrismaClient()

interface UrlObject {
  url: string
}

const filePath = path.join(fileURLToPath(import.meta.url), '../data.txt') // 假设你的文本文件叫 urls.txt

// 异步读取文件
async function readUrlsFromFile(): Promise<UrlObject[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '')
        const urlObjects = lines.map((line) => ({ url: line.trim() }))
        resolve(urlObjects)
      }
    })
  })
}

export async function fetchPromises() {
  try {
    const urls = await readUrlsFromFile()

    const count = await prisma.sticker.createMany({
      data: urls.map((item) => {
        return {
          object: 'object',
          url: item.url,
        }
      }),
      skipDuplicates: true,
    })

    console.log('Completed!: ', count)
  } catch (error) {
    console.error('Error reading the file:', error)
  }
}

fetchPromises()
