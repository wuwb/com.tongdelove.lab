import { MantineProvider } from '@mantine/core'
// import { cookies } from 'next/headers'
import { TRPCReactProvider } from '@/trpc/react'
// import AppContextProvider from '@/contexts/AppContext'
import { Layout } from '@/components/Layout'
import '@/styles/globals.css'
import { GoogleAnalytics } from '@/components/metrics/GoogleAnalytics'
import { MicrosoftClarity } from '@/components/metrics/MicrosoftClarity'
import { ThemeProvider, ThemeToggle } from "@tongdelove/ui/theme";
import { Toaster } from "@tongdelove/ui/toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

        {/* <AppContextProvider> */}
        <TRPCReactProvider >
        {/* <TRPCReactProvider cookies={cookies().toString()}> */}
          <MantineProvider>
            {/* <Layout> */}
            {children}
            {/* </Layout> */}
          </MantineProvider>
        </TRPCReactProvider>
        <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>

        {/* </AppContextProvider> */}
        <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID} />
        <MicrosoftClarity id={process.env.NEXT_PUBLIC_MC_ID} />

      </body>
    </html>
  )
}
