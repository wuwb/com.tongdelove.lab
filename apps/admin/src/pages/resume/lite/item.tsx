import { Link } from '@/components/Link';
import { Outlet } from '@umijs/max';
import React from 'react';
import styles from './item.less';

interface ItemProps {
  img?: string;
  imgTitle?: string;
  link?: string;
  title?: string;
  subTitle?: string;
  meta?: string;
  badges?: string[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Item = (props: ItemProps) => {
  return (
    <div className={styles.item} {...props}>
      {props.img ? (
        <div className={styles.pic}>
          <img src={props.img} alt={props.imgTitle} />
        </div>
      ) : null}
      <div className={styles.detail}>
        <div className={styles.wrap}>
          <h4 className={styles.title}>
            {props.link ? <Link to={props.link}>{props.title}</Link> : props.title}
            {props.badges ? <span className={styles.badges}>{props.badges.join(', ')}</span> : null}
          </h4>
          {props.meta ? <div>{props.meta}</div> : null}
        </div>
        {props.subTitle ? <div>{props.subTitle}</div> : null}

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Item;
