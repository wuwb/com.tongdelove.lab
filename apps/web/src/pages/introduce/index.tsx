import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Row } from 'antd'
import { Layout } from '@/components/common'
import { Marquee } from '@/components/ui'
import { Banner, Belt } from '@/containers/introduce'

const Page = () => {
  const beltData = [
    {
      name: 'Field Co.',
      image: '/assets/introduce/show-18-fieldco.jpg',
      industry: '炊具',
      description: 'Specialized box for this Kickstarter-funded skillet',
    },
    {
      name: 'Wall Street Journal',
      image: '/assets/introduce/show-19-wsj.jpg',
      industry: '生活方式',
      description: "Defining WSJ's new e‑commerce brand",
    },
    {
      name: 'Blackbox',
      image: '/assets/introduce/show-01-blackbox.jpg',
      industry: 'Fulfillment',
      description:
        'High‑volume boxes delivered to warehouses across the&nbsp;country',
    },
    {
      name: 'ShaveFace',
      image: '/assets/introduce/show-02-shaveface.jpg',
      industry: '美容',
      description: 'Sharply printed on a flexographic&nbsp;press',
    },
    {
      name: 'UNIF',
      image: '/assets/introduce/show-03-unif.jpg',
      industry: '时尚',
      description: 'Poly mailers in a wide variety of&nbsp;sizes',
    },
    {
      name: 'Cratejoy',
      image: '/assets/introduce/show-04-cratejoy.jpg',
      industry: 'Subscription platform',
      description: 'The standard-issue box for Cratejoy&nbsp;merchants',
    },
    {
      name: 'Primary',
      image: '/assets/introduce/show-05-primary.jpg',
      industry: "Kid's clothing",
      description: 'Rotogravure print with seven spot&nbsp;colors',
    },
    {
      name: 'Howtoons',
      image: '/assets/introduce/show-06-howtoons.jpg',
      industry: "Kid's subscription",
      description: 'Bold graphics directly on&nbsp;corrugate',
    },
    {
      name: 'Intercom',
      image: '/assets/introduce/show-07-intercom.jpg',
      industry: 'Messaging platform',
      description: 'Promotional boxes made&nbsp;affordable',
    },
    {
      name: 'Unbound',
      image: '/assets/introduce/show-08-unbound.jpg',
      industry: 'Erotic subscription',
      description: 'New drawstring bag designs every&nbsp;month',
    },
    {
      name: 'MailChimp',
      image: '/assets/introduce/show-09-mailchimp.jpg',
      industry: 'Merchandise',
      description: 'Powering packaging for an experimental&nbsp;store',
    },
    {
      name: 'Parachute Home',
      image: '/assets/introduce/show-12-parachute.jpg',
      industry: 'Bedding',
      description: 'A full packaging suite, from boxes to&nbsp;stickers',
    },
    {
      name: 'Supergoop!',
      image: '/assets/introduce/show-20-supergoop.jpg',
      industry: 'Skincare',
      description: 'Making cardboard feel as bright as&nbsp;sunlight',
    },
    {
      name: 'Love Yourz',
      image: '/assets/introduce/show-21-loveyourz.jpg',
      industry: 'Lifestyle',
      description: 'Simple pink boxes bring delight to every&nbsp;order',
    },
    {
      name: 'Ritual Roasters',
      image: '/assets/introduce/show-13-ritual.jpg',
      industry: 'Coffee subscription',
      description: 'A reliable combination of blank and custom&nbsp;items',
    },
    {
      name: 'Cotton Bureau',
      image: '/assets/introduce/show-14-cottonbureau.jpg',
      industry: 'T-shirts',
      description: 'Colorful mailers that brighten&nbsp;mailboxes',
    },
    {
      name: 'MeUndies',
      image: '/assets/introduce/show-17-meundies.jpg',
      industry: 'Underwear',
      description: 'Big savings on high-volume mailer&nbsp;pouches',
    },
    {
      name: 'Rockets of&nbsp;Awesome',
      image: '/assets/introduce/show-10-rockets.jpg',
      industry: "Kid's clothing",
      description: 'Custom mylar bags with a Space Age&nbsp;look',
    },
    {
      name: 'Sock Fancy',
      image: '/assets/introduce/show-15-sockfancy.jpg',
      industry: 'Sock subscription',
      description: 'Saving big on mailer&nbsp;pouches',
    },
    {
      name: 'Benny Gold',
      image: '/assets/introduce/show-16-bennygold.jpg',
      industry: 'Streetwear',
      description: 'Saving big on mailer&nbsp;pouches',
    },
    {
      name: 'Threadless',
      image: '/assets/introduce/show-11-threadless.jpg',
      industry: 'T-shirts',
      description: 'Eco-friendly bag at lower&nbsp;costs',
    },
  ]
  const BeltList = beltData.map((item, index) => (
    <Belt
      key={item.name}
      name={item.name}
      image={item.image}
      industry={item.industry}
      description={item.description}
    />
  ))

  return (
    <>
      <Head>
        <title>介绍</title>
      </Head>
      <div className="container-fluid">
        <Banner />

        <Row>
          <Col>
            <div className="main-wrap ps4">
              <div className="pt1 customers commodity">
                <div className="conveyor-belt-container">
                  <div className="conveyor-belt-wrapper">
                    <div className="conveyor-belt belt-section">
                      <Marquee>{BeltList}</Marquee>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard center flex">
                <div className="dashboard__features">
                  <h3 className="title">
                    从源头到交付, 海维包装优化了您的包装供应链
                    <Link href="/features" className="action">
                      了解更多
                    </Link>
                  </h3>

                  <div className="features__items clearfix">
                    <div className="column">
                      <h4 className="strong">Source</h4>
                      <p>Request quotes for new&nbsp;items you&nbsp;need</p>
                    </div>
                    <div className="column">
                      <h4 className="strong">Design</h4>
                      <p>Manage your dielines and&nbsp;artwork files</p>
                    </div>
                    <div className="column">
                      <h4 className="strong">Purchase</h4>
                      <p>Pay online and re‑order&nbsp;easily</p>
                    </div>
                    <div className="column">
                      <h4 className="strong">Track</h4>
                      <p>Check in on the progress of your&nbsp;deliveries</p>
                    </div>
                  </div>
                </div>
                <div className="wrap-l pn2">
                  <div className="ui-frame">
                    <div className="ui-frame-screen">
                      <Image
                        alt=""
                        width={300}
                        height={300}
                        src="/assets/introduce/Items.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="others pn4 ps4 mn2 dh center">
                <div className="wrap-m" id="design">
                  <h2 className="c cc ps4" style={{ paddingBottom: '4rem' }}>
                    为了降低您的包装的生产成本，我们做了非常多的努力。
                  </h2>
                  <div className="row row-extra-padding row-top">
                    <div className="col">
                      <div className="">
                        <h4 className="strong">
                          无论您是每月运送数千或数百万个订单，您的购买力都会因加入海维包装而放大。
                        </h4>
                        <p>
                          海维包装汇集了像您这样的数千家企业的需求，为世界上最好的工厂提供无与伦比的价格。
                        </p>
                      </div>
                    </div>
                    <div className="col">
                      <div className="">
                        <h4 className="strong">
                          您的业务正在发展，您的供应链也应如此。
                        </h4>
                        <p>
                          现在可能工作的东西可能在六个月内不起作用。
                          随着您的业务增长，海维包装有助于预测隐藏的成本并定期重新评估您的包装，以确保您无缝扩展。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-8 pb-4 pt-4">
                <div className="wrap-m" style={{ width: '800px' }}>
                  <h3 className="c">Case studies</h3>

                  <a href="/case-studies/parachute">
                    <div className="bg-gray-light mb-8 mt-2">
                      <div className="row row-no-padding flex justify-center">
                        <div className="col-6 mr-2">
                          <Image
                            alt=""
                            width={300}
                            height={300}
                            src="/assets/introduce/parchute-unboxing.jpg"
                          />
                        </div>
                        <div className="col-4">
                          <div className="ppa ssl ssr">
                            <h4 className="strong">Parachute Home</h4>
                            <h4>
                              We made Parachute's packaging more reliable and
                              affordable so that everyone can sleep&nbsp;better.
                            </h4>
                            <span className="st action">Read more →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a href="/case-studies/meundies">
                    <div className="bg mt-2">
                      <div className="row row-no-padding flex justify-center">
                        <div className="col-6 mr-2">
                          <Image
                            alt=""
                            width={300}
                            height={300}
                            src="/assets/introduce/meundie-pink-spring.jpg"
                          />
                        </div>
                        <div className="col-4">
                          <div className="ppa ssl ssr">
                            <h4 className="strong">MeUndies</h4>
                            <h4>
                              We reduced costs and streamlined the design of
                              fun, seasonal variations for the signature
                              MeUndies&nbsp;pouch.
                            </h4>
                            <span className="st action">Read more →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mn4 ms4 dh" id="knolling">
                <div
                  className="cc pn3 ps4 c"
                  style={{
                    width: '35em',
                    maxWidth: '90%',
                    margin: '0 auto',
                  }}
                >
                  <h3>我们的功能可以从数千个单元无缝扩展到数百万个单元。</h3>
                  <h4>
                    包装盒，邮寄包，袋子，胶带，信封，填充物，贴纸，所有尺寸均可提供，包括印刷和空白。
                  </h4>
                </div>
              </div>

              <div className="services">
                <Col>
                  <Row>互联网+包装</Row>
                  <Row>融入云计算、大数据、物联网技术</Row>
                </Col>
                <Col>
                  <Row>持续降低成本</Row>
                  <Row>简化生产流程、工艺，优化包装方案</Row>
                </Col>
                <Col>
                  <Row>多品类管理</Row>
                  <Row>产品组合、库存管理、新产品开发</Row>
                </Col>
                <Col>
                  <Row>设计及咨询</Row>
                  <Row>针对性专业设计，专业在线咨询</Row>
                </Col>
              </div>

              <div>
                <div>行业解决方案</div>
                <Row>
                  <Col>医疗</Col>
                  <Col>消费电子</Col>
                  <Col>电商</Col>
                </Row>
                <Row>
                  <Col>汽车</Col>
                  <Col>通讯</Col>
                  <Col>其他</Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

Page.Layout = Layout

export default Page
