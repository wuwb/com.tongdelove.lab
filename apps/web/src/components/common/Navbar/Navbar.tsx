import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { NavbarRoot } from './NavbarRoot'

interface ILink {
  href: string
  label: string
}
interface NavbarProps extends PropsWithChildren {
  links?: ILink[]
}

export const Navbar = ({ links }: NavbarProps) => (
  <NavbarRoot>
    <div>
      <div className="relative flex flex-row justify-between py-4 md:py-4">
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="hover:scale(1.05) transform cursor-pointer rounded-full border duration-100 ease-in-out hover:shadow-md"
            aria-label="Logo"
          >
            {/* <Logo /> */}
            Logo
          </Link>
          <nav className="ml-6 hidden space-x-4 lg:block">
            <Link
              href="/search"
              className="inline-flex cursor-pointer items-center leading-6 text-accent-5 transition duration-75 ease-in-out hover:text-accent-9 focus:text-accent-8 focus:outline-none"
            >
              All
            </Link>
            {links?.map((l) => (
              <Link
                href={l.href}
                key={l.href}
                className="inline-flex cursor-pointer items-center leading-6 text-accent-5 transition duration-75 ease-in-out hover:text-accent-9 focus:text-accent-8 focus:outline-none"
              >
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
