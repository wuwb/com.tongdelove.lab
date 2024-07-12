import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styled from '@emotion/styled'
import { Hero } from '@/components/ui'

const Page = () => {
  return (
    <>
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
          float: left;
          width: 19%;
          margin: 0.5%;
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

        .left-sidebar {
          width: calc(49vw - 550px);
          min-width: 220px;
          overflow-x: hidden;
          overflow-y: scroll;
        }
        .main {
          -ms-flex: 1;
          flex: 1;
          padding: 0 2vw 0 1vw;
          overflow: scroll;
        }
      `}</style>

      <div className="layout-vertical container-fluid">
        <div className="flex">
          <div className="left-sidebar pt-1">筛选</div>
          <div className="main product-block clearfix">
            <div className="product-head">
              <h3 className="product-title">用途分类</h3>
            </div>
            <div className="row">
              <div className="col-xl-2">
                <div className="sub-section">自热包装盒</div>
              </div>
              <div className="col-xl-10">
                <div className="product-wrap">
                  <div className="product">
                    <Link href="/">
                      <a href="" className="action-hover">
                        <Image
                          alt=""
                          width={540}
                          height={540}
                          src="/assets/products/standrad/1.jpg"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒一
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/2.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒二
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/3.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒三
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/4.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒四
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/5.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒五
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/6.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒六
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/7.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒七
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/8.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒八
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒四
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒五
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒一
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒二
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒三
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒四
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          自热盒五
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-2">
                <div className="sub-section">外卖包装配件</div>
              </div>
              <div className="col-xl-10">
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          筷子
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          叉勺
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          吸管
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          牙签
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          纸巾
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-2">
                <div className="sub-section">保温袋包装</div>
              </div>
              <div className="col-xl-10">
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/c1.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          铝箔保温袋一
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/c2.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          铝箔保温袋二
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/c3.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          铝箔保温袋三
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="/assets/products/standrad/c4.jpg"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          外卖打包袋
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image
                        alt=""
                        width={540}
                        height={540}
                        src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com"
                      />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a href="" className="action-hover">
                          冷藏保鲜袋
                        </a>
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Hero headline="没找到你所需要的产品？" description="寻求报价" />
      </div>
    </>
  )
}

export default Page
