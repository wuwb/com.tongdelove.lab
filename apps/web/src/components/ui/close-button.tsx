'use client'

import * as React from 'react'
import { Button } from '@tongdelove/ui/components/button'
import { X } from 'lucide-react'

export interface CloseButtonProps extends React.ComponentProps<typeof Button> {}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const { children, variant = 'ghost', size = 'icon', ...rest } = props
  return (
    <Button variant={variant} size={size} ref={ref} {...rest}>
      {children ?? <X className="size-4" />}
    </Button>
  )
})
