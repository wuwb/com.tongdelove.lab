import React from 'react'
import { Button } from './Button'

type IButtonType = 'button' | 'submit' | 'reset'

export const ToolbarButton = ({
  title = '',
  type = 'button' as IButtonType,
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <Button title={title} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  )
}
