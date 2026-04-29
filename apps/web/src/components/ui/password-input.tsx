'use client'

import * as React from 'react'
import { Input } from './input'
import { Button } from './button'
import { LuEye, LuEyeOff } from 'react-icons/lu'

export interface PasswordVisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode }
}

export interface PasswordInputProps
  extends React.ComponentProps<typeof Input>,
    PasswordVisibilityProps {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(props, ref) {
  const {
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityIcon = {
      on: <LuEye className="h-4 w-4" />,
      off: <LuEyeOff className="h-4 w-4" />,
    },
    className,
    ...rest
  } = props

  const [visible, setVisible] = React.useState(defaultVisible || false)

  const handleVisibleChange = () => {
    const newValue = !visible
    setVisible(newValue)
    onVisibleChange?.(newValue)
  }

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        className={className}
        {...rest}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-0 h-full -translate-y-1/2 rounded-none rounded-r-md"
        onClick={handleVisibleChange}
        disabled={rest.disabled}
      >
        {visible ? visibilityIcon.off : visibilityIcon.on}
      </Button>
    </div>
  )
})

export interface PasswordStrengthMeterProps
  extends React.ComponentProps<'div'> {
  max?: number
  value: number
}

export const PasswordStrengthMeter = React.forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter(props, ref) {
  const { max = 4, value, className, ...rest } = props

  const percent = (value / max) * 100
  const { label, colorClass } = getColorClass(percent)

  return (
    <div ref={ref} className={`flex flex-col gap-1 ${className}`} {...rest}>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all ${
              index < value ? colorClass : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {label && <span className="text-xs">{label}</span>}
    </div>
  )
})

function getColorClass(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: 'Low', colorClass: 'bg-red-500' }
    case percent < 66:
      return { label: 'Medium', colorClass: 'bg-orange-500' }
    default:
      return { label: 'High', colorClass: 'bg-green-500' }
  }
}
