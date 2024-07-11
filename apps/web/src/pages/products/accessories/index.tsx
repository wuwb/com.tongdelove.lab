import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col } from 'antd';

const Page = () => {
  return (
    <>
      <Head>
        <title>包装附件</title>
      </Head>
      <style jsx>{`
        .row-banner {
          padding-top: 16px;
        }
        .top-news {
          float: left;
          height: 390px;
          width: 552px;
          overflow: hidden;
          position: relative;
        }

        .row-main {
          padding-top: 16px;
        }
        /* sub-nav */
        .sub-nav {
        }
        .sub-nav ul {
          float: left;
          font-weight: 700;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .sub-nav ul li {
          float: left;
          font-size: 16px;
          margin-right: 24px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          padding-top: 3px;
          position: relative;
        }
        .article-item--list {
          padding: 15px;
          margin-bottom: 8px;
          background-color: #fff;
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.05);
          height: 164px;
          overflow: hidden;
        }
        .article-item--list .article-image {
          float: left;
          width: 175px;
          height: 124px;
          position: relative;
        }
        .article-item--list .article-info {
          margin-left: 195px;
        }
        .article-item--list h3 {
          max-width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 18px;
          min-height: 25px;
        }

        .article-item--list h3 a {
          color: #333;
        }

        .article-item--list h3 a:hover {
          color: #ef2f11;
        }

        .article-item--list .article-summary {
          font-size: 16px;
          color: #666;
          margin-top: 8px;
          line-height: 18px;
          height: 37px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .article-item--list .article-meta {
          height: 26px;
          line-height: 26px;
          margin-top: 28px;
        }

        .article-item--list .article-meta time {
          font-size: 1.2rem;
        }

        .article-item--list .article-meta .author-info {
          float: left;
          position: relative;
          padding-left: 36px;
          margin-right: 30px;
        }

        .article-item--list .article-meta .author-info span {
          font-size: 1.4rem;
          margin-left: 0;
        }

        .article-item--list .article-meta .author-info img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .product-block {
          width: 100%;
        }
        .product-head .product-title {
          font-size: 22px;
          margin-top: 40px;
          padding-bottom: 30px;
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .product-body {
        }
        .fl {
          float: left;
        }
        .sub-section {
          font-size: 16px;
        }
        .product-wrap {
        }
        .product-wrap .product {
          background: #f7f6f5;
          text-align: left;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
        }
        .product-wrap img {
          width: 100%;
        }
        .product-detail {
          text-align: center;
        }
        .product-detail h4 a {
          font-size: 14px;
          text-align: center;
          color: #666;
        }

        .row-banner .popover {
          width: 400px;
          -webkit-border-top-left-radius: 0px;
          -webkit-border-bottom-left-radius: 0px;
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          overflow: hidden;
        }
        .row-banner .popover-content {
          text-align: center;
        }
        .row-banner .popover-content img {
          height: 212px;
          max-width: 250px;
        }
        .row-banner .dropdown-menu {
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        }
        .row-banner .dropdown-menu > li > a:hover {
          background-image: none;
          color: white;
          background-color: rgb(0, 129, 194);
          background-color: rgba(0, 129, 194, 0.5);
        }
        .row-banner .dropdown-menu > li > a.maintainHover {
          color: white;
          background-color: #0081c2;
        }
        .help-block {
          margin-top: 20px;
          border-top: 1px solid #ddd;
          padding: 120px;
          text-align: center;
        }
        .help-block h3 {
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="container-fluid">
        <div className="product-block clearfix">
          <div className="product-head">
            <h3 className="product-title">包装辅料</h3>
          </div>

          <Row>
            <Col span={4} lg={4} className="col-xl-2">
              <div className="sub-section"></div>
            </Col>
            <Col span={20} lg={4} className="col-xl-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover relative">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/1.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/">
                        <a>珍珠棉卷</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <Link href="/" passHref>
                      <a href="" className="action-hover">
                        <Image
                          width="100"
                          height="100"
                          src="/assets/products/accessories/2.jpg"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          填充料
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/3.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          标贴商品
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/4.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          空气垫
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/5.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          空气填充料
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/6.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          胶带
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/7.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          气泡卷
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/8.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          背胶袋
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/9.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          打包带
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/10.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          包裹辅料
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/11.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          封箱辅料
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/12.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          缠绕膜
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/13.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          封箱器
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/14.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          捆扎辅料
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/15.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          标签
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        width="100"
                        height="100"
                        src="/assets/products/accessories/16.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          空气柱
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            <div className="help-block clearfix">
              <div className="content">
                <h3>没找到你所需要的产品？</h3>
                <div className="btn btn-primary">寻求报价</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Page
