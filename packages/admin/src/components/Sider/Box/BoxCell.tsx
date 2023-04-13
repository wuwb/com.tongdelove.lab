import React from 'react';
import Styles from './index.less';
import { Outlet } from '@umijs/max';

const SiderBoxCell = (props) => {
  return <div className={Styles.boxCell}><Outlet /></div>;
};

export default SiderBoxCell;
