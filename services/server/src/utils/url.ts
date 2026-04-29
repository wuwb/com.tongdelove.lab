import * as url from 'url'
import { Request } from 'express'
import { IncomingMessage } from 'http'
import { URL } from 'url'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const parseRelativeUrl = (path: string) => {
  if (!path || !path.startsWith('/')) {
    return new URL('http://a.com')
  }
  return new URL(`http://a.com${path}`)
}

/**
 * 根据key从一段url中获取query值
 * @param {string} urlPath url地址
 * @param {string} key 获取单独的一个key
 * @return {*}
 */
export const getUrlQuery = (urlPath: string, key: string): string | null => {
  const theUrl = new url.URL(urlPath, 'https://www.')
  const params = new URLSearchParams(theUrl.search.substring(1))
  return params.get(key)
}
