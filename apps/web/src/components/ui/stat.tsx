'use client'

import * as React from 'react'
import { Badge } from '@tongdelove/ui/components/badge'
import { InfoTip } from './toggle-tip'
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu'

export interface StatRootProps extends React.ComponentProps<'div'> {}
export interface StatLabelProps extends React.ComponentProps<'p'> {
  info?: React.ReactNode
}
export interface StatValueProps extends React.ComponentProps<'div'> {}
export interface StatValueTextProps extends React.ComponentProps<'span'> {
  value?: number
  formatOptions?: Intl.NumberFormatOptions
}
export interface StatHelpTextProps extends React.ComponentProps<'p'> {}
export interface StatValueUnitProps extends React.ComponentProps<'span'> {}

export const StatRoot = React.forwardRef<HTMLDivElement, StatRootProps>(
  function StatRoot(props, ref) {
    const { className, ...rest } = props
    return (
      <div ref={ref} className={`flex flex-col gap-1 ${className}`} {...rest} />
    )
  }
)

export const StatLabel = React.forwardRef<HTMLParagraphElement, StatLabelProps>(
  function StatLabel(props, ref) {
    const { info, className, children, ...rest } = props
    return (
      <p
        ref={ref}
        className={`text-muted-foreground flex items-center gap-1 text-sm font-medium ${className}`}
        {...rest}
      >
        {children}
        {info && <InfoTip>{info}</InfoTip>}
      </p>
    )
  }
)

export const StatValue = React.forwardRef<HTMLDivElement, StatValueProps>(
  function StatValue(props, ref) {
    const { className, ...rest } = props
    return (
      <div
        ref={ref}
        className={`flex items-baseline gap-1 ${className}`}
        {...rest}
      />
    )
  }
)

export const StatValueText = React.forwardRef<
  HTMLSpanElement,
  StatValueTextProps
>(function StatValueText(props, ref) {
  const { value, formatOptions, className, children, ...rest } = props
  const displayValue =
    children ||
    (value != null
      ? new Intl.NumberFormat('en-US', formatOptions).format(value)
      : '')
  return (
    <span ref={ref} className={`text-2xl font-bold ${className}`} {...rest}>
      {displayValue}
    </span>
  )
})

export const StatValueUnit = React.forwardRef<
  HTMLSpanElement,
  StatValueUnitProps
>(function StatValueUnit(props, ref) {
  const { className, ...rest } = props
  return (
    <span
      ref={ref}
      className={`text-muted-foreground text-sm font-medium ${className}`}
      {...rest}
    />
  )
})

export const StatHelpText = React.forwardRef<
  HTMLParagraphElement,
  StatHelpTextProps
>(function StatHelpText(props, ref) {
  const { className, ...rest } = props
  return (
    <p
      ref={ref}
      className={`text-muted-foreground text-sm ${className}`}
      {...rest}
    />
  )
})

export const StatUpTrend = React.forwardRef<
  React.ElementRef<typeof Badge>,
  React.ComponentProps<typeof Badge>
>(function StatUpTrend(props, ref) {
  return (
    <Badge variant="secondary" className="gap-1" ref={ref} {...props}>
      <LuTrendingUp className="h-3 w-3" />
      {props.children}
    </Badge>
  )
})

export const StatDownTrend = React.forwardRef<
  React.ElementRef<typeof Badge>,
  React.ComponentProps<typeof Badge>
>(function StatDownTrend(props, ref) {
  return (
    <Badge variant="secondary" className="gap-1" ref={ref} {...props}>
      <LuTrendingDown className="h-3 w-3" />
      {props.children}
    </Badge>
  )
})
