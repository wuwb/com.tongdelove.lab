'use client'

import * as React from 'react'
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@tongdelove/ui/components/tooltip'

export interface TooltipProps extends React.ComponentProps<typeof ShadTooltip> {
  content: React.ReactNode
  disabled?: boolean
}

export const Tooltip = ({
  children,
  content,
  disabled,
  ...rest
}: TooltipProps) => {
  if (disabled) return <>{children}</>
  return (
    <ShadTooltip {...rest}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </ShadTooltip>
  )
}

export { TooltipContent, TooltipTrigger }
