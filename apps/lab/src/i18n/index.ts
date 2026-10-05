'use client'

import { useEvent } from '@tongdelove/hooks'
import { crc32 } from 'crc'
import {
  Trans,
  useTranslation as _useTranslation,
} from 'react-i18next'
import type { TFunction } from 'next-i18next'

export { Trans }

export let t: TFunction = ((key: string) => {
  return key
}) as TFunction
let globalTReady = false

/**
 * onPreInitI18next in next-i18next not work in server side, its maybe have more than one i18n instance.
 * use customTranslation to place
 */
export function useTranslation() {
  const translation = _useTranslation() as unknown as {
    i18n: unknown
    ready: boolean
    t: (key: any, defaultValue?: any, options?: any) => any
  }
  const { i18n, ready, t: originT } = translation

  const _t = useEvent<typeof originT>(
    (key: any, defaultValue?: any, options?: any) => {
      try {
        const hashKey = `k${crc32(key).toString(16)}`
        let words = originT(hashKey, defaultValue, options)
        if (words === hashKey) {
          words = key
          console.info(`[i18n] miss translation: [${hashKey}] ${key}`)
        }
        return words
      } catch (err) {
        console.error(err)
        return key
      }
    }
  )

  if (!globalTReady) {
    globalTReady = true
    t = _t
  }

  return {
    i18n,
    ready,
    t: _t,
  }
}
