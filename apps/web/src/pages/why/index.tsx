import Head from 'next/head'
import Image from 'next/image'
import { Row, Col } from 'antd'
import { Layout } from '@/components/common'
import { Hero } from '@/components/ui'

const Page = () => {
  return (
    <>
      <Head>
        <title>为什么选我们</title>
      </Head>

      <div className="mx-auto max-w-screen-lg">
        <div className="banner p-20 text-center font-bold">
          <h2 className="text-2xl">在一个控制面板里管理你所有的包装产品。</h2>
          <p className="mt-4 text-xl">从采购到交付，印合包装控制面板帮助你的团队全面掌控包装供应链</p>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <h3 className="pt-20 text-lg">每个 SKU 的管理视图。</h3>
            <div className="mt-5">
              <p>仪表板使您的团队可以集中访问公司使用的每种包装样式。</p>
              <p>在一个位置访问定价，规格，校样和订单历史记录。</p>
            </div>
          </div>
          <div className="col-span-8">
            <div className="webshot-wrap clearfix max-w-full">
              <div className="webshot">
                <Image alt="" width={640} height={442} src="/assets/why/Items.png" />
              </div>
            </div>
          </div>
        </div>

        <Row justify="center">
          <Col span={16}>
            <div className="webshot-wrap clearfix">
              <div className="webshot" style={{ float: 'right' }}>
                <Image alt="" width={640} height={442} src="/assets/why/Cart.png" />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <h3>每个 SKU 的管理视图。</h3>
            <div>
              <p>仪表板使您的团队可以集中访问公司使用的每种包装样式。</p>
              <p>在一个位置访问定价，规格，校样和订单历史记录。</p>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={8}>
            <h3>每个 SKU 的管理视图。</h3>
            <div>
              <p>仪表板使您的团队可以集中访问公司使用的每种包装样式。</p>
              <p>在一个位置访问定价，规格，校样和订单历史记录。</p>
            </div>
          </Col>
          <Col span={16}>
            <div className="webshot-wrap clearfix">
              <div className="webshot">
                <Image alt="" width={640} height={442} src="/assets/why/Proof.png" />
              </div>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={16}>
            <div className="webshot-wrap clearfix">
              <div className="webshot" style={{ float: 'right' }}>
                <Image alt="" width={640} height={442} src="/assets/why/Checkout.png" />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <h3>每个 SKU 的管理视图。</h3>
            <div>
              <p>仪表板使您的团队可以集中访问公司使用的每种包装样式。</p>
              <p>在一个位置访问定价，规格，校样和订单历史记录。</p>
            </div>
          </Col>
        </Row>

        <Row justify="center">
          <Col span={8}>
            <h3>每个 SKU 的管理视图。</h3>
            <div>
              <p>仪表板使您的团队可以集中访问公司使用的每种包装样式。</p>
              <p>在一个位置访问定价，规格，校样和订单历史记录。</p>
            </div>
          </Col>
          <Col span={16}>
            <div className="webshot-wrap clearfix">
              <div className="webshot">
                <Image alt="" width={640} height={442} src="/assets/why/Shipments.png" />
              </div>
            </div>
          </Col>
        </Row>

        <Hero headline="准备好升级你的供应链了吗？" description="马上开始 （ 内测 ）" />
      </div>
    </>
  )
}

Page.Layout = Layout

export default Page
