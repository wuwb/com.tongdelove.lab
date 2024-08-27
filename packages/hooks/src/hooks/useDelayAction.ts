import { useCallback, useRef } from 'react'

export const useDelayAction = <T extends (...args: any[]) => void>(
  action: T,
  delay: number = 800
): [T, () => void] => {
  const actionRef = useRef<T>(action)
  const delayDebounceRef = useRef<NodeJS.Timeout | null>(null)

  // Update the stored action when the input action changes
  actionRef.current = action

  const debounceAction = useCallback(
    (...args: Parameters<T>) => {
      if (delayDebounceRef.current) {
        clearTimeout(delayDebounceRef.current)
      }

      delayDebounceRef.current = setTimeout(() => {
        actionRef.current(...args)
      }, delay)
    },
    [delay]
  )

  const cancelDebounceAction = useCallback(() => {
    if (delayDebounceRef.current) {
      clearTimeout(delayDebounceRef.current)
    }
  }, [])

  return [debounceAction as T, cancelDebounceAction]
}
