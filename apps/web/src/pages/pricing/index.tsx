import { Row, Col, Table, Button } from 'antd';
import Head from 'next/head';
import { Layout } from '@/components/common';

const Home = () => {
  const columns = [
    {
      title: '',
      dataIndex: 'condation',
      key: 'condation',
    },
    {
      title: '传统供应商',
      dataIndex: 'other',
      key: 'other',
    },
    {
      title: '我们',
      dataIndex: 'us',
      key: 'us',
    },
  ];

  const networkData = [
    {
      key: '1',
      condation: '工厂审查和积分卡', // "Factory vetting and scorecards",
      other: '-',
      us: '✓',
    },
    {
      key: '2',
      condation: '标准化的质量控制', // "Standardized quality control",
      other: '-',
      us: '✓',
    },
    {
      key: '3',
      condation: '透明的价格', // "Price transparency",
      other: '-',
      us: '✓',
    },
    {
      key: '4',
      condation: '中国各个地区的工厂', // "Factories in every region of the US and Asia",
      other: '-',
      us: '✓',
    },
    {
      key: '5',
      condation: '覆盖所有电商包装类型', // "Factories for all ecommerce packaging types",
      other: '-',
      us: '✓',
    },
    {
      key: '6',
      condation: '多种付款条款',
      other: '✓',
      us: '✓',
    },
  ];

  const softwarePlatformData = [
    {
      key: '1',
      condation: '规范管理', // "Specifications management",
      other: '-',
      us: '✓',
    },
    {
      key: '2',
      condation: '无物 ID',
      other: '-',
      us: '✓',
    },
    {
      key: '3',
      condation: '采购和报价', //  "Sourcing and quoting",
      other: '-',
      us: '✓',
    },
    {
      key: '4',
      condation: '采购工作流', // "Purchasing workflows",
      other: '-',
      us: '✓',
    },
    {
      key: '5',
      condation: '过程审批和文档存储', // "Proof approval and document storage",
      other: '-',
      us: '✓',
    },
    {
      key: '6',
      condation: '实时生产跟踪', // "Real-time production tracking",
      other: '-',
      us: '✓',
    },
    {
      key: '7',
      condation: '实时货运跟踪', // "Real-time freight tracking",
      other: '-',
      us: '✓',
    },
    {
      key: '8',
      condation: '在线支付处理', // "Online payment processing",
      other: '-',
      us: '✓',
    },
    {
      key: '9',
      condation: '数据分析',
      other: '-',
      us: '✓',
    },
  ];

  const expertServicesData = [
    {
      key: '1',
      condation: '专用账户支持', // "Dedicated account support",
      other: '✓',
      us: '✓',
    },
    {
      key: '2',
      condation: '规范导入', // "Specifications import",
      other: '-',
      us: '✓',
    },
    {
      key: '3',
      condation: '托管 RFP', // "Managed RFP",
      other: '-',
      us: '✓',
    },
    {
      key: '4',
      condation: '账单合并', // "Billing consolidation",
      other: '-',
      us: '✓',
    },
    {
      key: '5',
      condation: '打样和预生产', // "Proofing and preproduction",
      other: '✓',
      us: '✓',
    },
    {
      key: '6',
      condation: '生产管理', // Production management
      other: '✓',
      us: '✓',
    },
    {
      key: '7',
      condation: '货运订舱和物流', // "Freight booking and logistics",
      other: '✓',
      us: '✓',
    },
    {
      key: '8',
      condation: '解决质量问题', // "Quality issue resolution",
      other: '✓',
      us: '✓',
    },
  ];

  return (
    <div title="价格">
      <div className="container mx-auto">
        <div className="banner text-center py-10">
          <h1 className="title text-2xl font-bold">匹配你的业务需求的定价方案。</h1>
          <p className="desc text-md mt-5">
            We believe that a healthy supply chain operates on a foundation of
            trust. That's why our business model is transparent from the ground
            up.
          </p>
          <Button className="mt-10">开始 →</Button>
          <div className="grid grid-cols-3 gap-20 mt-20">
            <div className="col-span-1 px-36">
              Price transparency We do not hide behind opaque margins. Lumi
              shows you the true costs from every manufacturer.
            </div>
            <div className="col-span-1 px-36">
              Save as you scale Pricing scales predictably based on your
              company's packaging usage, so you lower costs as you grow.
            </div>
            <div className="col-span-1 px-20">
              Unbundled costs No recurring fees for non-recurring work. You
              always know exactly what you're paying for.
            </div>
          </div>
        </div>
        <div className="content">
          <Row gutter={32}>
            <Col span={16}>
              <h3 className="title text-xl font-bold">海维包装提供哪些服务?</h3>
              <div className="section mt-5">
                <div className="title text-lg mb-2">工厂网络</div>
                <Table
                  columns={columns}
                  dataSource={networkData}
                  pagination={false}
                  bordered={true}
                  size="small"
                />
              </div>
              <div className="section mt-10">
                <div className="title text-lg mb-2">软件平台</div>
                <Table
                  columns={columns}
                  dataSource={softwarePlatformData}
                  pagination={false}
                  bordered={true}
                  size="small"
                />
              </div>
              <div className="section mt-10">
                <div className="title text-lg mb-2">专业服务</div>
                <Table
                  columns={columns}
                  dataSource={expertServicesData}
                  pagination={false}
                  bordered={true}
                  size="small"
                />
              </div>
            </Col>
            <Col span={8} className="py-32">
              <div className="more-service-1">
                Additional services are available directly in the platform with
                flat rate pricing. <br />
                Packaging engineering Custom dielines ISTA/ASTM testing On-site
                quality control Short run prototyping Factory auditing Learn
                more
              </div>
              <div className="more-service-2 mt-10">
                A network of partners is available to help you integrate Lumi
                into your supply chain. <br />
                Inventory tracking Inventory planning Just-in-time delivery
                ERP/WMS integrations
              </div>
            </Col>
          </Row>

          <div className="text-center py-36">
            <p className="font-bold text-2xl">来看看海维包装如何优化你的供应链吧。</p>
            <Button className="mt-10">Get started →</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.Layout = Layout;

export default Home;
