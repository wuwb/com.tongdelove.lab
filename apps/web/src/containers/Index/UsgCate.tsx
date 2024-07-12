import Image from 'next/image';
import Link from 'next/link'
import { Row, Col, Divider } from 'antd';

const UsgCate = () => {
  return (
    <div className="product-block clearfix">
      <div className="product-head">
        <h3>用途分类</h3>
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
                  src="/assets/products/standrad/1.jpg"
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
                  1号餐盒
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
                  src="/assets/products/standrad/2.jpg"
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
                  2号餐盒
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
                  src="/assets/products/standrad/3.jpg"
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
                  3号餐盒
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
                  src="/assets/products/standrad/4.jpg"
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
                  4号餐盒
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
                  src="/assets/products/standrad/5.jpg"
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
                  5号餐盒
                  <br />
                </Link>
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UsgCate;
