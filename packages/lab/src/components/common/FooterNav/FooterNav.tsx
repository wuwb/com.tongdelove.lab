import React from 'react';
import cx from 'classnames';

import { ICompBaseProps } from '@/interfaces';
import { pkg, app } from '@/configs';

import styles from './style.module.css';

interface IProps extends ICompBaseProps { }

const fmtVer = (v: string) => v.replace('^', '').replace('~', '');
const deps = [
  { k: 'react', v: fmtVer(pkg?.dependencies.react) },
  // { k: 'antd', v: fmtVer(pkg?.dependencies.antd) },
  { k: 'next', v: fmtVer(pkg?.dependencies.next) },
];

export const FooterNav: React.FC<IProps> = (props) => {
  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${FooterNav.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      <div className={styles['copyright']}>
        © {new Date().getFullYear()}
        <a
          href={`https://github.com/SolidZORO/${pkg.name}`}
          target="_blank"
          rel="noreferrer"
        >
          {app.NAME}
        </a>{' '}
        by {pkg.author.split(' ')[0]}
      </div>

      <div className={styles['deps']}>
        {deps.map((d) => (
          <div className={styles['dep']} key={d.k}>
            <strong>{d.k}</strong>
            <sup>{d.v}</sup>
          </div>
        ))}
      </div>
    </div>
  );
};
