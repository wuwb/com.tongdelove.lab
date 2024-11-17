import { HeaderMegaMenu } from './Header'
import { GoTopButton } from '@/components/Layout/GoTopButton'
import { GlobalSidebar } from './GlobalSidebar'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  hasHeader?: boolean
  hasSidebar?: boolean
  children: React.ReactNode
}

export const BaseLayout = ({ 
  hasHeader = false, 
  hasSidebar = false, 
  children 
}: LayoutProps) => {
  return (
    <div className="flex h-full w-full">
      <div className="hidden transition-all duration-300 ease-in-out lg:block">
        <GlobalSidebar />
      </div>
      <div className="flex-1 overflow-x-hidden">
        {hasHeader && <HeaderMegaMenu />}
        <div className="flex flex-row">
          {children}
          {hasSidebar && <Sidebar />}
        </div>
      </div>
      <GoTopButton />
    </div>
  )
}
