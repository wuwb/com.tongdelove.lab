import React from 'react';
import cx from 'clsx';
import { ICompBaseProps } from '@/interfaces';
import styles from './styles.module.css';

interface IProps extends ICompBaseProps {
  fullscreen?: boolean;
  spinning?: boolean;
  tip?: string;
  delay?: number;
  lazy?: boolean;
  //
  iconClassName?: string;
}

export const LoadingSpinner: React.FC<IProps> = (props: any) => {
  LoadingSpinner.displayName = 'LoadingSpinner';

  const iconSize = props.size || 'default';

  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        {
          [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode,
          [styles['comp-wrapper--fullscreen']]: !!props.fullscreen,
          [styles['comp-wrapper--lazy']]: !!props.lazy,
        },
        props.className,
        `g-comp--${LoadingSpinner.displayName}`,
      )}
      style={props.style}
    >
      <div
        className={cx(
          styles['spin'],
          styles[`spin-size--${iconSize}`],
          props.iconClassName,
        )}
      >
        <div className={cx('g-icon-spin')} />
      </div>
    </div>
  );
};
