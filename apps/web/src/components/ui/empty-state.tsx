'use client'

import * as React from 'react'

export interface EmptyStateProps extends React.ComponentProps<'div'> {
  title: string
  description?: string
  icon?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon, children, className, ...rest } = props
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
        {...rest}
      >
        {icon && <div className="text-muted-foreground mb-4">{icon}</div>}
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        )}
        {children}
      </div>
    )
  }
)
