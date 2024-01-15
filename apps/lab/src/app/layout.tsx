import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import '@mantine/core/styles.css'
import '@/styles/globals.css'
import { cookies } from 'next/headers'
import { TRPCReactProvider } from '@/trpc/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          <MantineProvider>{children}</MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
