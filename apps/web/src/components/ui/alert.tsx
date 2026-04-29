'use client'

import * as React from 'react'
import {
  Alert as ShadAlert,
  AlertTitle,
  AlertDescription,
} from '@tongdelove/ui/components/alert'
import { CloseButton } from './close-button'

export interface AlertProps
  extends Omit<React.ComponentProps<typeof ShadAlert>, 'title'> {
  title?: React.ReactNode
  closable?: boolean
  onClose?: () => void
}

export const Alert = React.forwardRef<
  React.ElementRef<typeof ShadAlert>,
  AlertProps
>(function Alert(props, ref) {
  const { title, children, closable, onClose, ...rest } = props
  return (
    <ShadAlert ref={ref} {...rest}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children && <AlertDescription>{children}</AlertDescription>}
      {closable && (
        <button className="absolute top-2 right-2" onClick={onClose}>
          <CloseButton size="sm" />
        </button>
      )}
    </ShadAlert>
  )
})
