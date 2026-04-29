'use client'

import * as React from 'react'
import { Slider as ShadSlider } from '@tongdelove/ui/components/slider'

export interface SliderProps extends React.ComponentProps<typeof ShadSlider> {
  marks?: Array<number | { value: number; label: React.ReactNode }>
  label?: React.ReactNode
  showValue?: boolean
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof ShadSlider>,
  SliderProps
>(function Slider(props, ref) {
  const { marks, label, showValue, ...rest } = props
  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <ShadSlider ref={ref} {...rest} />
    </div>
  )
})
