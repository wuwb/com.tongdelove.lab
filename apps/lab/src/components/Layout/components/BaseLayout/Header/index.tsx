import {
  Popover,
  PopoverTarget,
  PopoverDropdown,
  Stack,
  Flex,
  Group,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  TbCode,
  TbBook,
  TbCoin,
  TbChevronDown,
  TbBrandMcdonalds,
  TbX,
  TbChevronRight,
} from 'react-icons/tb'
import { useSession, signOut, signIn } from 'next-auth/react'
import Link from 'next/link'
import classes from './HeaderMegaMenu.module.css'
import Image from 'next/image'
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@tongdelove/ui/breadcrumb'
import { Button } from '@tongdelove/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tongdelove/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@tongdelove/ui/sheet'
import { useTranslation } from '@/i18n'

const mockdata = [
  {
    icon: TbCode,
    title: 'Open source',
    description: `This Pokémon’s cry is very loud and distracting`,
  },
  {
    icon: TbCoin,
    title: 'Free for everyone',
    description: `The fluid of Smeargle’s tail secretions changes`,
  },
  {
    icon: TbBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
]

export function HeaderMegaMenu() {
  const { t } = useTranslation()
  const theme = useMantineTheme()
  const { data: session } = useSession()

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)

  const handleClick = () => {
    if (session) {
      signOut()
    } else {
      signIn()
    }
  }

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.colors.blue[6]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ))

  return (
    <div className="border-soild flex h-14 items-center justify-end border-b">
      <header className="sticky top-0 z-30 flex h-[60px] items-center bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="shrink-0 sm:hidden"
            >
              <PanelLeft className="h-5 w-5" />
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
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full justify-end">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/images/avatars/3.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">账号设置</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  退出
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/images/avatars/8.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    {t('Sign up')}
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div onClick={() => signIn('github')}>
                      {t('Github 登录')}
                    </div>
                </DropdownMenuItem>
                  <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={() =>
                      signIn('credentials', {
                        email: 'bin2302@gmail.com',
                        password: '123456',
                      })
                    }
                  >
                      {t('Email 登录')}
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleClick}>
                      {session ? t('Sign out') : t('Sign in')}
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Collapse in={linksOpened}>{links}</Collapse>
          123
          <Divider my="sm" />
          {session ? (
            <div className="flex items-center space-x-3">
              <img
                className="h-12 w-12 rounded-full"
                src={session.user?.image ?? ''}
                alt="avator"
              />
              <Link href="/me">
                <a className="font-medium text-blue-600">
                  {session.user?.name}
                </a>
              </Link>
              <button
                className="rounded bg-blue-500 px-3 py-2 text-white"
                onClick={() => signOut()}
              >
                登出
              </button>
            </div>
          ) : (
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </div>
  )
}

export function WithSubnavigation() {
  const [isOpen, { toggle, open }] = useDisclosure(false)

  return (
    <Box>
      <Flex py={{ base: 2 }} px={{ base: 4 }} align="center">
        <Flex ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={toggle}
            ariaLabel="Toggle Navigation"
          >
            {open ? <TbX /> : <TbBrandMcdonalds />}
          </ActionIcon>
        </Flex>
        <Flex justify={{ base: 'center', md: 'start' }}>
          <Text>Logo</Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack justify="flex-end">
          <Button variant="link">Sign In</Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            color="white"
            bg="pink.400"
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover>
            <PopoverTarget>
              <Box p={2}>{navItem.label}</Box>
            </PopoverTarget>

            {navItem.children && (
              <PopoverDropdown p={4}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverDropdown>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box role="group" display="block" p={2}>
      <Stack align="center">
        <Box>
          <Text>{label}</Text>
          <Text>{subLabel}</Text>
        </Box>
        <Flex
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify="flex-end"
          align="center"
          flex={1}
        >
          <TbChevronRight />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const [isOpen, { toggle, open, close }] = useDisclosure(false)

  return (
    <Stack onClick={children && toggle}>
      <Box py={2}>
        <Text>{label}</Text>
        {children && <TbChevronDown />}
      </Box>

      <Collapse animateOpacity style={{ marginTop: '0!important' }}>
        <Stack mt={2} pl={4}>
          {children &&
            children.map((child) => (
              <Box key={child.label} py={2}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Inspiration',
    children: [
      {
        label: 'Explore Design Work',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'New & Noteworthy',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
  {
    label: '小工具',
    children: [
      {
        label: '聊天记录生成器',
        subLabel: '生成各种聊天软件的聊天记录',
        href: '#/tool/chat-log-generator',
      },
      {
        label: 'ETF 网格工具',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
]
