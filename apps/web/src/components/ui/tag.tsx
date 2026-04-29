'use client'

import * as React from 'react'
import { Badge } from '@tongdelove/ui/components/badge'
import { X } from 'lucide-react'

export interface TagProps extends React.ComponentProps<typeof Badge> {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  onClose?: VoidFunction
  closable?: boolean
}

export const Tag = React.forwardRef<React.ElementRef<typeof Badge>, TagProps>(
  function Tag(props, ref) {
    const {
      startElement,
      endElement,
      onClose,
      closable = !!onClose,
      children,
      className,
      ...rest
    } = props

    return (
      <Badge ref={ref} className={className} {...rest}>
        {startElement && <span className="mr-1">{startElement}</span>}
        {children}
        {endElement && <span className="ml-1">{endElement}</span>}
        {closable && (
          <button
            onClick={onClose}
            className="ml-1 rounded-full p-0.5 transition-colors hover:bg-white/20"
          >
            <X className="size-3" />
          </button>
        )}
      </Badge>
    )
  }
)
