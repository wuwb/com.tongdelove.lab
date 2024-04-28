import { FC } from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export const FullLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
    </div>
  )
}
