import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n'
import {
  RiCoreosFill,
  RiCoreosLine,
  RiEmojiStickerFill,
  RiEmojiStickerLine,
  RiHome2Line,
} from 'react-icons/ri'
import { IconType } from 'react-icons'
import clsx from 'clsx'
import { ImLab } from 'react-icons/im'
import styles from './Sidebar.module.css'
import { UnstyledButton, Button, Tooltip, Title, rem } from '@mantine/core'
import {
  RiFileHistoryLine,
  RiFileHistoryFill,
  RiHome2Fill,
  RiToolsLine,
  RiToolsFill,
  RiChat3Line,
  RiChat3Fill,
  RiColorFilterLine,
  RiColorFilterFill,
} from 'react-icons/ri'

export const NavItem = ({
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
    <Tooltip label={title} position="right-start">
      {href ? (
        <UnstyledButton
          component={Link}
          href={href}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
            {
              'bg-accent text-foreground': active,
              'text-muted-foreground': !active,
            }
          )}
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

export const GlobalSidebar = () => {
  let { pathname } = useRouter()
  const { t } = useTranslation()

  return (
    <aside
      className={clsx(
        'sticky left-0 top-0 flex h-screen w-full flex-col gap-2.5 p-2.5',
        styles.aside,
        'border-r border-gray-200 dark:border-gray-100'
      )}
    >
      <nav className={clsx('flex flex-col items-center gap-4 px-2 sm:py-5')}>
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <ImLab className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">{t('Tongdelove Inc')}</span>
        </Link>

        <NavItem
          isCollapsed={false}
          icon={RiHome2Line}
          activeIcon={RiHome2Fill}
          active={pathname === '/'}
          title={t('Home')}
          href="/"
        ></NavItem>

        {/* <NavItem
          isCollapsed={false}
          icon={RiChat3Line}
          activeIcon={RiChat3Fill}
          active={pathname === '/chat'}
          title={t('Chat')}
          href="/chat"
        ></NavItem> */}

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
        <NavItem
          isCollapsed={false}
          icon={RiEmojiStickerLine}
          activeIcon={RiEmojiStickerFill}
          active={pathname === '/sticker'}
          title={t('贴纸生成器')}
          href="/sticker"
        ></NavItem>
        <NavItem
          isCollapsed={false}
          icon={RiCoreosLine}
          activeIcon={RiCoreosFill}
          active={pathname === '/logo'}
          title={t('LOGO 生成器')}
          href="/logo-gen"
        ></NavItem>
        <NavItem
          isCollapsed={false}
          icon={RiColorFilterLine}
          activeIcon={RiColorFilterFill}
          active={pathname === '/tool/color'}
          title={t('中国传统色')}
          href="/tool/color"
        ></NavItem>
        <NavItem
          isCollapsed={false}
          icon={RiToolsLine}
          activeIcon={RiToolsFill}
          active={pathname === '/tool'}
          title={t('Tool')}
          href="/tool"
        ></NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem
          isCollapsed={false}
          icon={RiFileHistoryLine}
          activeIcon={RiFileHistoryFill}
          active={pathname === '/changelog'}
          title={t('修改记录')}
          href="/changelog"
        ></NavItem>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip> */}
      </nav>
    </aside>
  )
}
