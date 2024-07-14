import { TbMoon, TbPercentage, TbHistory } from 'react-icons/tb'
import { Button } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './styles.module.scss'

export const HeaderNavbar = props => {
  const { pathname, route, query } = useRouter()

  const navs = [
    { to: '/', icon: <TbHistory />, exact: true },
    { to: '/about', icon: <TbPercentage />, exact: true },
    {
      to: '/about/darkmode',
      active: '/about/[name]',
      icon: <TbMoon />,
      exact: true,
    },
  ]

  return (
    <div
      className={clsx(styles['comp-wrapper'], { [styles['comp-wrapper--alwaysDarkMode']]: props.alwaysDarkMode }, `g-comp--${HeaderNavbar.displayName}`, props.className)}
      style={props.style}
    >
      {navs.map(nav => (
        <Link
          href={nav.to}
          key={nav.to}
          className={clsx(styles['nav-link'], {
            [styles['nav-link--active']]: pathname === nav.active || pathname === nav.to,
          })}
        >
          <Button className={styles['nav-button']}>{nav.icon}</Button>
        </Link>
      ))}
    </div>
  )
}
