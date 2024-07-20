import { Row, Col } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

export const Home = () => {
  return (
    <div className="product-block clearfix">
      <div className="product-head">
        <h3>结构分类</h3>
      </div>
      <div className="row">
        <div className="col-xl-2">
          <div className="sub-section">自热包装盒</div>
        </div>
        <Row gutter={16} className="justify-center">
          <Col className="product-wrap">
            <div className="product">
              <Link href="" className="action-hover">
                <Image
                  width={260}
                  height={260}
                  src="https://via.placeholder.com/500x500/eee"
                  alt=""
                />
              </Link>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <Link
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                </Link>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <Link href="" className="action-hover">
                <Image
                  width={260}
                  height={260}
                  src="https://via.placeholder.com/500x500/eee"
                  alt=""
                />
              </Link>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <Link
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </Link>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <Link href="" className="action-hover">
                <Image
                  width={260}
                  height={260}
                  src="https://via.placeholder.com/500x500/eee"
                  alt=""
                />
              </Link>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <Link
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </Link>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <Link href="" className="action-hover">
                <Image
                  width={260}
                  height={260}
                  src="https://via.placeholder.com/500x500/eee"
                  alt=""
                />
              </Link>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <Link
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </Link>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <Link href="" className="action-hover">
                <Image
                  width={260}
                  height={260}
                  src="https://via.placeholder.com/500x500/eee"
                  alt=""
                />
              </Link>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <Link
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </Link>
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
