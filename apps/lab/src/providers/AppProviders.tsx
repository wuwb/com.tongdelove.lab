import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { FC, PropsWithChildren } from 'react'
import { AppContextProvider } from '@/contexts/AppContext'
import { TooltipProvider } from '@tongdelove/ui/tooltip'

type Props = PropsWithChildren<{
  /**
   * next-auth session
   */
  session?: Session | null
}>

// Client-side cache, shared for the whole session of the user in the browser.

export const AppProviders: FC<Props> = (props) => {
  const { children, session } = props

  return (
    <SessionProvider
      session={session}
      // refetchInterval={0}
      // refetchOnWindowFocus={false}
    >
      {/* <SessionProvider session={session} refetchInterval={0}> */}
      {/* <PlausibleProvider domain="lab.printlake.com" trackOutboundLinks> */}
      {/* <ReactQueryClientProvider> */}

      <TooltipProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </TooltipProvider>

      {/* </ReactQueryClientProvider> */}
      {/* </PlausibleProvider> */}
      {/* </SessionProvider> */}
    </SessionProvider>
  )
}
