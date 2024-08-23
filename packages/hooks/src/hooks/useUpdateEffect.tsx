import { useRef, useEffect, DependencyList } from 'react'

export function useUpdateEffect(effect: () => void, deps: DependencyList) {
  const isMounted = useRef(false)

  // for react-refresh
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
