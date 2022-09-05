import React from 'react';
import cx from 'clsx';
import styles from './styles.module.css';

interface IProps {
  fullscreen?: boolean;
  delay?: number;
  //
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

export const LazyLoadingSpin: React.FC<IProps> = (props) => {
  // const dom = (
  //   <Spin
  //     className={cx(
  //       styles['comp-wrapper'],
  //       {
  //         [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode,
  //         [styles['comp-wrapper--fullscreen']]: !!props.fullscreen,
  //       },
  //       `g-comp--${LazyLoadingSpin.displayName}`,
  //       props.className,
  //     )}
  //     style={props.style}
  //     delay={props.delay}
  //   />
  // );

  const dom = (
    <div
      className={cx(
        styles['comp-wrapper'],
        {
          [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode,
          [styles['comp-wrapper--fullscreen']]: !!props.fullscreen,
        },
        `g-comp--${LazyLoadingSpin.displayName}`,
        props.className,
      )}
      style={props.style}
    />
  );

  return dom;
};
