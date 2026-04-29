'use client'

import * as React from 'react'

export interface ProgressCircleRootProps extends React.ComponentProps<'svg'> {
  value?: number
  max?: number
  size?: number
}

export interface ProgressCircleRingProps
  extends React.ComponentProps<'circle'> {
  trackColor?: string
  cap?: 'round' | 'butt' | 'square'
}

export interface ProgressCircleValueTextProps
  extends React.ComponentProps<'span'> {}

export const ProgressCircleRoot = React.forwardRef<
  SVGSVGElement,
  ProgressCircleRootProps
>(function ProgressCircleRoot(props, ref) {
  const { value = 0, max = 100, size = 120, className, ...rest } = props
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / max) * circumference

  return (
    <svg ref={ref} width={size} height={size} className={className} {...rest}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-muted-foreground/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="text-primary transition-all duration-500"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: `${size / 2}px ${size / 2}px`,
        }}
      />
    </svg>
  )
})

export const ProgressCircleValueText = React.forwardRef<
  HTMLSpanElement,
  ProgressCircleValueTextProps
>(function ProgressCircleValueText(props, ref) {
  const { className, ...rest } = props
  return (
    <span
      ref={ref}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      {...rest}
    />
  )
})
