'use client'

import * as React from 'react'
import { Checkbox as ShadCheckbox } from '@tongdelove/ui/components/checkbox'

export interface CheckboxProps
  extends React.ComponentProps<typeof ShadCheckbox> {
  icon?: React.ReactNode
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof ShadCheckbox>,
  CheckboxProps
>(function Checkbox(props, ref) {
  const { icon, ...rest } = props
  return <ShadCheckbox ref={ref} {...rest} />
})
