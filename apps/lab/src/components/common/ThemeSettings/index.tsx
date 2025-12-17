'use client'

import { FC, useEffect, useState } from 'react'
import {
  TbChecks,
  TbCubeUnfolded,
  TbSettings, // 替换 ActionIcon 里的 Customize 文字，通常用图标更合适，或者保留文字
} from 'react-icons/tb'
import { useTranslation } from '@/i18n'
import { Link } from '@tongdelove/ui/Link' // 假设这是你的 Link 组件

import { Button } from '@tongdelove/ui/components/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tongdelove/ui/components/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@tongdelove/ui/components/tooltip'
import { Separator } from '@tongdelove/ui/components/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tongdelove/ui/components/dropdown-menu'
import { cn } from '@/lib/utils'

const ThemePreviewBox = ({
  isActive,
  onClick,
  primaryColor,
  secondaryColor,
  tooltip,
}: {
  isActive: boolean
  onClick: () => void
  primaryColor: string
  secondaryColor: string
  tooltip: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'relative cursor-pointer overflow-hidden rounded-md border-2 transition-all hover:opacity-90 w-12 h-12 shadow-sm',
              isActive ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'
            )}
            onClick={onClick}
          >
            {isActive && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 text-white">
                <TbChecks className="h-5 w-5 drop-shadow-md" />
              </div>
            )}
            <div className="flex h-full w-full">
              <div className={cn('h-full w-1/2', primaryColor)} />
              <div className={cn('h-full w-1/2', secondaryColor)} />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const ThemeSettings: FC = () => {
  const { t } = useTranslation()

  // 状态管理
  const [theme, setTheme] = useState('PureLightTheme')

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme'
    setTheme(curThemeName)
  }, [])

  const changeTheme = (newTheme: string): void => {
    setTheme(newTheme)
    window.localStorage.setItem('appTheme', newTheme)
    // 这里通常需要调用一个 context 方法来实际应用主题
    // window.location.reload() // 或者刷新页面如果需要
  }

  return (
    <div>
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  {/* 如果你想要图标 */}
                  <TbSettings className="h-5 w-5" />
                  <span className="sr-only">{t('Customize')}</span>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('Theme Settings')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent
          align="end"
          side="bottom"
          className="w-80 p-4"
          onOpenAutoFocus={(e) => e.preventDefault()} // 防止自动聚焦
        >
          {/* Layout Blueprints Section */}
          <div className="mb-4 flex flex-col gap-2">
            <h4 className="text-center text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Layout Blueprints
            </h4>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="w-full justify-between">
                  Choose layout
                  <TbCubeUnfolded className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="center">
                {[
                  { label: 'Extended Sidebar', href: '/dashboards/reports' },
                  { label: 'Accent Header', href: '/blueprints/accent-header/dashboards/reports' },
                  { label: 'Accent Sidebar', href: '/blueprints/accent-sidebar/dashboards/reports' },
                  { label: 'Boxed Sidebar', href: '/blueprints/boxed-sidebar/dashboards/reports' },
                  { label: 'Collapsed Sidebar', href: '/blueprints/collapsed-sidebar/dashboards/reports' },
                  { label: 'Bottom Navigation', href: '/blueprints/bottom-navigation/dashboards/reports' },
                  { label: 'Top Navigation', href: '/blueprints/top-navigation/dashboards/reports' },
                ].map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full font-semibold cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator className="my-4" />

          {/* Color Schemes Section */}
          <div className="flex flex-row gap-4">
            {/* Light Color Schemes */}
            <div className="flex flex-1 flex-col items-center gap-2">
              <h4 className="mb-2 text-center text-xs font-bold uppercase text-muted-foreground">
                Light Schemes
              </h4>
              
              <div className="flex flex-col gap-3">
                <ThemePreviewBox
                  tooltip="Test Theme"
                  isActive={theme === 'TestTheme'}
                  onClick={() => changeTheme('TestTheme')}
                  primaryColor="bg-blue-500" // 用 Tailwind 颜色类替换原来的 CSS 类
                  secondaryColor="bg-blue-200"
                />
                <ThemePreviewBox
                  tooltip="Pure Light"
                  isActive={theme === 'PureLightTheme'}
                  onClick={() => changeTheme('PureLightTheme')}
                  primaryColor="bg-slate-100"
                  secondaryColor="bg-white"
                />
                <ThemePreviewBox
                  tooltip="Grey Goose"
                  isActive={theme === 'GreyGooseTheme'}
                  onClick={() => changeTheme('GreyGooseTheme')}
                  primaryColor="bg-gray-400"
                  secondaryColor="bg-gray-200"
                />
                <ThemePreviewBox
                  tooltip="Purple Flow"
                  isActive={theme === 'PurpleFlowTheme'}
                  onClick={() => changeTheme('PurpleFlowTheme')}
                  primaryColor="bg-purple-600"
                  secondaryColor="bg-purple-300"
                />
              </div>
            </div>

            {/* Vertical Separator */}
            <Separator orientation="vertical" className="h-auto" />

            {/* Dark Color Schemes */}
            <div className="flex flex-1 flex-col items-center gap-2">
              <h4 className="mb-2 text-center text-xs font-bold uppercase text-muted-foreground">
                Dark Schemes
              </h4>
              
              <div className="flex flex-col gap-3">
                <ThemePreviewBox
                  tooltip="Nebula Fighter"
                  isActive={theme === 'NebulaFighterTheme'}
                  onClick={() => changeTheme('NebulaFighterTheme')}
                  primaryColor="bg-slate-900"
                  secondaryColor="bg-slate-800"
                />
                <ThemePreviewBox
                  tooltip="Green Fields"
                  isActive={theme === 'GreenFieldsTheme'}
                  onClick={() => changeTheme('GreenFieldsTheme')}
                  primaryColor="bg-green-900"
                  secondaryColor="bg-green-700"
                />
                <ThemePreviewBox
                  tooltip="Dark Spaces"
                  isActive={theme === 'DarkSpacesTheme'}
                  onClick={() => changeTheme('DarkSpacesTheme')}
                  primaryColor="bg-black"
                  secondaryColor="bg-gray-800"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
