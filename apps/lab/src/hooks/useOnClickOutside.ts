import { RefObject, MutableRefObject, useEffect, useRef } from 'react'

export function useOnClickOutside<T extends HTMLElement>(node: RefObject<T | undefined>, handler: undefined | (() => void), keyBoardEvents = false): void {
  const handlerRef = useRef<undefined | (() => void)>(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | KeyboardEvent): void => {
      // Do nothing if clicking ref's element or descendent elements
      if (!node.current || node.current?.contains(event.target as Node)) {
        return
      }
      if (handlerRef.current) handlerRef.current()
    }

    document.addEventListener('mousedown', listener)

    if (keyBoardEvents) {
      document.addEventListener('touchstart', listener)
      document.addEventListener('keyup', listener)
    }
    return () => {
      document.removeEventListener('mousedown', listener)
      if (keyBoardEvents) {
        document.removeEventListener('touchstart', listener)
        document.removeEventListener('keyup', listener)
      }
    }
  }, [node, handler, keyBoardEvents])
}
