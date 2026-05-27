import * as React from 'react'
import { Label } from './label'
import { cn } from '@/renderer/lib/utils'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
  required?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, required, className, ...rest } = props
  return (
    <div ref={ref} className={cn('space-y-2', className)} {...rest}>
      {label && (
        <div className="flex items-center gap-1">
          <Label className="text-sm font-medium">
            {label}
          </Label>
          {required ? (
            <span className="text-red-500">*</span>
          ) : optionalText ? (
            <span className="text-sm text-gray-500">{optionalText}</span>
          ) : null}
        </div>
      )}
      {children}
      {helperText && !errorText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {errorText && (
        <p className="text-sm text-red-500">{errorText}</p>
      )}
    </div>
  )
})
