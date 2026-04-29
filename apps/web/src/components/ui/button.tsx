import * as React from 'react'
import {
  Button as ShadButton,
  buttonVariants,
} from '@tongdelove/ui/components/button'
import { cn } from '@tongdelove/ui/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps
  extends React.ComponentProps<typeof ShadButton>,
    ButtonLoadingProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, className, ...rest } =
      props
    return (
      <ShadButton
        disabled={loading || disabled}
        ref={ref}
        className={cn(className)}
        {...rest}
      >
        {loading && !loadingText ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span className="sr-only">{children}</span>
          </>
        ) : loading && loadingText ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ShadButton>
    )
  }
)

export { buttonVariants }
