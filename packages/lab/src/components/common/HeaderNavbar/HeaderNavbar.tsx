import React from 'react';
import cx from 'clsx';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PercentIcon from '@mui/icons-material/Percent';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { ICompBaseProps } from '@/interfaces';

import styles from './styles.module.css';

interface IProps extends ICompBaseProps { }

export const HeaderNavbar: React.FC<IProps> = (props) => {
  const { pathname, route, query } = useRouter();

  const navs = [
    { to: '/', icon: <ChangeHistoryIcon />, exact: true },
    { to: '/about', icon: <PercentIcon />, exact: true },
    {
      to: '/about/darkmode',
      active: '/about/[name]',
      icon: <DarkModeIcon />,
      exact: true,
    },
  ];

  return (
    <div
      className={cx(
        styles['comp-wrapper'],
        { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode },
        `g-comp--${HeaderNavbar.displayName}`,
        props.className,
      )}
      style={props.style}
    >
      {navs.map((nav) => (
        <Link href={nav.to} key={nav.to}>
          <a
            className={cx(styles['nav-link'], {
              [styles['nav-link--active']]:
                pathname === nav.active || pathname === nav.to,
            })}
          >
            <Button className={styles['nav-button']}>
              {nav.icon}
            </Button>
          </a>
        </Link>
      ))}
    </div>
  );
};
