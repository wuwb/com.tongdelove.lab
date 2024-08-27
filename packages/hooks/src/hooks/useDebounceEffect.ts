import { DependencyList, useEffect } from 'react'

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (deps) {
        try {
          // eslint-disable-next-line prefer-spread
          fn.apply(undefined, deps as any)
        } catch (err) {
          console.log('err: ', err)
        }
      }
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
