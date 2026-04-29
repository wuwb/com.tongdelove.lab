'use client'

import * as React from 'react'
import { Progress } from '@tongdelove/ui/components/progress'

export const ProgressRoot = Progress
export const ProgressBar = Progress

export const ProgressLabel = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`text-sm font-medium ${className || ''}`} {...props}>
    {children}
  </div>
)

export const ProgressValueText = ({
  className,
  value,
  ...props
}: React.ComponentProps<'span'> & { value?: number }) => (
  <span className={`text-sm font-medium ${className || ''}`} {...props}>
    {value}%
  </span>
)
