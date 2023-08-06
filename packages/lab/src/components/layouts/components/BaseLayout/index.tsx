import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import WithSubnavigation from './Header'

type LayoutProps = {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="hidden sm:block">
        <DeskLayout>{children}</DeskLayout>
      </div>
      <div className="sm:hidden">
        <MobileLayout>{children}</MobileLayout>
      </div>
    </>
  )
}

const DeskLayout: React.FC<LayoutProps> = ({ children }) => {
  const { asPath } = useRouter()

  if (asPath.includes('/prompt')) {
    return <DeskPromptLayout>{children}</DeskPromptLayout>
  }

  return <DeskDefaultLayout>{children}</DeskDefaultLayout>
}

const MobileLayout: React.FC<LayoutProps> = ({ children }) => (
  <MobChatLayout>{children}</MobChatLayout>
)

const MobChatLayout: React.FC<LayoutProps> = ({ children }) => (
  <ChakraProvider>
    <main className="overflow-auto scrollbar-hide max-h-screen bg-[#1A1B1E] text-gray-300">
      {children}
    </main>
  </ChakraProvider>
)

const DeskHackathonLayout: React.FC<LayoutProps> = ({ children }) => (
  <ChakraProvider>
    <main className="overflow-auto scrollbar-hide max-h-screen">
      {children}
    </main>
  </ChakraProvider>
)

const DeskPromptLayout: React.FC<LayoutProps> = ({ children }) => (
  <ChakraProvider>
    <main className="subpixel-antialiased relative mx-auto flex min-h-screen h-screen overflow-hidden scroll-bar-hide bg-[#1A1B1E] text-gray-300">
      <div
        id="scrollableDiv"
        className="flex flex-col pt-4 w-full h-full overflow-hidden"
      >
        {children}
      </div>
    </main>
  </ChakraProvider>
)

const DeskCreateLayout: React.FC<LayoutProps> = ({ children }) => (
  <ChakraProvider>
    <main className="subpixel-antialiased relative mx-auto flex min-h-screen h-screen overflow-hidden scroll-bar-hide bg-[#1A1B1E] text-gray-300">
      <div className="w-full flex flex-row ">
        {children}
      </div>
    </main>
  </ChakraProvider>
)

const DeskDefaultLayout: React.FC<LayoutProps> = ({ children }) => (
  <ChakraProvider>
    <NextNProgress
      color="#fff"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={false}
    />
    <main className="subpixel-antialiased relative mx-auto flex min-h-screen h-screen overflow-hidden scroll-bar-hide justify-center">
      <div className="w-full flex flex-row ">
        <div
          id="scrollableDiv"
          className="flex flex-col w-full overflow-y-auto h-full dark-scroll-bar"
        >
          <WithSubnavigation />
          {children}
        </div>
      </div>
    </main>
  </ChakraProvider>
)

export default BaseLayout
