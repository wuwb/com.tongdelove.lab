'use client'

import * as React from 'react'

export interface BlockquoteProps
  extends Omit<React.ComponentProps<'blockquote'>, 'cite'> {
  cite?: React.ReactNode
  citeUrl?: string
  showDash?: boolean
}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  function Blockquote(props, ref) {
    const { children, cite, citeUrl, showDash, ...rest } = props
    return (
      <blockquote
        ref={ref}
        className="border-primary text-muted-foreground border-l-2 pl-4 italic"
        {...rest}
      >
        {children}
        {cite && (
          <footer className="mt-2 text-sm not-italic">
            {showDash && <span>&mdash;</span>}
            {citeUrl ? (
              <cite>
                <a href={citeUrl} className="text-primary hover:underline">
                  {cite}
                </a>
              </cite>
            ) : (
              <cite>{cite}</cite>
            )}
          </footer>
        )}
      </blockquote>
    )
  }
)
