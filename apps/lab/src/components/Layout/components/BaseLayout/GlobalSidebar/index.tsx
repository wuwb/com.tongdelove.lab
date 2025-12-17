import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n'
import {
  RiCoreosFill,
  RiCoreosLine,
  RiEmojiStickerFill,
  RiEmojiStickerLine,
  RiHome2Line,
  RiFileHistoryLine,
  RiFileHistoryFill,
  RiHome2Fill,
  RiToolsLine,
  RiToolsFill,
  RiColorFilterLine,
  RiColorFilterFill,
} from 'react-icons/ri'
import { IconType } from 'react-icons'
import clsx from 'clsx'
import { ImLab } from 'react-icons/im'
import { Button } from '@tongdelove/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@tongdelove/ui/components/tooltip'

export const NavItem = ({
  icon,
  activeIcon,
  active,
  title,
  href,
  onClick,
}: {
  icon: IconType
  activeIcon: IconType
  active: boolean
  title: string
  href?: string
  onClick?: () => void
}) => {
  const Icon = active ? activeIcon : icon

  const buttonContent = (
    <Button
      variant={active ? 'secondary' : 'ghost'}
      size="icon"
      className={clsx(
        'h-9 w-9 md:h-8 md:w-8 transition-colors',
        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      )}
      onClick={!href ? onClick : undefined}
    >
      <Icon className="h-5 w-5" />
      <span className="sr-only">{title}</span>
    </Button>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <Link href={href} onClick={onClick}>
            {buttonContent}
          </Link>
        ) : (
          buttonContent
        )}
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const GlobalSidebar = () => {
  let { pathname } = useRouter()
  const { t } = useTranslation()

  return (
    <aside
      className={clsx(
        'sticky left-0 top-0 flex h-screen w-14 flex-col gap-4 border-r bg-background p-2 transition-[width]',
        'lg:w-[60px]' // Fixed width for sidebar
      )}
    >
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-2">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:h-8 md:w-8 mb-2"
            aria-label={t('Tongdelove Inc')}
          >
            <ImLab className="h-4 w-4 transition-all group-hover:scale-110" />
          </Link>

          <NavItem
            icon={RiHome2Line}
            activeIcon={RiHome2Fill}
            active={pathname === '/'}
            title={t('Home')}
            href="/"
          />

          <NavItem
            icon={RiEmojiStickerLine}
            activeIcon={RiEmojiStickerFill}
            active={pathname.startsWith('/sticker')}
            title={t('贴纸生成器')}
            href="/sticker"
          />
          <NavItem
            icon={RiCoreosLine}
            activeIcon={RiCoreosFill}
            active={pathname.startsWith('/logo-gen')}
            title={t('LOGO 生成器')}
            href="/logo-gen"
          />
          <NavItem
            icon={RiColorFilterLine}
            activeIcon={RiColorFilterFill}
            active={pathname.startsWith('/tool/color')}
            title={t('中国传统色')}
            href="/tool/color"
          />
          <NavItem
            icon={RiToolsLine}
            activeIcon={RiToolsFill}
            active={pathname === '/tool'}
            title={t('Tool')}
            href="/tool"
          />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-2">
          <NavItem
            icon={RiFileHistoryLine}
            activeIcon={RiFileHistoryFill}
            active={pathname === '/changelog'}
            title={t('修改记录')}
            href="/changelog"
          />
        </nav>
      </TooltipProvider>
    </aside>
  )
}
