import Footer from '@/components/Footer';
import Header from '@/components/Index/Header';
import { Helmet as Head, Link } from '@umijs/max';
import { Select, Table, Tag } from 'antd';

const { Option } = Select;

const renderData = () => {
  const data = [
    {
      shipment: '3140',
      destination: 'Content type',
      status: <Tag color="success">已发货</Tag>,
      estimatedDelivery: '2020-07-12',
      departureDate: '2020-07-12',
      type: '空运',
      carrier: '顺丰',
    },
    {
      shipment: '3141',
      destination: 'Content type',
      status: <Tag color="success">已发货</Tag>,
      estimatedDelivery: '-',
      departureDate: '',
      type: '',
      carrier: '',
    },
    {
      shipment: '3142',
      destination: 'Content type',
      status: <Tag color="secondary">待发货</Tag>,
      estimatedDelivery: '-',
      departureDate: '',
      type: '',
      carrier: '',
    },
  ];
  const columns = [
    { title: '装运编号', dataIndex: 'shipment', key: 'shipment' },
    { title: '目的地', dataIndex: 'destination', key: 'destination' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '预计收货时间', dataIndex: 'estimatedDelivery', key: 'estimatedDelivery' },
    { title: '发货时间', dataIndex: 'departureDate', key: 'departureDate' },
    { title: '发货方式', dataIndex: 'type', key: 'type' },
    { title: '装运公司', dataIndex: 'carrier', key: 'carrier' },
  ];

  return <Table dataSource={data} columns={columns} />;
};

const Home = () => {
  const handler = (val) => console.log(val);

  return (
    <>
      <Head>
        <title>物流管理</title>
      </Head>

      <Header>
        <Link to="/dashboard/shipments">配送</Link>
      </Header>

      <div>
        <div>装配</div>
        <div>
          <Select placeholder="选择工作方式" defaultValue="1" onChange={handler}>
            <Option value="1">远程工作</Option>
            <Option value="2">线下工作</Option>
          </Select>
        </div>
      </div>

      <div
        style={{
          padding: '0 24px',
        }}
      >
        {renderData()}
      </div>
      <Footer />
    </>
  );
};

export default Home;
