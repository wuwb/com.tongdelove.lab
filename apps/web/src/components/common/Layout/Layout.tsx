import { useState } from 'react'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { useAcceptCookies } from '@/hooks/useAcceptCookies'
import { FeatureBar } from '@/components/common/FeatureBar'
import { Button } from '@/components/ui/button'

export const Layout = (props) => {
  const { children, pageContext } = props
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const [bannerIsShown, setBannerIsShown] = useState(true)

  const navBarlinks = [
    {
      label: 'ALL',
      href: '/all',
    },
  ]
  const notificationBanner = {}

  return (
    <div>
      <Header />
      <main className="fit">{children}</main>
      <Footer />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={() => onAcceptCookies()}>
            Accept cookies
          </Button>
        }
      />
    </div>
  )
}
