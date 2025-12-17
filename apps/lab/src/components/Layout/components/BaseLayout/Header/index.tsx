import {
  TbCode,
  TbBook,
  TbCoin,
} from 'react-icons/tb'
import { signOut, signIn } from 'next-auth/react'
import Link from 'next/link'
import {
  Home,
  Package2,
  PanelLeft,
} from 'lucide-react'
import { Button } from '@tongdelove/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tongdelove/ui/components/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@tongdelove/ui/components/sheet'
import { useTranslation } from '@/i18n'
import { useSession } from 'next-auth/react'
import {
  RiColorFilterLine,
  RiEmojiStickerLine,
  RiMoonLine,
  RiSunLine,
  RiCoreosLine,
} from 'react-icons/ri'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { BuyMeACoffee } from './BuyMeACoffee'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function HeaderMegaMenu() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }

  return (
    <div className="flex h-14 items-center justify-end border-b">
      <header className="sticky top-0 z-30 flex h-[60px] w-full items-center justify-between bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center justify-center px-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="shrink-0 sm:hidden"
              >
                <PanelLeft className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Tongdelove Inc</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  {t('首页')}
                </Link>

                <div>
                  <Link
                    href="/sticker"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <RiEmojiStickerLine className="h-5 w-5" />
                    {t('贴纸生成器')}
                  </Link>
                </div>
                <Link
                  href="/logo-gen"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <RiCoreosLine className="h-5 w-5" />
                  {t('标识生成器')}
                </Link>
                <Link
                  href="/tool/color"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <RiColorFilterLine />
                  {t('中国传统色')}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex gap-2">
          <div className="flex w-full items-center justify-end gap-1">
            <BuyMeACoffee />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 overflow-hidden rounded-full"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={session.user.image ?? ''}
                      alt="avator"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/sticker/my">{t('我的贴纸')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile">{t('账号设置')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer"
                  >
                    {t('退出')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="overflow-hidden rounded-full"
                  >
                    {t('登录')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>{t('Sign up')}</DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => signIn('github')}>
                      {t('Github 登录')}
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={() => signIn('google')}>
                      {t('Google 登录')}
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button onClick={handleClick}>
                      {session ? t('Sign out') : t('Sign in')}
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link href="https://txc.qq.com/products/430271">
              <Button
                variant="outline"
                className="overflow-hidden rounded-full"
              >
                {t('反馈')}
              </Button>
            </Link>
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Toggle color scheme"
            >
              {mounted && theme === 'dark' ? (
                <RiMoonLine size="1.2rem" />
              ) : (
                <RiSunLine size="1.2rem" />
              )}
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
