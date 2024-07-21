import { useState, useEffect, PropsWithChildren } from 'react'
import { throttle } from 'lodash-es'
import clsx from 'clsx'

interface NavbarRootProps extends PropsWithChildren {}

export const NavbarRoot = ({ children }: NavbarRootProps) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <div
      className={clsx(
        'sticky top-0 z-40 min-h-[74px] bg-primary transition-all duration-150',
        { 'shadow-magical': hasScrolled }
      )}
    >
      {children}
    </div>
  )
}
