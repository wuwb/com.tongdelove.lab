import * as React from 'react'
import { cn } from '@/renderer/lib/utils'
import { Button, type ButtonProps } from '@/renderer/components/ui/button'

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  'aria-label': string
  icon?: React.ReactNode
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, children, size = 'icon', ...props }, ref) => {
    const sizeClasses: Record<string, string> = {
      xs: 'h-6 w-6 p-1',
      sm: 'h-8 w-8 p-1.5',
      md: 'h-10 w-10 p-2',
      lg: 'h-12 w-12 p-2.5',
      icon: 'h-9 w-9'
    }

    return (
      <Button ref={ref} size="icon" className={cn(sizeClasses[size], className)} {...props}>
        {icon || children}
      </Button>
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton }
