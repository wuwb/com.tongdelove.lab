import { useCallback, useState } from 'react'

/**
 * Similar to ClassComponent's setState, used to manage object state
 */
export function useObjectState<T extends {}>(defaultValue: T | (() => T)) {
  const [state, _setState] = useState<T>(defaultValue)

  const setState = useCallback((value: Partial<T>) => {
    _setState((prev) => ({
      ...prev,
      ...value,
    }))
  }, [])

  return [state, setState] as const
}
