'use client'

import * as React from 'react'

export interface TimelineRootProps extends React.ComponentProps<'ol'> {}
export interface TimelineItemProps extends React.ComponentProps<'li'> {}
export interface TimelineContentProps extends React.ComponentProps<'div'> {}
export interface TimelineConnectorProps extends React.ComponentProps<'div'> {}
export interface TimelineIndicatorProps extends React.ComponentProps<'div'> {}
export interface TimelineTitleProps extends React.ComponentProps<'h3'> {}
export interface TimelineDescriptionProps extends React.ComponentProps<'p'> {}

export const TimelineRoot = React.forwardRef<
  HTMLOListElement,
  TimelineRootProps
>(function TimelineRoot(props, ref) {
  const { className, ...rest } = props
  return (
    <ol
      ref={ref}
      className={`relative flex flex-col gap-4 ${className}`}
      {...rest}
    />
  )
})

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  function TimelineItem(props, ref) {
    const { className, ...rest } = props
    return (
      <li ref={ref} className={`relative flex gap-4 ${className}`} {...rest} />
    )
  }
)

export const TimelineContent = React.forwardRef<
  HTMLDivElement,
  TimelineContentProps
>(function TimelineContent(props, ref) {
  const { className, ...rest } = props
  return <div ref={ref} className={`flex-1 ${className}`} {...rest} />
})

export const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  TimelineConnectorProps
>(function TimelineConnector(props, ref) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={`bg-muted absolute top-4 left-4 h-full w-px ${className}`}
      {...rest}
    />
  )
})

export const TimelineIndicator = React.forwardRef<
  HTMLDivElement,
  TimelineIndicatorProps
>(function TimelineIndicator(props, ref) {
  const { className, children, ...rest } = props
  return (
    <div
      ref={ref}
      className={`bg-muted relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
})

export const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  TimelineTitleProps
>(function TimelineTitle(props, ref) {
  const { className, ...rest } = props
  return (
    <h3
      ref={ref}
      className={`text-base font-semibold ${className}`}
      {...rest}
    />
  )
})

export const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  TimelineDescriptionProps
>(function TimelineDescription(props, ref) {
  const { className, ...rest } = props
  return (
    <p
      ref={ref}
      className={`text-muted-foreground text-sm ${className}`}
      {...rest}
    />
  )
})
