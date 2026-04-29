'use client'

import * as React from 'react'
import { CloseButton } from './close-button'

export interface ActionBarRootProps extends React.ComponentProps<'div'> {}
export interface ActionBarContentProps extends React.ComponentProps<'div'> {}

export const ActionBarRoot = React.forwardRef<
  HTMLDivElement,
  ActionBarRootProps
>(function ActionBarRoot(props, ref) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={`fixed right-0 bottom-0 left-0 ${className}`}
      {...rest}
    />
  )
})

export const ActionBarContent = React.forwardRef<
  HTMLDivElement,
  ActionBarContentProps
>(function ActionBarContent(props, ref) {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={`bg-background border-muted flex items-center justify-between border-t px-4 py-3 ${className}`}
      {...rest}
    />
  )
})

export const ActionBarCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(function ActionBarCloseTrigger(props, ref) {
  return <CloseButton ref={ref} size="sm" {...props} />
})

export const ActionBarSeparator = React.forwardRef<
  HTMLHRElement,
  React.ComponentProps<'hr'>
>(function ActionBarSeparator(props, ref) {
  const { className, ...rest } = props
  return <hr ref={ref} className={`border-muted ${className}`} {...rest} />
})
