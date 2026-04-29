'use client'

import * as React from 'react'
import { Input as ShadInput } from '@tongdelove/ui/components/input'

export interface InputProps extends React.ComponentProps<typeof ShadInput> {}

export const Input = React.forwardRef<
  React.ElementRef<typeof ShadInput>,
  InputProps
>(function Input(props, ref) {
  return <ShadInput ref={ref} {...props} />
})
