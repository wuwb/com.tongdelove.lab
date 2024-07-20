import { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
// import { Logo, Container } from '@/components/ui';
// import { Searchbar, UserNav } from '@/components/common';

interface Link {
  href: string
  label: string
}
interface NavbarProps extends PropsWithChildren {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <div>
      <div className={s.nav}>
        <div className="flex flex-1 items-center">
          <Link href="/" className={s.logo} aria-label="Logo">
            {/* <Logo /> */}
            Logo
          </Link>
          <nav className={s.navMenu}>
            <Link href="/search" className={s.link}>
              All
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href} className={s.link}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div> */}
      </div>
      {/* {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )} */}
    </div>
  </NavbarRoot>
)

export default Navbar
