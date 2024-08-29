import { HeaderMegaMenu } from './Header'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <Sidebar />
      <div className="md:pl-14">{children}</div>
    </div>
  )
}
