import React from 'react';
import styles from './title.less';
import { Outlet } from '@umijs/max';

function Title(props) {
  return (
    <div className={styles['section']} {...props}>
      <div className={styles['title']}>
        <h3>{props.title}</h3>
        {props.subTitle ? <div>{props.subTitle}</div> : null}
      </div>
      <Outlet />
    </div>
  );
}

export default Title;
