import { useState } from 'react'
import { Buttom } from '@tongdelove/ui/components/button'
import { TbCalendarStats, TbChevronRight } from 'react-icons/tb'
import classes from './NavbarLinksGroup.module.css'

interface LinksGroupProps {
  icon: React.FC<any>
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const items = (hasLinks ? links : []).map((link) => (
    <div
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </div>
  ))

  return (
    <>
      <Button
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <div justify="space-between" gap={0}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div variant="light" size={30}>
              <Icon style={{ width: 18, height: 18 }} />
            </div>
            <div ml="md">{label}</div>
          </div>
          {hasLinks && (
            <TbChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </div>
      </Button>
      {hasLinks ? <div in={opened}>{items}</div> : null}
    </>
  )
}

const mockdata = {
  label: 'Releases',
  icon: TbCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
}

export function NavbarLinksGroup() {
  return (
    <div mih={220} p="md">
      <LinksGroup {...mockdata} />
    </div>
  )
}
