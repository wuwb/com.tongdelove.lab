import { Dropdown } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  [`@media screen and (max-width: ${token.screenXS})`]: {
    width: '100%',
  },
}));

export type HeaderDropdownProps = {
  overlayClassName?: string;
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const { styles, cx, theme } = useStyles();

  return <Dropdown overlayClassName={classNames(styles, cls)} {...restProps} />;
};

export default HeaderDropdown;
