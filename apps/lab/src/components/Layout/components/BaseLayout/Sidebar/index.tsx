import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n'
import { RiHome2Line } from 'react-icons/ri'
import { IconType } from 'react-icons'
import { TbTools } from 'react-icons/tb'
import clsx from 'clsx'
import { RiChat3Line, RiChat3Fill } from 'react-icons/ri'
import { ImLab } from 'react-icons/im'
import styles from './Sidebar.module.css'
import { UnstyledButton, Button, Tooltip, Title, rem } from '@mantine/core';

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
    <Tooltip
      label={title}
      position="right-start"
    >
      {href ? (
        <UnstyledButton
          as={Link}
          href={href}
          className={clsx('flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8', {
            'bg-accent text-foreground': active,
            'text-muted-foreground': !active,
          })}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{title}</span>
        </UnstyledButton>
      ) : (
          <UnstyledButton
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
            <span className="sr-only">{title}</span>
        </UnstyledButton>
      )}
    </Tooltip>
  )
}

export const Sidebar = () => {
  let { pathname } = useRouter()
  const { t } = useTranslation()

  return (
    <aside className={clsx('fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex', styles.aside)}>
      <nav className={clsx("flex flex-col items-center gap-4 px-2 sm:py-5")}>
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <ImLab className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Tongdelove Inc</span>
        </Link>

        <NavItem isCollapsed={false} icon={RiHome2Line} activeIcon={RiHome2Line} active={pathname === '/'} title={t('Home')} href="/"></NavItem>

        <NavItem isCollapsed={false} icon={RiChat3Line} activeIcon={RiChat3Fill} active={pathname === '/chat'} title={t('对话')} href="/chat"></NavItem>

        {/* <Tooltip>
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
        </Tooltip> */}

        {/* <NavItem isCollapsed={false} icon={LineChart} activeIcon={LineChart} active={pathname === '/analytics'} title={t('Analytics')} href="/analytics"></NavItem> */}
        <NavItem isCollapsed={false} icon={TbTools} activeIcon={TbTools} active={pathname === '/tool'} title={t('Tool')} href="/tool"></NavItem>
      </nav>
      {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav> */}
    </aside>
  )
}
