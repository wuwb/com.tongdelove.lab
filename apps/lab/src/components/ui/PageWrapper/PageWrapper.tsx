import clsx from 'clsx'
import React from 'react'

interface PageWrapperProps {
  className: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const PageWrapper = ({
  className,
  style,
  children,
}: PageWrapperProps) => {
  return (
    <div className={clsx('relative', className)} style={style}>
      {children}
    </div>
  )
}
