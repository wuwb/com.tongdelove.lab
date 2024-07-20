import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Row, Col, Button } from 'antd'
import { Layout } from '@/components/common'

const Home = () => {
  return (
    <>
      <Head>
        <title>Features</title>
      </Head>

      <div className="py-20 text-center">
        <h1 className="text-2xl">将你的包装工作链路迁移到线上。</h1>
        <p className="mt-5 text-xl">
          从采购到交付，我们为您的团队提供可视化的控制整个包装供应链路。
        </p>
      </div>

      <div
        className="bg-white"
        style={{
          backgroundColor: '#f7f6f5',
        }}
      >
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <div className="grid grid-cols-12 py-10">
            <div className="col-span-5">
              <div className="px-20 py-36">
                <h3 className="text-lg font-bold">在线合作开发和生产包装。</h3>
                <p className="mt-5">
                  我们将您的项目从孤立的电子邮件，分散的电子表格中带入协作的在线空间。
                </p>
                <p>我们的包装专家是您团队的延伸。</p>
                <Link href="/features/collaborate">
                  <a className="mt-5 block">有关协作的更多信息→</a>
                </Link>
              </div>
            </div>
            <div className="relative col-span-7">
              <Image
                layout="fill"
                src="/assets/features/collaborate.png"
                alt=""
              />
            </div>
          </div>

          <Row justify="center" className="py-10">
            <Col md={13}>
              <Image layout="fill" src="/assets/features/quote.png" alt="" />
            </Col>
            <Col md={11}>
              <div className="px-20 py-36">
                <h3 className="text-lg font-bold">直接从工厂获得最佳价格。</h3>
                <p className="mt-5">
                  每年在寻找最优惠的价格上节省数百小时的时间。我们直接从最适合您需求的工厂那里获取报价。
                </p>
                <p>我们的包装专家是您团队的延伸。</p>
                <Link href="/features/source">
                  <a className="mt-5 block">有关采购的更多信息→</a>
                </Link>
              </div>
            </Col>
          </Row>

          <Row justify="center" className="py-10">
            <Col md={11}>
              <div className="px-20 py-36">
                <h3 className="text-lg font-bold">简化您的下单工作流程。</h3>
                <p className="mt-5">
                  轻松将一个订单拆分到多个工厂，多个发货地址进行生产，从而节省大量时间。
                </p>
                <Link href="/features/order">
                  <a className="mt-5 block">有关购买的更多信息→</a>
                </Link>
              </div>
            </Col>
            <Col md={13}>
              <Image alt="" layout="fill" src="/assets/features/order.png" />
            </Col>
          </Row>

          <Row justify="center" className="py-10">
            <Col md={13}>
              <Image alt="" layout="fill" src="/assets/features/proof.png" />
            </Col>
            <Col md={11}>
              <div className="px-20 py-36">
                <h3 className="text-lg font-bold">在云端存储你的所有数据。</h3>
                <p className="mt-5">
                  在开始生产之前，请确保每个细节都是正确的。
                  我们对打样审批流程进行了标准化，以帮助您避免错误发生。
                </p>
                <Link href="/features/source">
                  <a className="mt-5 block">有关打样的更多信息→</a>
                </Link>
              </div>
            </Col>
          </Row>

          <Row justify="center" className="py-10">
            <Col md={11}>
              <div className="p-20">
                <h3 className="text-lg font-bold">实时更新每个项目。</h3>
                <p className="mt-5">
                  提供实时了解包装状态的能力。随着生产和运输进度，跟踪每个阶段的状态更新。
                </p>
                <Link href="/features/produce">
                  <a className="mt-5 block">有关生产的更多信息→</a>
                </Link>
              </div>
            </Col>
            <Col md={13}>
              <Image
                alt=""
                layout="fill"
                src="/assets/features/production.png"
              />
            </Col>
          </Row>

          <Row justify="center" className="py-10">
            <Col md={13}>
              <Image alt="" layout="fill" src="/assets/features/analyze.png" />
            </Col>
            <Col md={11}>
              <div className="px-20 py-36">
                <h3 className="text-lg font-bold">利用数据做出更好的决策。</h3>
                <p className="mt-5">
                  发现季节性模式，验证战略变更并预测您的需求。
                  我们的分析功能可帮助您分析包装支出和使用情况。
                </p>
                <Link href="/features/analyze">
                  <a className="mt-5 block">有关分析的更多信息→</a>
                </Link>
              </div>
            </Col>
          </Row>

          <Row justify="center" className="py-10">
            <Col md={11}>
              <div className="px-20 py-36">
                <h3 className="text-lg font-bold">每个SKU的鸟瞰图。</h3>
                <p className="mt-5">
                  我们使您的团队可以集中访问公司使用的每个包装组件。
                </p>
                <p>在统一的地方查看产品价格，规格，素材和订单历史记录。</p>
                <Link href="/features/produce">
                  <a className="mt-5 block">有关数据管理的更多信息→</a>
                </Link>
              </div>
            </Col>
            <Col md={13}>
              <Image
                alt=""
                layout="fill"
                src="/assets/features/manage-items.png"
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="p-36 text-center">
        <h3>准备升级您的供应链了吗？ 让我们向您展示我们可以做什么。</h3>
        <Link href="/join" passHref>
          <a>
            <Button className="mt-5">开始→</Button>
          </a>
        </Link>
      </div>
    </>
  )
}

Home.Layout = Layout

export default Home
