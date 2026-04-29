'use client'

import * as React from 'react'
import * as ShadToggle from '@tongdelove/ui/components/toggle'
import { LuStar } from 'react-icons/lu'

export interface RatingProps extends React.ComponentProps<'div'> {
  icon?: React.ReactElement
  count?: number
  label?: React.ReactNode
  value?: number
  onValueChange?: (value: number) => void
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  function Rating(props, ref) {
    const {
      icon = <LuStar className="h-4 w-4" />,
      count = 5,
      label,
      value,
      onValueChange,
      className,
      ...rest
    } = props

    return (
      <div
        ref={ref}
        className={`flex items-center gap-1 ${className}`}
        {...rest}
      >
        {label && <span className="mr-2 text-sm font-medium">{label}</span>}
        <div className="flex">
          {Array.from({ length: count }).map((_, index) => (
            <ShadToggle.Toggle
              key={index}
              pressed={value !== undefined && index < value}
              onPressedChange={(pressed) =>
                pressed && onValueChange?.(index + 1)
              }
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full data-[state=on]:border-yellow-400 data-[state=on]:bg-yellow-400 data-[state=on]:text-yellow-400"
            >
              {icon}
            </ShadToggle.Toggle>
          ))}
        </div>
      </div>
    )
  }
)
