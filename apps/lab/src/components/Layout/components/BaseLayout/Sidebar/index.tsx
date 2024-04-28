import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  LucideIcon,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { Badge } from '@tongdelove/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@tongdelove/ui/breadcrumb'
import { Button } from '@tongdelove/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@tongdelove/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tongdelove/ui/dropdown-menu'
import { Input } from '@tongdelove/ui/input'
import { Pagination, PaginationContent, PaginationItem } from '@tongdelove/ui/pagination'
import { Progress } from '@tongdelove/ui/progress'
import { Separator } from '@tongdelove/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@tongdelove/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tongdelove/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tongdelove/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@tongdelove/ui/tooltip'
import { useTranslation } from '@/i18n'
import { RiHome2Line } from 'react-icons/ri'
import { IconType } from 'react-icons'
import { TbTools } from 'react-icons/tb'

const NavItem = ({
  isCollapsed,
  icon,
  activeIcon,
  active,
  title,
  href,
  onClick,
}: {
  isCollapsed: boolean
  icon: IconType
  activeIcon: IconType
  active: boolean
  title: string
  href?: string
  onClick?: () => void
}) => {
  const Icon = active ? activeIcon : icon

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <Link href={href} className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
            <Icon className="h-5 w-5" />
            <span className="sr-only">{title}</span>
          </Link>
        ) : (
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{title}</span>
          </div>
        )}
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  )
}

export const Sidebar = () => {
  let { pathname } = useRouter()
  const { t } = useTranslation()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Tongdelove Inc</span>
        </Link>

        <NavItem isCollapsed={false} icon={RiHome2Line} activeIcon={RiHome2Line} active={pathname === '/'} title={t('Home')} href="/"></NavItem>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Package className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip>

        <NavItem isCollapsed={false} icon={TbTools} activeIcon={TbTools} active={pathname === '/tools'} title={t('Tools')} href="/tools"></NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
