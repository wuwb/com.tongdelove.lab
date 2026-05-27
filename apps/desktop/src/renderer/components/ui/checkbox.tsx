import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/renderer/lib/utils'

const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
CheckboxRoot.displayName = CheckboxPrimitive.Root.displayName

const CheckboxIndicator = CheckboxPrimitive.Indicator

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode
  defaultChecked?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, children, defaultChecked, ...props }, ref) => {
  if (children) {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <CheckboxRoot ref={ref} className={className} defaultChecked={defaultChecked} {...props} />
        {children}
      </label>
    )
  }
  return <CheckboxRoot ref={ref} className={className} defaultChecked={defaultChecked} {...props} />
})
Checkbox.displayName = 'Checkbox'

export { Checkbox, CheckboxRoot, CheckboxIndicator }
