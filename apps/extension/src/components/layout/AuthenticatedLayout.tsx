import { Outlet } from '@tanstack/react-router'
import { getCookie } from '@/lib/cookies'
import { cn } from '@tongdelove/ui/lib/utils'
import { LayoutProvider } from '@/context/LayoutProvider'
// import { SearchProvider } from '@/context/search-provider'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@tongdelove/ui/components/sidebar'
import { AppSidebar } from '@/components/layout/AppSiderbar'
import { SkipToMain } from '@/components/SkipToMain'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    // <SearchProvider>
    <LayoutProvider>
      <SidebarProvider>
        {/* <div className="hidden text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 flex w-full min-w-0 flex-col gap-1 relative flex w-full min-w-0 flex-col p-2 flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"></div> */}
        <SkipToMain />
        <AppSidebar />
        <SidebarInset
          className={cn(
            // Set content container, so we can use container queries
            '@container/content',

            // If layout is fixed, set the height
            // to 100svh to prevent overflow
            'h-full',

            // If layout is fixed and sidebar is inset,
            // set the height to 100svh - spacing (total margins) to prevent overflow
            'peer-data-[variant=inset]:min-h-[calc(100svh-(var(--spacing)*4))]',
            'overflow-y-auto', // 修复滚动
            'bg-background',   // 可选：保持背景一致
            'flex flex-col'
          )}
        >
          <SidebarTrigger />
          {children ?? <Outlet />}
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
    // </SearchProvider>
  )
}
