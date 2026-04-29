'use client'

import * as React from 'react'

type StatusValue = 'success' | 'error' | 'warning' | 'info'

export interface StatusProps extends React.ComponentProps<'div'> {
  value?: StatusValue
}

const statusMap: Record<StatusValue, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-orange-500',
  info: 'bg-blue-500',
}

export const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  function Status(props, ref) {
    const { children, value = 'info', className, ...rest } = props
    const colorClass = statusMap[value]
    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 text-sm ${className}`}
        {...rest}
      >
        <span className={`h-2 w-2 rounded-full ${colorClass}`} />
        {children}
      </div>
    )
  }
)
