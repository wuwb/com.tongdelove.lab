'use client'

import * as React from 'react'
import { LuChevronsUpDown } from 'react-icons/lu'

interface NativeSelectItem {
  value: string
  label: string
  disabled?: boolean
}

export interface NativeSelectRootProps extends React.ComponentProps<'div'> {}
export interface NativeSelectFieldProps extends React.ComponentProps<'select'> {
  items?: Array<string | NativeSelectItem>
}

export const NativeSelectRoot = React.forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelectRoot(props, ref) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={`bg-background relative flex items-center rounded-md border ${className}`}
      {...rest}
    />
  )
})

export const NativeSelectField = React.forwardRef<
  HTMLSelectElement,
  NativeSelectFieldProps
>(function NativeSelectField(props, ref) {
  const { items: itemsProp, className, children, ...rest } = props

  const items = React.useMemo(
    () =>
      itemsProp?.map((item) =>
        typeof item === 'string' ? { label: item, value: item } : item
      ),
    [itemsProp]
  )

  return (
    <select
      ref={ref}
      className={`focus:ring-primary h-10 w-full cursor-pointer appearance-none bg-transparent px-3 pr-8 focus:ring-2 focus:outline-none ${className}`}
      {...rest}
    >
      {children}
      {items?.map((item) => (
        <option key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </option>
      ))}
    </select>
  )
})

export const NativeSelectIndicator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function NativeSelectIndicator(props, ref) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={`text-muted-foreground pointer-events-none absolute right-2 ${className}`}
      {...rest}
    >
      <LuChevronsUpDown className="h-4 w-4" />
    </div>
  )
})
