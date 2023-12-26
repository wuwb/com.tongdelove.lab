import { Button } from 'antd';

import { ButtonProps } from 'antd/es/button';
import clsx from 'clsx';
import React from 'react';
import styles from './index.less';

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = clsx(styles.submit, className);
  return <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />;
};

export default LoginSubmit;
