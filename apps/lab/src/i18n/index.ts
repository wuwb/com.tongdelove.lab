import { useEvent } from '@/hooks'
import { crc32 } from 'crc'
import {
  Trans,
  appWithTranslation,
  useTranslation as _useTranslation,
  TFunction,
} from 'next-i18next'

export { Trans, appWithTranslation }

export let t: TFunction = ((key: string) => {
  return key
}) as TFunction
let globalTReady = false

/**
 * onPreInitI18next in next-i18next not work in server side, its maybe have more than one i18n instance.
 * use customTranslation to place
 */
export function useTranslation() {
  const { i18n, ready, t: originT } = _useTranslation()

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
