import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const LAB_API_SERVER_URL =
  process.env.LAB_API_SERVER_URL ??
  process.env.NEXT_PUBLIC_EXPRESS_SERVER_URL ??
  'http://localhost:8001'

console.log('LAB_API_SERVER_URL:', LAB_API_SERVER_URL)

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

    // 通过 services/server 写入，lab 不再直连数据库
    for (const item of urls) {
      const res = await fetch(`${LAB_API_SERVER_URL}/api/lab/sticker/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          object: 'object',
          color: '',
          accessory: '',
          doing: '',
          style: '',
          url: item.url,
        }),
      })

      if (!res.ok) {
        console.error('Failed to create sticker:', item.url, res.status)
      }
    }

    console.log('Completed!: ', urls.length)
  } catch (error) {
    console.error('Error reading the file:', error)
  }
}

fetchPromises()
