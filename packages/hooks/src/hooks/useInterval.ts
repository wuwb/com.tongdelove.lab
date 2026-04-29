import { useEffect, useRef } from 'react'

export const useInterval = (callback: Function, time = 1000) => {
  const savedCallback = useRef<Function>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current?.()
    }
    const timer = setInterval(tick, time)
    return () => clearInterval(timer)
  }, [])
}
