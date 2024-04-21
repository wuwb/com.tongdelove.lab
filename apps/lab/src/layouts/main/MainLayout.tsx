import type { FC, ReactNode } from 'react'
import { MainFooter } from './MainFooter'

export const MainLayout: FC<{ children: ReactNode }> = props => {
  const { children } = props
  return (
    <div className="flex flex-col">
      <main>{children}</main>
    </div>
  )
}
