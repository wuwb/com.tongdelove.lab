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
}

const Item = (props: ItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.pic}>
        {props.img ? <img src={props.img} alt={props.imgTitle} /> : null}
      </div>
      <div className={styles.detail}>
        <h4 className="font-bold">
          {props.link ? (
            <Link className="text-blue-500" to={props.link}>
              {props.title}
            </Link>
          ) : (
            props.title
          )}
          {props.badges ? <span className="ml-2">{props.badges.join(', ')}</span> : null}
        </h4>
        {props.subTitle ? <div className="text-gray-500">{props.subTitle}</div> : null}
        {props.meta ? <div className="text-gray-500 mb-2">{props.meta}</div> : null}
        <div className="text-sm max-w-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Item;
