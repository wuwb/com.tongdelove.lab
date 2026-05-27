import * as React from 'react'
import { cn } from '@/renderer/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        blue: 'border-transparent bg-blue-500/10 text-blue-600 dark:text-blue-400',
        green: 'border-transparent bg-green-500/10 text-green-600 dark:text-green-400',
        gray: 'border-transparent bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  colorScheme?: string
}

function Badge({ className, variant, colorScheme, ...props }: BadgeProps) {
  if (colorScheme) {
    const colorMap: Record<string, string> = {
      blue: 'blue',
      green: 'green',
      gray: 'gray',
      red: 'destructive'
    }
    variant = (colorMap[colorScheme] || variant) as any
  }
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
