import React, { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';

class Page extends Component {
  render() {
    return (
      <>
        <style jsx>{`
          .row-banner {
            padding-top: 16px;
          }
          .top-news {
            position: relative;
            float: left;
            width: 552px;
            height: 390px;
            overflow: hidden;
          }

          .row-main {
            padding-top: 16px;
          }
          /* sub-nav */
          .sub-nav {
          }
          .sub-nav ul {
            float: left;
            margin: 0;
            padding: 0;
            font-weight: 700;
            list-style: none;
          }
          .sub-nav ul li {
            position: relative;
            float: left;
            height: 30px;
            margin-right: 24px;
            padding-top: 3px;
            font-size: 16px;
            line-height: 30px;
            cursor: pointer;
          }
          .article-item--list {
            position: relative;
            height: 164px;
            margin-bottom: 8px;
            padding: 15px;
            overflow: hidden;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.05);
          }
          .article-item--list .article-image {
            position: relative;
            float: left;
            width: 175px;
            height: 124px;
          }
          .article-item--list .article-info {
            margin-left: 195px;
          }
          .article-item--list h3 {
            max-width: 100%;
            min-height: 25px;
            overflow: hidden;
            font-size: 18px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .article-item--list h3 a {
            color: #333;
          }

          .article-item--list h3 a:hover {
            color: #ef2f11;
          }

          .article-item--list .article-summary {
            display: -webkit-box;
            height: 37px;
            margin-top: 8px;
            overflow: hidden;
            color: #666;
            font-size: 16px;
            line-height: 18px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .article-item--list .article-meta {
            height: 26px;
            margin-top: 28px;
            line-height: 26px;
          }

          .article-item--list .article-meta time {
            font-size: 1.2rem;
          }

          .article-item--list .article-meta .author-info {
            position: relative;
            float: left;
            margin-right: 30px;
            padding-left: 36px;
          }

          .article-item--list .article-meta .author-info span {
            margin-left: 0;
            font-size: 1.4rem;
          }

          .article-item--list .article-meta .author-info img {
            position: absolute;
            top: 0;
            left: 0;
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }

          .product-block {
            width: 100%;
          }
          .product-head .product-title {
            margin-top: 40px;
            margin-bottom: 20px;
            padding-bottom: 30px;
            font-size: 22px;
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
            width: 100%;
            height: 0;
            padding-bottom: 100%;
            text-align: left;
            background: #f7f6f5;
          }
          .product-wrap img {
            width: 100%;
          }
          .product-detail {
            text-align: center;
          }
          .product-detail h4 a {
            color: #666;
            font-size: 14px;
            text-align: center;
          }

          .row-banner .popover {
            width: 400px;
            overflow: hidden;
            -webkit-border-top-left-radius: 0px;
            border-top-left-radius: 0px;
            -webkit-border-bottom-left-radius: 0px;
            border-bottom-left-radius: 0px;
          }
          .row-banner .popover-content {
            text-align: center;
          }
          .row-banner .popover-content img {
            max-width: 250px;
            height: 212px;
          }
          .row-banner .dropdown-menu {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
          }
          .row-banner .dropdown-menu > li > a:hover {
            color: white;
            background-color: rgb(0, 129, 194);
            background-color: rgba(0, 129, 194, 0.5);
            background-image: none;
          }
          .row-banner .dropdown-menu > li > a.maintainHover {
            color: white;
            background-color: #0081c2;
          }
          .help-block {
            margin-top: 20px;
            padding: 120px;
            text-align: center;
            border-top: 1px solid #ddd;
          }
          .help-block h3 {
            margin-bottom: 1rem;
          }
        `}</style>

        <div className="container-fluid">
          <div className="product-block clearfix">
            <div className="product-head">
              <h3 className="product-title">折叠纸盒</h3>
            </div>
            <div className="row">
              <div className="col-xl-2"></div>
              <div className="col-xl-10">
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/1.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒一</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/2.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒二</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/3.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒三</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/4.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒四</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/5.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒五</a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/6.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒六</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/7.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒七</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/8.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒八</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒四</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒五</a>
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒一</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒二</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒三</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒四</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">自热盒五</a>
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
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">筷子</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">叉勺</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">吸管</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">牙签</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">纸巾</a>
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
                      <Image width={100} height={100} src="/assets/products/c1.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">铝箔保温袋一</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/c2.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">铝箔保温袋二</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/c3.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">铝箔保温袋三</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="/assets/products/c4.jpg" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">外卖打包袋</a>
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="product-wrap">
                  <div className="product">
                    <a href="" className="action-hover">
                      <Image width={100} height={100} src="https://via.placeholder.com/500/EFEFEF/999999?text=printlake.com" />
                    </a>
                  </div>
                  <div className="product-detail">
                    <h4 className="box-title">
                      <Link href="/products/corrugated-mailer-boxes">
                        <a className="action-hover">冷藏保鲜袋</a>
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-block clearfix">
            <div className="content">
              <h3>没找到你所需要的产品？</h3>
              <div className="btn btn-primary">寻求报价</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Page;
