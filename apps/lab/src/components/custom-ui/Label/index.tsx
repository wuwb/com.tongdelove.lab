import { FC, ReactNode } from 'react'

interface LabelProps {
  className?: string
  color?:
    | 'primary'
    | 'black'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'success'
    | 'info'
  children?: ReactNode
}

export const Label: FC<LabelProps> = ({
  className,
  color = 'secondary',
  children,
  ...rest
}) => {
  return (
    <span className={'MuiLabel-' + color} {...rest}>
      {children}
    </span>
  )
}
