import { useEffect, useMemo, useState } from 'react'
import type { ReactNode, ReactPortal } from 'react'
import { createPortal } from 'react-dom'
import useUpdateEffect from './useUpdateEffect'

const Prefix = 'portal'
let count = 0

export default function usePortal(node: ReactNode) {
  const [visible, togglePortal] = useState(false)
  const id = useMemo(() => {
    return `${Prefix}-${++count}`
  }, [])
  const [portal, setPortal] = useState<ReactPortal | null>(null)

  useEffect(() => {
    const modalRoot = document.createElement('div')
    modalRoot.id = id
    modalRoot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      visibility: hidden;
    `
    document.body.appendChild(modalRoot)

    return () => {
      document.body.removeChild(modalRoot)
    }
  }, [id])

  useUpdateEffect(() => {
    const modalRoot = document.getElementById(id) as HTMLDivElement | null
    if (!modalRoot) {
      return
    }
    modalRoot.style.visibility = visible ? 'visible' : 'hidden'
    setPortal(visible ? createPortal(node, modalRoot) : null)
  }, [visible, id])

  return {
    togglePortal,
    portal,
  }
}
