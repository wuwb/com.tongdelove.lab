import type { FC } from 'react'
import FooterWaves from '@/public/images/layout/footer-waves.svg'

export const MainFooter: FC = () => {
  return (
    <div className="grid">
      <div className="bgImage">
        <FooterWaves className="absolute block w-full object-cover" />
      </div>
    </div>
  )
}
