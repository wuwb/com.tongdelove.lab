import { FC, ReactNode } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Box } from '@mantine/core'

interface ScrollbarProps {
  className?: string
  children?: ReactNode
}

export const Scrollbar: FC<ScrollbarProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <Scrollbars
      autoHide
      universal
      renderThumbVertical={() => {
        return <Box />
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  )
}
