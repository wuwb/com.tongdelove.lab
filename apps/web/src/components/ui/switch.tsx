'use client'

import * as React from 'react'
import { Switch as ShadSwitch } from '@tongdelove/ui/components/switch'

export interface SwitchProps extends React.ComponentProps<typeof ShadSwitch> {}

export const Switch = React.forwardRef<
  React.ElementRef<typeof ShadSwitch>,
  SwitchProps
>(function Switch(props, ref) {
  return <ShadSwitch ref={ref} {...props} />
})
