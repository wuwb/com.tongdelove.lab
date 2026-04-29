'use client'

import * as React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@tongdelove/ui/components/sheet'

export const Drawer = Sheet
export const DrawerContent = SheetContent
export const DrawerDescription = SheetDescription
export const DrawerFooter = SheetFooter
export const DrawerHeader = SheetHeader
export const DrawerTitle = SheetTitle
export const DrawerTrigger = SheetTrigger
export const DrawerRoot = Sheet

export const DrawerBody = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`flex flex-col gap-4 ${className || ''}`} {...props} />
)
