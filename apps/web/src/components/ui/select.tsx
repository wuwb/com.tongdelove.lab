'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@tongdelove/ui/components/select'
import { CloseButton } from './close-button'

export const SelectRoot = Select
export { SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue }

export const SelectCloseTrigger = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentProps<'button'>
>(function SelectCloseTrigger(props, ref) {
  return (
    <button ref={ref} className="absolute top-1 right-1" {...props}>
      <CloseButton size="sm" />
    </button>
  )
})
