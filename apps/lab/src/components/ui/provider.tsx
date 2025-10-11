"use client"

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defaultSystem,
  ChakraProvider,
} from "@chakra-ui/react"

export function Provider(props: ColorModeProviderProps) {

  const config = defineConfig({
    preflight: false,
    cssVarsPrefix: "mi",
    globalCss: {
      "html, body": {
        margin: 0,
        padding: 0,
      },
    },
    theme: {
      tokens: {
        colors: {},
      },
    },
  })

  const system = createSystem(defaultConfig, config)

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
