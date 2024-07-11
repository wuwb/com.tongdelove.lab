import Head from 'next/head';
import { Row, Col } from 'antd';
// import 'antd/lib/row/style/css';
// import 'antd/lib/col/style/css';
import { Banner, Col4Demo } from '@/containers/Index';
import Solution from '@/containers/Index/Solution';
import Customers from '@/containers/Index/Customers';
import Ready from '@/containers/Index/Ready';
import { Layout } from '@/components/common';

const Home = (props) => {
  return (
    <>
      <Head>
        <title>海维包装</title>
        <meta name="description" content="印刷,包装,包装供应链" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <div className="container mx-auto">
        <Col4Demo />
        <Row justify="center">
          <Col md={24}>
            {/* 解决方案 */}
            <Solution />
          </Col>
          <Col md={24}>
            {/* 客户 */}
            <Customers />
          </Col>
          <Col md={24}>
          </Col>
        </Row>
        {/* 准备好了吗 */}
        <Ready />
      </div>
    </>
  );
};

Home.Layout = Layout;

export default Home;
