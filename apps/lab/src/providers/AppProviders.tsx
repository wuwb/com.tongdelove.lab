import { CacheProvider, type EmotionCache } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { FC, PropsWithChildren } from 'react';

import { createEmotionCache } from '@/lib/emotion';
import { muiTheme } from '@/themes/mui/mui.theme';
import { ReactQueryClientProvider } from './ReactQueryClientProvider';
// import { ReactQueryClientProvider } from './ReactQueryClientProvider';
// import PlausibleProvider from 'next-plausible';
import AppContextProvider from '@/contexts/AppContext';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';



type Props = PropsWithChildren<{
  /**
   * next-auth session
   */
  session?: Session | null;
  /**
   * Optional emotion/cache to use
   */
  emotionCache?: EmotionCache;
}>;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const AppProviders: FC<Props> = (props) => {
  const { children, session, emotionCache = clientSideEmotionCache } = props;
  return (
    <SessionProvider session={session} refetchInterval={0}>
     {/* <SessionProvider session={session} refetchInterval={0}> */}
      {/* <PlausibleProvider domain="lab.printlake.com" trackOutboundLinks> */}
      {/* <ReactQueryClientProvider> */}
      <MantineProvider theme={theme}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </MantineProvider>

      {/* </ReactQueryClientProvider> */}
      {/* </PlausibleProvider> */}
      {/* </SessionProvider> */}
      <CacheProvider value={emotionCache}>
        <MuiThemeProvider theme={muiTheme}>
          {/* Mui CssBaseline disabled in this example as tailwind provides its own */}
          {/* <CssBaseline /> */}
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </MuiThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};
