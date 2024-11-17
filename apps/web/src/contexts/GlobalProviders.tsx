import React from 'react'
// import { GrowthBookProvider } from '@growthbook/growthbook-react'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { Analytics } from '@vercel/analytics/react'
// import { AWSWAFCaptchaModal } from '@/components/AWSWAFCaptchaModal'
import NextNProgress from 'nextjs-progressbar'
// import { gb } from '@/components/Experiment/GrowthBook'
// import { GradientIconDef } from '@flowgpt/design/components/Icons/GradientIcon'
import { Provider } from '@/components/ui/provider'

export const GlobalProviders = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <Provider>
    <NextNProgress
      color="rgb(156, 163, 175, 0.9)"
      startPosition={0.3}
      stopDelayMs={200}
      height={1}
      showOnShallow={false}
      options={{ showSpinner: false }}
    />
    {/* 
    <AWSWAFCaptchaModal />
    <GradientIconDef />
    <GrowthBookProvider growthbook={gb}> */}
    {children}
    {/* <ReactQueryDevtools initialIsOpen={false} />
      <Analytics />
    </GrowthBookProvider> */}
  </Provider>
)
