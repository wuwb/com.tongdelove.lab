import type { FC, ReactNode } from 'react'
// import { AdminSidebar } from './AdminSidebar';
import { NavbarNested } from './NavbarNested'
import { DoubleNavbar } from './DoubleNavbar'

export const AdminLayout: FC<{ children: ReactNode }> = props => {
  const { children } = props
  return (
    <div className="flex flex-row">
      {/* <AdminSidebar /> */}
      <DoubleNavbar />
      {/* <NavbarNested /> */}
      <main>{children}</main>
    </div>
  )
}
