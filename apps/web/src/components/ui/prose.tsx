'use client'

import * as React from 'react'

export interface ProseProps extends React.ComponentProps<'div'> {}

export const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  function Prose(props, ref) {
    const { className, ...rest } = props
    return (
      <div
        ref={ref}
        className={`text-muted-foreground max-w-[65ch] text-sm leading-[1.7em] ${className}`}
        {...rest}
      />
    )
  }
)
