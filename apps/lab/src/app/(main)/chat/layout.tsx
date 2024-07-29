import { AppContextProvider } from '@/contexts/AppContext'
import '@/styles/globals.css'
import './layout.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppContextProvider>{children}</AppContextProvider>
}
