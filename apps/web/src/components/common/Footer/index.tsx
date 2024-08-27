import { FootNav } from './FootNav'

export const Footer = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="">
          <FootNav
            title="无物"
            navs={[
              {
                name: '开始',
                href: '/choose',
              },
              {
                name: '无物 ID',
                href: '/pages/id',
              },
              {
                name: '服务',
                href: '/services',
              },
              {
                name: '价格',
                href: '/pricing',
              },
              {
                name: '参考案例',
                href: '/customers',
              },
              {
                name: '更新记录',
                href: '/updates',
              },
            ]}
          />
        </div>
        <div>
          <FootNav
            title="平台"
            navs={[
              {
                name: '概述',
                href: '/features',
              },
              {
                name: '规范',
                href: '/features/manage',
              },
              {
                name: '协作',
                href: '/features/collaborate',
              },
              {
                name: '采购',
                href: '/features/source',
              },
              {
                name: '交易',
                href: '/features/order',
              },
              {
                name: '生产',
                href: '/features/produce',
              },
              {
                name: '分析',
                href: '/features/analyze',
              },
            ]}
          />
        </div>
        <div>
          <FootNav
            title="探索"
            navs={[
              {
                name: '产品',
                href: '/products',
              },
              {
                name: '可持续性',
                href: '/properties',
              },
              {
                name: '原料',
                href: '/materials',
              },
              {
                name: '加工',
                href: '/processes',
              },
              {
                name: '成本降低',
                href: '/insights/reduce-your-packaging-costs',
              },
            ]}
          />
        </div>
        <div>
          <FootNav
            title="主编"
            navs={[
              {
                name: '博客',
                href: '/blog',
              },
              {
                name: '播客',
                href: '/wellmade',
              },
              {
                name: '视频',
                href: '/shippingthings',
              },
              {
                name: '在线研讨会',
                href: '/events',
              },
              {
                name: '照片墙',
                href: '/image-wall',
              },
              {
                name: '开发博客',
                href: '/studio',
              },
            ]}
          />
        </div>
        <div>
          <FootNav
            title="企业"
            navs={[
              {
                name: '关于',
                href: '/about',
              },
              {
                name: '报道',
                href: '/press',
              },
              {
                name: '领导层',
                href: '/team',
              },
              {
                name: '职业生涯',
                href: '/jobs',
              },
            ]}
          >
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://cptech.taobao.com"
              >
                淘宝店铺
              </a>
            </li>
          </FootNav>
        </div>
        <div>
          <FootNav
            title="资源"
            navs={[
              {
                name: '帮助文档',
                href: '/features',
              },
              {
                name: '状态',
                href: '/status',
              },
              {
                name: '质量标准',
                href: '/quality',
              },
              {
                name: '配送计划',
                href: '/delivery-schedule',
              },
              {
                name: '服务协议',
                href: '/terms',
              },
              {
                name: '隐私协议',
                href: '/privacy',
              },
            ]}
          />
        </div>
      </div>

      {/* <div gap={2} justify="center">
        <Col>
          <small className="d-block mb-3 text-muted">
            Copyright © 2006-2019 <a href="/blog">前端印象</a>
          </small>
          <br />
          <small>
            All Rights Reserved. <a href="/changelog">更新记录</a>
          </small>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="/">
                免责声明
              </a>
            </li>
            <li>
              <a className="text-muted" href="/">
                投诉建议
              </a>
            </li>
            <li>
              <a className="text-muted" href="/privacy">
                隐私政策
              </a>
            </li>
            <li>
              <a className="text-muted" href="/terms">
                Terms
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                agrement 用户协议
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                权利声明
              </a>
            </li>
          </ul>
        </div>
        <Col>
          <div className="col-2">
            <h5>特征</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="/terminology">
                  术语表
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  Random feature
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Col>
          <div className="col-2">
            <h5>商务</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="/support">
                  广告合作
                </a>
              </li>
              <li>
                <a className="text-muted" href="/">
                  在线投稿
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  corps 合作伙伴
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="http://wpa.qq.com/msgrd?v=3&uin=541330190&site=qq&menu=yes"
                >
                  <img
                    src="http://wpa.qq.com/pa?p=2:541330190:51"
                    alt="点击这里给我发消息"
                    title="点击这里给我发消息"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Col>
          <div className="col-2">
            <h5>资源</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="#">
                  Business
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  商家入驻
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  商家后台
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  商家社区
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Col>
          <div className="col-2">
            <h5>关于</h5>
            <ul className="list-unstyled text-small">
              <li>
                <a className="text-muted" href="/jobs">
                  招聘信息
                </a>
              </li>
              <li>
                <a className="text-muted" href="#">
                  联系我们
                </a>
              </li>
              <li>
                <a className="text-muted" href="/about">
                  关于我们
                </a>
              </li>
              <li>
                <a className="text-muted" href="/">
                  网站地图
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div md={24}>
          <ul className="nav col-11 footer-links ">
            <li className="nav-item">
              <span className="nav-link active">友情链接：</span>
            </li>
            <li className="nav-item">
              <a
                rel="nofollow"
                target="_blank"
                className="nav-link"
                href="http://cptech.taobao.com/"
              >
                海维包装厂
              </a>
            </li>
            <li className="nav-item">
              <a
                rel="nofollow"
                target="_blank"
                className="nav-link"
                href="http://wxtech.taobao.com/"
              >
                福顺包装厂
              </a>
            </li>
            <li className="nav-item">
              <a
                rel="nofollow"
                target="_blank"
                className="nav-link"
                href="https://lab.printlake.com"
              >
                实验室
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  )
}
