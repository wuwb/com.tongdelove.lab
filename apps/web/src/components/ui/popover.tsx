'use client'

import * as React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tongdelove/ui/components/popover'
import { CloseButton } from './close-button'

export { Popover as PopoverRoot, PopoverContent, PopoverTrigger }

export const PopoverCloseTrigger = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentProps<'button'>
>(function PopoverCloseTrigger(props, ref) {
  return (
    <button ref={ref} className="absolute top-1 right-1" {...props}>
      <CloseButton size="sm" />
    </button>
  )
})

export const PopoverTitle = ({
  className,
  ...props
}: React.ComponentProps<'h4'>) => (
  <h4 className={`text-sm font-semibold ${className || ''}`} {...props} />
)

export const PopoverDescription = ({
  className,
  ...props
}: React.ComponentProps<'p'>) => (
  <p
    className={`text-muted-foreground text-sm ${className || ''}`}
    {...props}
  />
)

export const PopoverHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`flex flex-col gap-1.5 ${className || ''}`} {...props} />
)

export const PopoverBody = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`flex flex-col gap-4 ${className || ''}`} {...props} />
)

export const PopoverFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={`flex items-center justify-end gap-2 ${className || ''}`}
    {...props}
  />
)
