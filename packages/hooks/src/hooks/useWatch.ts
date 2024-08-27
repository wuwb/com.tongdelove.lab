import { DependencyList, useLayoutEffect } from 'react'
import { useEvent } from './useEvent'

/**
 * Subscribe to changes and trigger callbacks
 *
 * No need to worry about variable references within functions
 *
 * @example
 * useWatch([a], () => {
 *   console.log("a is", a);
 * })
 */
export function useWatch(deps: DependencyList, cb: () => void) {
  const memoizedFn = useEvent(cb)
  useLayoutEffect(() => {
    memoizedFn()
  }, deps)
}
