import Link from 'next/link'
import Layout from '@/components/common/Layout'

const AboutPage = (props) => {
  return (
    <div title="关于">
      <div className="sub-nav">
        <Link href="/about" passHref className="active">
          关于
        </Link>
        <Link href="/jobs">招聘</Link>
        <Link href="/team">团队</Link>
        <a href="">招聘</a>
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="mt30 flex justify-center">
          <div className="page-heading prose">
            <h1 className="text-center">关于海维包装</h1>
            <div>
              <p>海维包装是专注于包装行业的技术公司。</p>

              <p>
                根据 中华文明共和国国家标准 GB/T 4754-2017 《国民经济行业分类》
              </p>

              <p>本网站关注下面几个行业内容：</p>

              <p>1、纺织业</p>
              <p>2、纺织服装、服饰业</p>
              <p>3、造纸和纸制品业</p>
              <p>4、刷和记录媒介复制页</p>
              <p>5、文教、工美、体育和娱乐用品制造业</p>
              <p>6、橡胶和塑料制品业</p>
              <p>7、金属制造业</p>

              <p>主要是包装印刷纺织相关行业。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AboutPage.Layout = Layout

export default AboutPage
