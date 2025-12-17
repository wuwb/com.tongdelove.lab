'use client'

import { useState } from 'react'
import { Button } from '@tongdelove/ui/components/button'
import {Tooltip } from '@tongdelove/ui/components/tooltip'
import {
  TbHome2,
  TbGauge,
  TbDeviceDesktopAnalytics,
  TbFingerprint,
  TbCalendarStats,
  TbUser,
  TbSettings,
} from 'react-icons/tb'
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
      key={link.label}
    >
      <Button
        onClick={() => setActive(link.label)}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: 22, height: 22 }} />
      </Button>
    </Tooltip>
  ))

  const links = linksMockdata.map((link) => (
    <a
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
    <nav className="">
      <div className="flex h-full flex-1 overflow-hidden">
        <div className="">
          <div className={clsx('jutifiy-center flex w-full', classes.logo)}>
            X
          </div>
          {mainLinks}
        </div>
        <div className="">
          <Navigation />
        </div>
      </div>
    </nav>
  )
}
