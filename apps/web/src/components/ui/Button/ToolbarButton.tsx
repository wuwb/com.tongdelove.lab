import React from 'react'
import { Button } from './Button'
import styles from './ToolbarButton.module.css'

type IButtonType = 'button' | 'submit' | 'reset'

const ToolbarButton = ({
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

export default ToolbarButton
