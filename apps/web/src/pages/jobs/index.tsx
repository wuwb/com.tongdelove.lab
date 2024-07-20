import TinyNav from '@/components/TinyNav'
import styled from '@emotion/styled'
import { Row, Col } from 'antd'
import { Layout } from '@/components/common'

const StyledJobs = styled.div`
  .page-heading {
    padding: 120px;
  }
  .page-title {
    text-align: center;
  }
  .job-wrap {
    margin-bottom: 50px;
  }
  .job-category {
    margin-top: 30px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
  .job-item {
    overflow: hidden;
  }
  .job-item p {
    float: left;
    font-size: 18px;
  }
  .job-item span {
    float: right;
    color: #999;
    font-size: 14px;
  }
`

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
    <StyledJobs>
      <Row>
        <div className="col-12 mt30">
          <div className="page-heading">
            <h1 className="page-title">帮助重塑制造业。</h1>
            <div>
              在海维包装，我们建立了包装软件和供应链，帮助您喜爱的在线品牌更精美，可持续和经济地生产产品。
              听起来是不是很有趣？你会喜欢这里的。
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <Col>
          <div className="job-wrap">
            <h3 className="job-category">技术</h3>
            <div>
              <a href="">
                <div className="job-item">
                  <p>高级UX设计师</p>
                  <span className="base">浙江杭州</span>
                </div>
              </a>
              <a href="">
                <div className="job-item">
                  <p>全栈开发工程师</p>
                  <span>浙江杭州</span>
                </div>
              </a>
            </div>
          </div>

          <div className="job-wrap">
            <h3 className="job-category">印前</h3>
            <div>
              <a href="">
                <div className="job-item">
                  <p>包装设计师</p>
                  <span>浙江杭州</span>
                </div>
              </a>
            </div>
          </div>

          <div className="job-wrap">
            <h3 className="job-category">销售</h3>
            <div>
              <a href="">
                <div className="job-item">
                  <p>业务经理</p>
                  <span>浙江杭州</span>
                </div>
              </a>
              <a href="">
                <div className="job-item">
                  <p>企业销售总监</p>
                  <span>浙江杭州</span>
                </div>
              </a>
              <a href="">
                <div className="job-item">
                  <p>销售负责人</p>
                  <span>浙江杭州</span>
                </div>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </StyledJobs>
  </>
)

Home.Layout = Layout

export default Home
