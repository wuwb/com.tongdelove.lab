'use client'

import { useState } from 'react'
import { UnstyledButton, Tooltip, rem } from '@mantine/core'
import {
  TbHome2,
  TbGauge,
  TbDeviceDesktopAnalytics,
  TbFingerprint,
  TbCalendarStats,
  TbUser,
  TbSettings,
} from 'react-icons/tb'
import classes from './Navbar.module.css'
import { Navigation } from '../Navigation'
import clsx from 'clsx'

const mainLinksMockdata = [
  { icon: TbHome2, label: 'Home' },
  { icon: TbGauge, label: 'Dashboard' },
  { icon: TbDeviceDesktopAnalytics, label: 'Analytics' },
  { icon: TbCalendarStats, label: 'Releases' },
  { icon: TbUser, label: 'Account' },
  { icon: TbFingerprint, label: 'Security' },
  { icon: TbSettings, label: 'Settings' },
]

const linksMockdata = [
  'Security',
  'Settings',
  'Dashboard',
  'Releases',
  'Account',
  'Orders',
  'Clients',
  'Databases',
  'Pull Requests',
  'Open Issues',
  'Wiki pages',
]

export function Navbar() {
  const [active, setActive] = useState('Releases')
  const [activeLink, setActiveLink] = useState('Settings')

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} />
      </UnstyledButton>
    </Tooltip>
  ))

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault()
        setActiveLink(link)
      }}
      key={link}
    >
      {link}
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <div className="flex h-full flex-1 overflow-hidden">
        <div className={classes.aside}>
          <div className={clsx('jutifiy-center flex w-full', classes.logo)}>
            X
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <Navigation />
        </div>
      </div>
    </nav>
  )
}
