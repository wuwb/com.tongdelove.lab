import { Row, Col } from 'antd';
import Image from 'next/image';

const Home = () => {
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
              <a href="" className="action-hover">
                <Image width={260} height={260} src="https://via.placeholder.com/500x500/eee" />
              </a>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <a
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                </a>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <a href="" className="action-hover">
                <Image width={260} height={260} src="https://via.placeholder.com/500x500/eee" />
              </a>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <a
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </a>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <a href="" className="action-hover">
                <Image width={260} height={260} src="https://via.placeholder.com/500x500/eee" />
              </a>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <a
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </a>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <a href="" className="action-hover">
                <Image width={260} height={260} src="https://via.placeholder.com/500x500/eee" />
              </a>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <a
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </a>
              </h4>
            </div>
          </Col>
          <Col className="product-wrap">
            <div className="product">
              <a href="" className="action-hover">
                <Image width={260} height={260} src="https://via.placeholder.com/500x500/eee" />
              </a>
            </div>
            <div className="product-detail">
              <h4 className="box-title">
                <a
                  href="/products/corrugated-mailer-boxes"
                  className="action-hover"
                >
                  咖啡管式盒
                  <br />
                </a>
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
