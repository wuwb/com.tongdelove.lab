import { useState } from 'react'
import { useEvent } from './useEvent'

/**
 * @deprecated please use useEventWithLoading
 */
export function useEventState<T extends any[], U>(
  _fn: (...args: T) => Promise<U>
) {
  const [isLoading, setIsLoading] = useState(false)

  const fn = useEvent(async (...args: T): Promise<U> => {
    setIsLoading(true)
    const ret = await _fn(...args)
    setIsLoading(false)

    return ret
  })

  return [fn, { isLoading }] as const
}
