import clsx from 'clsx'
import React, { PropsWithChildren, FC } from 'react'

interface PageWrapperProps extends PropsWithChildren {
  className: string
  style: string
}

export const PageWrapper: FC<PageWrapperProps> = ({
  className,
  style,
  children,
}) => {
  return (
    <div className={clsx('relative', className)} style={style}>
      {children}
    </div>
  )
}
