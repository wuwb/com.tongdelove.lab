import { MantineProvider } from '@mantine/core'
import { cookies } from 'next/headers'
// import { TRPCReactProvider } from '@/trpc/react'
// import AppContextProvider from '@/contexts/AppContext'
import { Layout } from '@/components/Layout'
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <AppContextProvider> */}
        {/* <TRPCReactProvider cookies={cookies().toString()}> */}
        <MantineProvider>
          {/* <Layout> */}
          {children}
          {/* </Layout> */}
        </MantineProvider>
        {/* </TRPCReactProvider> */}
        {/* </AppContextProvider> */}
      </body>
    </html>
  )
}
