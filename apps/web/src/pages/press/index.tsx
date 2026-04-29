import { TinyNav } from '@/components/TinyNav'
import Head from 'next/head'
import { Layout } from '@/components/common'

const PressPage = () => (
  <>
    <Head>
      <title>报道</title>
    </Head>
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
          href: '/team',
        },
        {
          name: '报道',
          href: '/press',
        },
      ]}
    />
    <div className="press container">
      <div className="row">
        <div className="mt30 col-12">
          <div className="page-heading">
            <div>
              <p>
                半祥包装通过其简单的在线平台和全球工厂网络帮助电子商务公司生产令人难忘的可持续包装。
              </p>
              <p>想在半祥包装网站报道推广的产品？ 联系我们：i@printalke.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

PressPage.Layout = Layout

export default PressPage
