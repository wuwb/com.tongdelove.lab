import styled from '@emotion/styled'
import { Button } from '@/components/ui/button'

import Link from 'next/link'

const MainBanner = styled.div`
  text-align: center;
  padding: 100px 0;
`

export const Banner = () => {
  return (
    <MainBanner>
      <h1 className="main-banner__title">包装简化</h1>
      <h3 className="main-banner__desc">
        成千上万的电子商务公在半祥包装网以无与伦比的价格获得世界级的包装。
      </h3>
      <div className="main-banner__actions">
        <Link href="/get-started" className="btn btn-primary">
          <Button type="button">开始</Button>
        </Link>
      </div>
    </MainBanner>
  )
}
