import { Grids } from '@/components/ETFGrid/Grids'
import { Settings } from '@/components/ETFGrid/Settings'
import { AppContext, initialState, reducer } from '@/server/store'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@tongdelove/ui/components/breadcrumbs'
import { Input } from '@tongdelove/ui/components/input'
import { Separator } from '@tongdelove/ui/components/separator'
import { useTranslation } from '@/i18n'

const App = () => {
  const { t } = useTranslation()
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <div className="box max-w-screen-3xl container mx-auto w-full max-w-[1680px]">
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="flex justify-between">
          <main className="w-5/7">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">首页</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/etf-grid">工具</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">金融类</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>网格工具</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="my-6 space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                {t('网格工具')}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  '为投资者精密计算买卖价格点位，依据市场波动智能生成网格计划，帮助把握震荡区间盈利机遇，兼容多平台使用，提升交易策略效率。'
                )}
              </p>
            </div>

            <Separator className="my-6" />

            <Settings />
            <Grids />
          </main>
          <aside className="w-2/7 grow">
            <div className="ml-4 space-y-3">
              <div>
                <Input
                  type="text"
                  value="https://lab.printlake.com/tool/etf-grid"
                  disabled
                />
              </div>
            </div>
          </aside>
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
