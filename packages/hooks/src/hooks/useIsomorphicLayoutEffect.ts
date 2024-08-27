import { useLayoutEffect, useEffect } from 'react'

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
