"use client"

import AppContextProvider from "@/contexts/AppContext"
import '@/styles/globals.css'
import './layout.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  )
}
