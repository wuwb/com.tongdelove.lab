import { FC } from 'react'
import { HeaderMegaMenu } from './Header'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: React.ReactNode
}

export const BaseLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar />
      <div className="flex flex-col pl-14">
        <HeaderMegaMenu />
        {children}
      </div>
    </div>
  )
}
