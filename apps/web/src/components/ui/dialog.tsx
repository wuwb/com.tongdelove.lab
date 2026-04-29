'use client'

import * as React from 'react'
import * as ShadDialog from '@tongdelove/ui/components/dialog'

export const Dialog = ShadDialog.Dialog
export const DialogContent = ShadDialog.DialogContent
export const DialogDescription = ShadDialog.DialogDescription
export const DialogFooter = ShadDialog.DialogFooter
export const DialogHeader = ShadDialog.DialogHeader
export const DialogTitle = ShadDialog.DialogTitle
export const DialogTrigger = ShadDialog.DialogTrigger
export const DialogRoot = ShadDialog.Dialog

export const DialogBody = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`flex flex-col gap-4 ${className || ''}`} {...props} />
)
