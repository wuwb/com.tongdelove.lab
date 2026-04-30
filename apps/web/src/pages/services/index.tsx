import Link from 'next/link'
import { Layout } from '@/components/common'
import { Seo } from '@/components/common/Seo'

const Page = () => {
  const data = [
    '采购',
    '产品管理',
    '工厂审核',
    '生产管理',
    '物流管理',
    'ISTA / ASTM 测试',
    '现场质量控制',
    '即时库存',
    '可持续发展策略',
    'ERP / WMS 集成',
  ]

  return (
    <>
      <Seo
        title="服务"
        description="半祥包装提供全方位的包装服务，包括包装工程、艺术设计、定制印刷、样品制作、物流管理等一站式包装解决方案。"
        url="/services"
        type="website"
      />
      <div className="services pt-10 pb-10">
        <div>
          <div className="banner">
            <h3>包装工程</h3>
            <p>我们的专家可以帮助您设计，实现和测试可用于生产的解决方案。</p>
            <Link href="/">了解更多→</Link>
          </div>
          <dl>
            <dt>艺术设计</dt>
            <dd>与我们的设计师沟通定制商标和设计</dd>
            <dt>定制印刷稿</dt>
            <dd>使用我们可自定义的模具线为您的艺术品打底</dd>
            <dt>定制白盒样品</dt>
            <dd>确保盒子形状可以匹配你的产品</dd>
            <dt>定制彩盒样品</dt>
            <dd>使用你的设计图制作高保真样品</dd>
            <dt>定制内托</dt>
            <dd>为你的包装定制内托</dd>
          </dl>
        </div>
        <div className="more-service">
          <div className="title">
            <h3>联系我们的团队获取更多的服务</h3>
            <Link href="/">开始→</Link>
          </div>
          <ul className="list-inside list-disc space-y-2">
            {data.map((item) => {
              return <li key={item}>{item}</li>
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

Page.Layout = Layout

export default Page
