import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/renderer/lib/utils'

const SliderRoot = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
SliderRoot.displayName = SliderPrimitive.Root.displayName

const SliderTrack = SliderPrimitive.Track
const SliderRange = SliderPrimitive.Range
const SliderThumb = SliderPrimitive.Thumb

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  defaultValue?: number[]
  value?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderRoot ref={ref} className={className} {...props} />
))
Slider.displayName = 'Slider'

export { Slider, SliderRoot, SliderTrack, SliderRange, SliderThumb }
