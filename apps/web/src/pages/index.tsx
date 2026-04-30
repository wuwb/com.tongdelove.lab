import { Seo } from '@/components/common/Seo'
import { Col4Demo } from '@/containers/Index'
import { Solution } from '@/containers/Index/Solution'
import { Customers } from '@/containers/Index/Customers'
import { Ready } from '@/containers/Index/Ready'
import { Layout } from '@/components/common'
import { CustomCarousel } from '@/components/ui/CustomCarousel'
import Banner1 from '@/containers/Index/1.png'
import Banner2 from '@/containers/Index/2.png'

const IndexPage = (props) => {
  return (
    <>
      <Seo
        title="首页"
        description="半祥包装 - 专业的印刷包装解决方案提供商，提供胶印、凹版印刷、包装盒定制等一站式包装印刷服务。"
        url="/"
        type="website"
      />
      <CustomCarousel
        images={[
          {
            url: Banner1,
          },
          {
            url: Banner2,
          },
        ]}
      />
      <div className="container mx-auto">
        <Col4Demo />
        <div className="flex flex-col items-center gap-8">
          {/* 解决方案 */}
          <Solution />
          {/* 客户 */}
          <Customers />
          {/* 准备好了吗 */}
          <Ready />
        </div>
      </div>
    </>
  )
}

IndexPage.Layout = Layout

export default IndexPage
