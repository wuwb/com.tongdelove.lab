import { TinyNav } from '@/components/TinyNav'
import { Layout } from '@/components/common'

const Home = () => (
  <>
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
    <div>
      <div>
        <div className="col-12 mt30">
          <div className="p-[120px]">
            <h1 className="text-center">帮助重塑制造业。</h1>
            <div>
              在海维包装，我们建立了包装软件和供应链，帮助您喜爱的在线品牌更精美，可持续和经济地生产产品。
              听起来是不是很有趣？你会喜欢这里的。
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="mb-[50px]">
            <h3 className="job-category my-7 border-b pb-5">技术</h3>
            <div>
              <a href="">
                <div className="flex items-center justify-between overflow-hidden">
                  <p className="text-[18px]">高级UX设计师</p>
                  <span className="text-[14px] text-[#999]">浙江杭州</span>
                </div>
              </a>
              <a href="">
                <div className="flex items-center justify-between overflow-hidden">
                  <p className="text-[18px]">全栈开发工程师</p>
                  <span className="text-[14px] text-[#999]">浙江杭州</span>
                </div>
              </a>
            </div>
          </div>

          <div className="mb-[50px]">
            <h3 className="job-category my-7 border-b pb-5">印前</h3>
            <div>
              <a href="">
                <div className="flex items-center justify-between overflow-hidden">
                  <p className="text-[18px]">包装设计师</p>
                  <span className="text-[14px] text-[#999]">浙江杭州</span>
                </div>
              </a>
            </div>
          </div>

          <div className="mb-[50px]">
            <h3 className="job-category my-7 border-b pb-5">销售</h3>
            <div>
              <a href="">
                <div className="flex items-center justify-between overflow-hidden">
                  <p className="text-[18px]">业务经理</p>
                  <span className="text-[14px] text-[#999]">浙江杭州</span>
                </div>
              </a>
              <a href="">
                <div className="flex items-center justify-between overflow-hidden">
                  <p className="text-[18px]">企业销售总监</p>
                  <span className="text-[14px] text-[#999]">浙江杭州</span>
                </div>
              </a>
              <a href="">
                <div className="flex items-center justify-between overflow-hidden">
                  <p className="text-[18px]">销售负责人</p>
                  <span className="text-[14px] text-[#999]">浙江杭州</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

Home.Layout = Layout

export default Home
