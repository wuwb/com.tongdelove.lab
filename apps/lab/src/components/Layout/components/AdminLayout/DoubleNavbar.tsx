import { useState } from 'react'
import { Tooltip } from '@tongdelove/ui/components/tooltip'
import { Button } from '@tongdelove/ui/components/button'

import {
  TbHome2,
  TbGauge,
  TbDeviceDesktopAnalytics,
  TbFingerprint,
  TbCalendarStats,
  TbUser,
  TbSettings,
} from 'react-icons/tb'
import classes from './DoubleNavbar.module.css'
import { NavbarNested } from './NavbarNested'
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

export function DoubleNavbar() {
  const [active, setActive] = useState('Releases')
  const [activeLink, setActiveLink] = useState('Settings')

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      key={link.label}
    >
      <Button
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: 22, height: 22 }} stroke={1.5} />
      </Button>
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
    <nav className={clsx(classes.navbar, 'grow')}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            {/* <div type="mark" size={30} /> */}
          </div>
          {mainLinks}
        </div>
        <div className={classes.main}>
          <div order={4} className={classes.div}>
            {active}
          </div>
          <NavbarNested />

          {/* {links} */}
        </div>
      </div>
    </nav>
  )
}
