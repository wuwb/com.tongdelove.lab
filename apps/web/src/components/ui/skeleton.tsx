'use client'

import * as React from 'react'
import { Skeleton as ShadSkeleton } from '@tongdelove/ui/components/skeleton'

export interface SkeletonTextProps
  extends React.ComponentProps<typeof ShadSkeleton> {
  noOfLines?: number
}

export const SkeletonText = React.forwardRef<
  React.ElementRef<typeof ShadSkeleton>,
  SkeletonTextProps
>(function SkeletonText(props, ref) {
  const { noOfLines = 3, className, ...rest } = props
  return (
    <div className="space-y-2" ref={ref as React.Ref<HTMLDivElement>}>
      {Array.from({ length: noOfLines }).map((_, index) => (
        <ShadSkeleton
          key={index}
          className={`h-4 ${index === noOfLines - 1 ? 'w-4/5' : ''} ${className || ''}`}
          {...rest}
        />
      ))}
    </div>
  )
})

export const SkeletonCircle = ({
  className,
  ...props
}: React.ComponentProps<typeof ShadSkeleton>) => (
  <ShadSkeleton className={`rounded-full ${className || ''}`} {...props} />
)

export const Skeleton = ShadSkeleton
