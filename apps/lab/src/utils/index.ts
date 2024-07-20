import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
export * from './env'

export function identifyIdFormat(id: string) {
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const nanoIdRegex = /^[-_0-9a-zA-Z]{21}$/ // corrected placement of '-'

  if (uuidV4Regex.test(id)) {
    return 'UUIDv4'
  } else if (nanoIdRegex.test(id)) {
    return 'NanoID'
  } else {
    return 'Unknown'
  }
}

export function noop() {}

export function sleep(time: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve('time is up')
    }, time)
  )
}

export function getDNSPrefetchValue(domain: string): string | null {
  if (!domain) return null
  if (domain.startsWith('http')) return domain.replace(/https?:/, '')
  if (domain.startsWith('//')) return domain
  return `//${domain}`
}

export function trim(str) {
  if (!str) {
    return ''
  }
  return str.replace(/^\s+|\s+$/g, '')
}

export function replaceIgnoreCase(str, substr, replacement) {
  if (!str) {
    return ''
  }
  return str.replace(substr, replacement)
}

export function ossResponseParse(res, uploadImgURL) {
  const xmlDOM = new DOMParser().parseFromString(res, 'text/xml')
  const PostResponseArr = xmlDOM.getElementsByTagName('PostResponse')
  if (PostResponseArr && PostResponseArr.length) {
    const PostResponse = PostResponseArr[0]
    const KeyArr = PostResponse.getElementsByTagName('Key')
    if (KeyArr && KeyArr[0]) {
      return {
        path: KeyArr[0].innerHTML,
        url: uploadImgURL + '/' + KeyArr[0].innerHTML,
      }
    }
  }
  return {}
}

export function countToK(count) {
  if (!count) {
    return 0
  }
  if (count < 1000) {
    return count
  }
  let k = count / 100
  k = (parseInt(k) + Math.ceil(k - parseInt(k))) / 10
  return k
}

export function readDuration(wordCount) {
  return parseInt((wordCount / 300) * 60, 10) + '分钟'
}

export function displayPrice(price) {
  return (price / 100).toFixed(2)
}

/**
 * 字符串隐藏中间部分
 */
export function elipID(id: string, size = 6) {
  if (id && id.length > size * 2) {
    return `${id.substr(0, size)}...${id.substr(id.length - size, id.length)}`
  }
  return id
}

export function chunkArr<T>(arr: Array<T>, chunkSize: number) {
  const chunked = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunked.push(arr.slice(i, i + chunkSize))
  }
  return chunked
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMobile() {
  return 'ontouchstart' in document.documentElement
}

export const MyHost = `https://aspoem.com`
export const R2Host = `https://r2.aspoem.com`

/** 可用其他颜色 */
export const colors = [
  'text-blue-500',
  'text-yellow-500',
  'text-purple-500',
  'text-green-500',
  'text-pink-500',
  'text-indigo-500',
  'text-teal-500',
  'text-cyan-500',
  'text-lime-500',
  'text-orange-500',
]

/**
 * 通过中文字符将字符串分割
 * @param str
 * @param separator 是否保留分隔符
 * @returns
 */
export const splitChineseSymbol = (str: string, separator = true) => {
  if (separator) {
    return str
      .replaceAll('\n', '')
      .match(/[^。|！|？|，|；]+[。|！|？|，|；]+/g)
  }

  return str
    .replaceAll('\n', '')
    .split(/。|！|？|，|；/)
    .filter((s) => !!s)
}

export const stringFormat = (str: string, arr: string[]) => {
  return str.replace(/{(\d+)}/g, (match = '', number: number) => {
    return arr[number] || match
  })
}
