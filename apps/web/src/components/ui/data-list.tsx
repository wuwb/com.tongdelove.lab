'use client'

import * as React from 'react'
import { InfoTip } from './toggle-tip'

export interface DataListRootProps extends React.ComponentProps<'dl'> {}
export interface DataListItemProps extends React.ComponentProps<'div'> {
  label: React.ReactNode
  value: React.ReactNode
  info?: React.ReactNode
  grow?: boolean
}

export const DataListRoot = React.forwardRef<
  HTMLDListElement,
  DataListRootProps
>(function DataListRoot(props, ref) {
  const { className, ...rest } = props
  return <dl ref={ref} className={`space-y-4 ${className}`} {...rest} />
})

export const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  function DataListItem(props, ref) {
    const { label, info, value, children, grow, className, ...rest } = props
    return (
      <div
        ref={ref}
        className={`flex items-center gap-4 ${className}`}
        {...rest}
      >
        <dt
          className={`text-muted-foreground flex items-center gap-1 text-sm font-medium ${grow ? 'flex-1' : ''}`}
        >
          {label}
          {info && <InfoTip>{info}</InfoTip>}
        </dt>
        <dd className={`text-sm ${grow ? 'flex-1' : ''}`}>{value}</dd>
        {children}
      </div>
    )
  }
)
