import { Sidebar } from './Sidebar'
import { HeaderMegaMenu } from './Header'
import { GoTopButton } from '@/components/Layout/GoTopButton'

type LayoutProps = {
  hasHeader?: boolean
  children: React.ReactNode
}

export const BaseLayout = ({ hasHeader = false, children }: LayoutProps) => {
  return (
    <div className="flex h-full w-full">
      <div className="hidden transition-all duration-300 ease-in-out lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-x-hidden">
        {hasHeader && <HeaderMegaMenu />}
        {children}
      </div>
      <GoTopButton />
    </div>
  )
}
