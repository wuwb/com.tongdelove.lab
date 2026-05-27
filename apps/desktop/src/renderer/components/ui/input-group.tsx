import * as React from 'react'
import { cn } from '@/renderer/lib/utils'

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  startElementProps?: React.HTMLAttributes<HTMLDivElement>
  endElementProps?: React.HTMLAttributes<HTMLDivElement>
  startOffset?: string
  endOffset?: string
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(props, ref) {
  const {
    startElement,
    startElementProps,
    endElement,
    endElementProps,
    children,
    startOffset = '6px',
    endOffset = '6px',
    className,
    ...rest
  } = props

  const child = React.Children.only<React.ReactElement>(children)

  return (
    <div ref={ref} className={cn('relative flex w-full', className)} {...rest}>
      {startElement && (
        <div
          className={cn(
            'absolute left-0 top-0 flex items-center justify-center h-full pointer-events-none text-gray-500',
            startElementProps?.className
          )}
          style={{ paddingLeft: startOffset, ...startElementProps?.style }}
        >
          {startElement}
        </div>
      )}
      {React.cloneElement(child, {
        ...(startElement && { className: cn(child.props.className, 'pl-10') }),
        ...(endElement && { className: cn(child.props.className, 'pr-10') }),
        ...child.props
      })}
      {endElement && (
        <div
          className={cn(
            'absolute right-0 top-0 flex items-center justify-center h-full pointer-events-none text-gray-500',
            endElementProps?.className
          )}
          style={{ paddingRight: endOffset, ...endElementProps?.style }}
        >
          {endElement}
        </div>
      )}
    </div>
  )
})
