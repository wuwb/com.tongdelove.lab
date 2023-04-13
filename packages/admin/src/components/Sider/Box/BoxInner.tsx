import React from 'react';
import Styles from './index.less';
import { Outlet } from '@umijs/max';

const BoxInner = (props) => {
  return <div className={Styles.boxInner}><Outlet /></div>;
};

export default BoxInner;
