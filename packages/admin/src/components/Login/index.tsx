import React from 'react';
import classnames from 'classnames';
import style from './index';

export default () => {
  return (
    <div className={style['wrapper']}>
      <div className={classnames('g-full-container', style['full-container'])}>
        <div className={style['login-box']}>
          <h2 className={style['title']}>Login</h2>
          <div className={style['login-form']}>
          </div>
        </div>
      </div>
    </div>
  );
};
