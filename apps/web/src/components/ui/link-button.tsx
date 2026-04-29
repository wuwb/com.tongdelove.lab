'use client'

import * as React from 'react'
import { cn } from '@tongdelove/ui/lib/utils'
import { buttonVariants } from '@tongdelove/ui/components/button'

export interface LinkButtonProps extends React.ComponentProps<'a'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton(props, ref) {
    const { variant = 'default', size = 'default', className, ...rest } = props
    return (
      <a
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...rest}
      />
    )
  }
)
