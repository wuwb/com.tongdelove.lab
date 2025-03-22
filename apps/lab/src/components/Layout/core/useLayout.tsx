import { useContext } from 'react'
import { LayoutContext } from './LayoutProvider'

export function useLayout() {
  return useContext(LayoutContext)
}
