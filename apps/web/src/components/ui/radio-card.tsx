'use client'

import * as React from 'react'
import {
  RadioGroup,
  RadioGroupItem,
} from '@tongdelove/ui/components/radio-group'

export interface RadioCardRootProps
  extends React.ComponentProps<typeof RadioGroup> {}
export interface RadioCardItemProps
  extends React.ComponentProps<typeof RadioGroupItem> {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
}

export const RadioCardRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  RadioCardRootProps
>(function RadioCardRoot(props, ref) {
  return <RadioGroup ref={ref} {...props} />
})

export const RadioCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioCardItemProps
>(function RadioCardItem(props, ref) {
  const { icon, label, description, addon, className, ...rest } = props
  return (
    <RadioGroupItem
      ref={ref}
      className={`data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${className}`}
      {...rest}
    >
      {icon}
      <div className="min-w-0 flex-1">
        {label && <span className="text-sm font-medium">{label}</span>}
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
      {addon && <span className="text-sm font-medium">{addon}</span>}
    </RadioGroupItem>
  )
})
