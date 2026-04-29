'use client'

import * as React from 'react'
import * as ShadToggle from '@tongdelove/ui/components/toggle'

interface Item {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps extends React.ComponentProps<'div'> {
  items: Array<string | Item>
  value?: string
  onValueChange?: (value: string) => void
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === 'string') return { value: item, label: item }
    return item
  })
}

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(props, ref) {
  const { items, value, onValueChange, className, ...rest } = props
  const data = React.useMemo(() => normalize(items), [items])

  return (
    <div ref={ref} className={`flex ${className}`} {...rest}>
      {data.map((item) => (
        <ShadToggle.Toggle
          key={item.value}
          pressed={value === item.value}
          onPressedChange={(pressed) => pressed && onValueChange?.(item.value)}
          disabled={item.disabled}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-l-none rounded-r-none border-x-0 first:rounded-l-md first:border-l last:rounded-r-md last:border-r"
        >
          {item.label}
        </ShadToggle.Toggle>
      ))}
    </div>
  )
})
