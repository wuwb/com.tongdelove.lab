import React from 'react';
import BoxCell from './BoxCell';
import Styles from './index.less';
import { Outlet } from '@umijs/max';

const Box = (props) => {
  return <div className={Styles.boxWrap}><Outlet /></div>;
};

export default Box;
