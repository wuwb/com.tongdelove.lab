'use client'

import * as React from 'react'
import { Button } from './button'
import { LuCheck } from 'react-icons/lu'

export interface StepsRootProps extends React.ComponentProps<'div'> {
  activeStep?: number
  onStepChange?: (step: number) => void
}

export const StepsRoot = React.forwardRef<HTMLDivElement, StepsRootProps>(
  function StepsRoot(props, ref) {
    const { className, children, activeStep = 0, onStepChange, ...rest } = props
    return (
      <div ref={ref} className={`relative ${className}`} {...rest}>
        <div className="mb-6 flex items-center justify-between">
          <div className="bg-muted h-0.5 flex-1" />
        </div>
        <div className="relative -top-6 flex justify-between">
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null
            return React.cloneElement(child as React.ReactElement<any>, {
              isActive: index === activeStep,
              isCompleted: index < activeStep,
              onClick: () => onStepChange?.(index),
            })
          })}
        </div>
      </div>
    )
  }
)

export interface StepsItemProps
  extends Omit<React.ComponentProps<'button'>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  isActive?: boolean
  isCompleted?: boolean
  icon?: React.ReactNode
  completedIcon?: React.ReactNode
}

export const StepsItem = React.forwardRef<HTMLButtonElement, StepsItemProps>(
  function StepsItem(props, ref) {
    const {
      title,
      description,
      isActive,
      isCompleted,
      icon,
      completedIcon,
      className,
      ...rest
    } = props
    return (
      <Button
        variant="ghost"
        className={`flex flex-col items-center gap-2 ${className}`}
        ref={ref}
        {...rest}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            isCompleted
              ? 'bg-green-500 text-white'
              : isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
          }`}
        >
          {isCompleted
            ? completedIcon || <LuCheck className="h-4 w-4" />
            : icon || ''}
        </div>
        {title && (
          <span
            className={`text-sm font-medium ${isActive ? 'text-primary' : ''}`}
          >
            {title}
          </span>
        )}
        {description && (
          <span className="text-muted-foreground text-xs">{description}</span>
        )}
      </Button>
    )
  }
)

export const StepsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function StepsContent(props, ref) {
  const { className, ...rest } = props
  return <div ref={ref} className={className} {...rest} />
})

export const StepsNextTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function StepsNextTrigger(props, ref) {
  return (
    <Button ref={ref} {...props}>
      Next
    </Button>
  )
})

export const StepsPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function StepsPrevTrigger(props, ref) {
  return (
    <Button variant="outline" ref={ref} {...props}>
      Back
    </Button>
  )
})
