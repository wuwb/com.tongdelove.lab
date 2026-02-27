import { Box, useColorMode } from '@chakra-ui/react'

interface SecondaryNavProps {
  children: React.ReactNode
}

export function SecondaryNav({ children }: SecondaryNavProps) {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Box bg={isDark ? 'gray.800' : 'gray.100'} borderRadius="md" p={3}>
      {children}
    </Box>
  )
}
