import { AppContextProvider } from '@/contexts/AppContext'
import { TooltipProvider } from '@tongdelove/ui/tooltip'
import { Analytics } from '@vercel/analytics/react'
import { type AppType } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { trpc } from '@/utils/trpc'
import { Layout } from '@/components/Layout'
import React, { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { theme } from '../theme'
import '@/styles/globals.css'
import { Notifications } from '@mantine/notifications'

import { SSRHidden } from '@/components/Atom/SSRHidden'


type AppProvidersProps = {
  children: React.ReactNode
}

// Client-side cache, shared for the whole session of the user in the browser.

export const AppProviders = ({ children }: AppProvidersProps) => {

  return (
    <>
      <NextNProgress
        color="#fff"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={false}
      />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications />
        <ColorSchemeScript
          nonce="8IBTHwOdqNKAWeKl7plt8g=="
          defaultColorScheme="auto"
        />
        <TooltipProvider>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </TooltipProvider>
        
        {/* <PlausibleProvider domain="lab.printlake.com" trackOutboundLinks> */}
        {/* <ReactQueryClientProvider> */}
        {/* </ReactQueryClientProvider> */}
        {/* </PlausibleProvider> */}
      </MantineProvider>
      <SSRHidden>
        <Analytics />
        <SpeedInsights sampleRate={1} />
      </SSRHidden>
    </>
  )
}
