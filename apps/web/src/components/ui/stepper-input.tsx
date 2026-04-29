'use client'

import * as React from 'react'
import { Button } from './button'
import { LuMinus, LuPlus } from 'react-icons/lu'

export interface StepperInputProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  label?: React.ReactNode
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
}

export const StepperInput = React.forwardRef<HTMLDivElement, StepperInputProps>(
  function StepperInput(props, ref) {
    const {
      label,
      value = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      className,
      ...rest
    } = props

    const handleDecrement = () => {
      const newValue = Math.max(min, value - step)
      onChange?.(newValue)
    }

    const handleIncrement = () => {
      const newValue = Math.min(max, value + step)
      onChange?.(newValue)
    }

    return (
      <div ref={ref} className={className} {...rest}>
        {label && (
          <label className="mb-2 block text-sm font-medium">{label}</label>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={value <= min}
          >
            <LuMinus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-lg font-medium">{value}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={value >= max}
          >
            <LuPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }
)
