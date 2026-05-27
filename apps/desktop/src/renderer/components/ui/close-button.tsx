import * as React from 'react'
import { LuX } from 'react-icons/lu'
import { IconButton } from './icon-button'
import { cn } from '@/renderer/lib/utils'

export type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(props, ref) {
  const { className, ...rest } = props
  return (
    <IconButton
      variant="ghost"
      aria-label="Close"
      ref={ref}
      className={cn('h-6 w-6', className)}
      {...rest}
    >
      {props.children ?? <LuX className="h-4 w-4" />}
    </IconButton>
  )
})
