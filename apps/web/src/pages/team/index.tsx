import Link from 'next/link'
import Head from 'next/head'
import { TinyNav } from '@/components/TinyNav'
import { Button, Row, Col } from 'antd'
import { Layout } from '@/components/common'
import s from './Team.module.css'

const Page = () => (
  <>
    <Head>
      <title>团队</title>
    </Head>

    <div>
      <TinyNav
        navs={[
          {
            name: '关于',
            href: '/about',
          },
          {
            name: '招聘',
            href: '/jobs',
          },
          {
            name: '团队',
            href: '/pages/team',
          },
          {
            name: '报道',
            href: '/press',
          },
        ]}
      />
      <Row className="flex justify-center">
        <Col>
          <div className={s.pageHeading}>
            <h1 className={s.pageTitle}>我们是海维包装</h1>
            <p>
              我们的专业知识来自于从采购到审计，结构工程，数据科学，物流，
              <br />
              可持续性等各个领域的数十年的第一手经验。
            </p>
            <Link href="/jobs" passHref>
              <Button className={s.action}>想加入我们吗？</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  </>
)

Page.Layout = Layout

export default Page
