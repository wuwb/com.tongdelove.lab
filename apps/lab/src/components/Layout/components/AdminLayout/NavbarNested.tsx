import {
  TbNotes,
  TbCalendarStats,
  TbGauge,
  TbPresentationAnalytics,
  TbFileAnalytics,
  TbAdjustments,
  TbLock,
} from 'react-icons/tb'
// import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from './components/NavbarLinksGroup/NavbarLinksGroup'
import { Logo } from './Logo'
import classes from './NavbarNested.module.css'

const mockdata = [
  { label: 'Dashboard', icon: TbGauge },
  {
    label: 'Market news',
    icon: TbNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: TbCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: TbPresentationAnalytics },
  { label: 'Contracts', icon: TbFileAnalytics },
  { label: 'Settings', icon: TbAdjustments },
  {
    label: 'Security',
    icon: TbLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
]

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </div>

      <div className={classes.footer}>{/* <UserButton /> */}</div>
    </nav>
  )
}
