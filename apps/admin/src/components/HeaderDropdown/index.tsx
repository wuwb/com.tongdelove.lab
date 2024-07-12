import { Dropdown } from 'antd'
import type { DropDownProps } from 'antd/es/dropdown'
import clsx from 'clsx'
import React from 'react'

import { createStyles } from 'antd-style'

const useStyles = createStyles(({ token, css }) => ({
  [`@media screen and (max-width: ${token.screenXS})`]: {
    width: '100%',
  },
}))

export type HeaderDropdownProps = {
  overlayClassName?: string
  overlay: React.ReactNode | (() => React.ReactNode) | any
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter'
} & Omit<DropDownProps, 'overlay'>

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => {
  const { styles, cx, theme } = useStyles()

  return <Dropdown overlayClassName={clsx(styles, cls)} {...restProps} />
}

export default HeaderDropdown
