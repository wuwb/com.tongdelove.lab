import React from 'react';
import BoxWrap from './BoxWrap';
import BoxCell from './BoxCell';
import BoxInner from './BoxInner';
import Styles from './index.less';
import { Outlet } from '@umijs/max';

const Box = (props) => {
  return (
    <BoxWrap>
      {props.title ? <BoxCell>{props.title}</BoxCell> : null}
      <BoxInner className={Styles.boxInner}>
        <Outlet />
      </BoxInner>
    </BoxWrap>
  );
};

export default Box;
