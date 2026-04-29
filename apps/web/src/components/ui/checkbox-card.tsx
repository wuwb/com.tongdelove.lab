'use client'

import * as React from 'react'
import { Checkbox } from '@tongdelove/ui/components/checkbox'
import { CheckIcon } from 'lucide-react'
import { cn } from '@tongdelove/ui/lib/utils'

export interface CheckboxCardProps
  extends React.ComponentProps<typeof Checkbox> {
  icon?: React.ReactElement
  label?: React.ReactNode
  description?: React.ReactNode
  addon?: React.ReactNode
}

export const CheckboxCard = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxCardProps
>(function CheckboxCard(props, ref) {
  const { icon, label, description, addon, className, ...rest } = props
  return (
    <Checkbox
      ref={ref}
      className={cn(
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-lg border p-3',
        className
      )}
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
      <span className="grid h-4 w-4 shrink-0 place-content-center">
        <CheckIcon className="h-4 w-4 opacity-0 data-[state=checked]:opacity-100" />
      </span>
    </Checkbox>
  )
})
