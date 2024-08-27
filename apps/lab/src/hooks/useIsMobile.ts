import isMobileDetect from 'is-mobile'
import { useState } from 'react'
import { useIsomorphicLayoutEffect } from '@tongdelove/hooks'

/**
 * Check if it is the mobile device width
 * mobile: width <= 450
 * its will return false in ssr stage. we are desktop first
 */
export function useIsMobile(mobileScreenSize = DEVICE_BREAKPOINT.mobile) {
  const isMobileDevice = isMobileDetect({
    ua: navigator.userAgent,
    tablet: false,
  })

  const [isMobile, setIsMobile] = useState(isMobileDevice)

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.screen.width <= mobileScreenSize)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile
}
