import { FC } from 'react'
import { HeaderMegaMenu } from './Header'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: React.ReactNode
}

export const BaseLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <HeaderMegaMenu />
        {children}
      </div>
    </div>
  )
}
