import type { FC, ReactNode } from 'react';
// import { AdminSidebar } from '@/layouts/admin/AdminSidebar';
import { NavbarNested } from '@/layouts/admin/NavbarNested';
import { DoubleNavbar } from '@/layouts/admin/DoubleNavbar';



export const AdminLayout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-row">
      {/* <AdminSidebar /> */}
      <DoubleNavbar />
      {/* <NavbarNested /> */}
      <main>{children}</main>
    </div>
  );
};
