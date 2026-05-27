'use client'

import * as React from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
}

export type ColorMode = 'light' | 'dark'

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: (resolvedTheme as ColorMode) || 'light',
    setColorMode: setTheme as (colorMode: ColorMode) => void,
    toggleColorMode
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
}
