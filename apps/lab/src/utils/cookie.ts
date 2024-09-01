import dayjs from 'dayjs'
import type { NextApiResponse } from 'next'
import cookie, { serialize, CookieSerializeOptions } from 'cookie'

import { COOKIE_CACHE_DAYS } from '@/utils/constants/settings'

export const setCookie = (key: string, value: string | undefined) => {
  const expires = dayjs().add(COOKIE_CACHE_DAYS, 'day').toISOString()

  document.cookie = `${key}=${value};expires=${expires};path=/;`
}

export const setCookie2 = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  } else {
    return undefined
  }
}
