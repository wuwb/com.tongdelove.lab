'use client'

import * as React from 'react'
import { Label } from '@tongdelove/ui/components/label'

export interface FieldProps extends React.ComponentProps<'div'> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const {
      label,
      children,
      helperText,
      errorText,
      optionalText,
      className,
      ...rest
    } = props
    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...rest}>
        {label && (
          <Label className="text-sm font-medium">
            {label}
            {optionalText && (
              <span className="text-muted-foreground ml-1">{optionalText}</span>
            )}
          </Label>
        )}
        {children}
        {helperText && (
          <p className="text-muted-foreground text-xs">{helperText}</p>
        )}
        {errorText && <p className="text-xs text-red-500">{errorText}</p>}
      </div>
    )
  }
)
