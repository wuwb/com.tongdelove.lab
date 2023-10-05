import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { FC, PropsWithChildren } from 'react';
// import { ReactQueryClientProvider } from './ReactQueryClientProvider';
// import PlausibleProvider from 'next-plausible';
import AppContextProvider from '@/contexts/AppContext';

type Props = PropsWithChildren<{
  /**
   * next-auth session
   */
  session?: Session | null;
}>;

export const AppProviders: FC<Props> = (props) => {
  const { children, session } = props;
  return (
    <>
      {/* <SessionProvider session={session} refetchInterval={0}> */}
      {/* <PlausibleProvider domain="lab.printlake.com" trackOutboundLinks> */}
      {/* <ReactQueryClientProvider> */}
      <AppContextProvider>
        {children}
      </AppContextProvider>
      {/* </ReactQueryClientProvider> */}
      {/* </PlausibleProvider> */}
      {/* </SessionProvider> */}
    </>
  )
}
