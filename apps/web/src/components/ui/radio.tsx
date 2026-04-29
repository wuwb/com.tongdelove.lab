'use client'

import * as React from 'react'
import {
  RadioGroup,
  RadioGroupItem,
} from '@tongdelove/ui/components/radio-group'

export interface RadioProps
  extends React.ComponentProps<typeof RadioGroupItem> {}

export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioProps
>(function Radio(props, ref) {
  const { children, ...rest } = props
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem ref={ref} {...rest} />
      {children && (
        <span className="cursor-pointer text-sm select-none">{children}</span>
      )}
    </div>
  )
})

export { RadioGroup }
