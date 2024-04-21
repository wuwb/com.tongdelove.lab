import { FC, createContext, useContext, useState, useEffect } from 'react'
import { LayoutContext } from './LayoutProvider'

export function useLayout() {
  return useContext(LayoutContext)
}
