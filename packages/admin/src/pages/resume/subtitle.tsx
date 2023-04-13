import React, { Component, useState, useEffect } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { Outlet } from '@umijs/max';

interface Props {
  title: string | Component;
  subTitle?: string | Component;
  children?: any;
  arrow?: boolean; // 默认 true
  fold?: boolean; // 不显示
}

function Subtitle(props: Props) {
  const defaultShow = !props.fold;
  const [show, setShow] = useState(defaultShow);

  const handleClick = () => {
    if (!props.arrow) {
      return;
    }
    setShow(!show);
  };

  return (
    <div className={styles.subTitleWrap}>
      <div
        className={classnames(styles.subTitle, {
          arrow: props.arrow,
          unfold: show,
        })}
        onClick={() => handleClick()}
      >
        <h4 className="subtitle">{props.title}</h4>
        {props.subTitle ? <div className="text-gray-500">{props.subTitle}</div> : null}
      </div>
      {show ? <Outlet /> : null}
    </div>
  );
}

export default Subtitle;
