import { ICompBaseProps } from '@/interfaces';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PercentIcon from '@mui/icons-material/Percent';
import { Button } from '@mui/material';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './styles.module.scss';

type IProps = ICompBaseProps

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
        <Link href={nav.to} key={nav.to}
          className={cx(styles['nav-link'], {
            [styles['nav-link--active']]:
              pathname === nav.active || pathname === nav.to,
          })}
        >
          <Button className={styles['nav-button']}>
            {nav.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};
