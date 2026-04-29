'use client'

import * as React from 'react'
import { Input } from './input'
import { Button } from './button'
import { LuMinus, LuPlus } from 'react-icons/lu'

export interface NumberInputProps
  extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  modelValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: React.ReactNode
}

export const NumberInputRoot = React.forwardRef<
  HTMLDivElement,
  NumberInputProps
>(function NumberInputRoot(props, ref) {
  const {
    modelValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    className,
    ...rest
  } = props

  const handleDecrement = () => {
    const newValue = Math.max(min, modelValue - step)
    onChange?.(newValue)
  }

  const handleIncrement = () => {
    const newValue = Math.min(max, modelValue + step)
    onChange?.(newValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    const clampedValue = Math.min(max, Math.max(min, value))
    onChange?.(clampedValue)
  }

  return (
    <div ref={ref} className={className} {...rest}>
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={modelValue <= min}
        >
          <LuMinus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={modelValue}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-16 rounded-none border-x-0 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={modelValue >= max}
        >
          <LuPlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
})

export const NumberInputField = Input
