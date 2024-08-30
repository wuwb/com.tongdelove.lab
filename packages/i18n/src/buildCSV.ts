import fg from 'fast-glob'
import fs from 'fs-extra'
import { stringify } from 'csv-stringify'
import get from 'lodash.get'

export async function buildCSV(source: string, language: string[]) {
  const fileList = await fg(source)

  const map: Record<string, Record<string, string>> = {}

  for (const filepath of fileList) {
    const arr = filepath.split('/')
    const languageCode = get(arr, arr.length - 2)

    const json: Record<string, string> = await fs.readJSON(filepath)
    Object.entries(json).map(([key, value]) => {
      map[key] = map[key] ?? {}
      map[key]![languageCode] = value
    })
  }

  return new Promise<string>((resolve, reject) => {
    stringify(
      [
        language,
        ...Object.values(map).map((item) => {
          return language.map((l) => {
            if (item[l] && l !== 'en' && item[l] === item['en']) {
              // no translated yet
              return ''
            }

            return item[l] ?? ''
          })
        }),
      ],
      function (err, output) {
        if (err) {
          reject(err)
        } else {
          resolve(output)
        }
      }
    )
  })
}
