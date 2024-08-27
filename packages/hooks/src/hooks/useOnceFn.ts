import { useRef } from 'react'
import { useEvent } from './useEvent'

export function useOnceFn(fn: Function) {
  const isCall = useRef(false)

  return useEvent((...args) => {
    if (isCall.current === false) {
      fn(...args)
      isCall.current = true
    }
  })
}
