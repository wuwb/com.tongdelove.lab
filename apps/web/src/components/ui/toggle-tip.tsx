'use client'

import * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@tongdelove/ui/components/tooltip'
import { Button } from './button'
import { HiOutlineInformationCircle } from 'react-icons/hi'

export interface ToggleTipProps extends React.ComponentProps<typeof Tooltip> {
  content?: React.ReactNode
}

export const ToggleTip = ({ content, children, ...rest }: ToggleTipProps) => {
  return (
    <Tooltip {...rest}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

export const InfoTip = ({ children, ...rest }: Partial<ToggleTipProps>) => {
  return (
    <ToggleTip content={children} {...rest}>
      <Button variant="ghost" size="icon">
        <HiOutlineInformationCircle className="h-4 w-4" />
      </Button>
    </ToggleTip>
  )
}
