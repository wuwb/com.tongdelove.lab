'use client'

import { AppContextProvider } from '@/contexts/AppContext'
import { TooltipProvider } from '@tongdelove/ui/components/tooltip'
import { Analytics } from '@vercel/analytics/react'
import React, { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'
import { Toaster } from '@tongdelove/ui/components/sonner'
import { SSRHidden } from '@/components/Atom/SSRHidden'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Providers } from '@/components/providers'
import '@/styles/globals.css'

type AppProvidersProps = {
  children: React.ReactNode
}

const stripePromise = loadStripe(
  'pk_test_51PxVobHVzRJLjT1QYM385EGjK3lJDRPF5wFfIkjs3FSiW7zTiU6T7jCLmFLkAKOZZWsEuUk6iM1OUydPrZuJPO7o00RXLKrOct'
)

export const AppProviders = ({ children }: AppProvidersProps) => {
  const options = {}

  return (
    <>
      <NextNProgress
        color="#fff"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={false}
      />
      <Providers>
        <TooltipProvider>
          <Elements stripe={stripePromise} options={options}>
            <AppContextProvider>{children}</AppContextProvider>
          </Elements>
        </TooltipProvider>
      </Providers>
      <SSRHidden>
        <Analytics />
        <SpeedInsights sampleRate={1} />
      </SSRHidden>
    </>
  )
}
