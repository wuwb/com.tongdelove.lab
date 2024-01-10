import Header from '@/components/Index/Header';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet as Head } from '@umijs/max';
import { Button, Image, Pagination, Row } from 'antd';

function Clients() {
  const items = [
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
    {
      title: '飞机盒',
      size: '18 x 15 x 7',
    },
  ];

  return (
    <PageContainer>
      <>
        <Head>
          <title>物料列表</title>
        </Head>
        <Header />
        <div>
          <div>
            <h1>物料</h1>
            <div>
              <Button auto type="success">
                添加物料
              </Button>
            </div>
          </div>
          {/* <Page size="large">
          123
        </Page> */}
          <div
            style={{
              margin: '0 12px',
            }}
          >
            <Row>
              {items.map((item) => {
                return (
                  <Row key={item} xs={12} sm={6} md={4.8} lg={4} xl={3}>
                    <div
                      style={{
                        margin: '1rem',
                        backgroundColor: 'yellow',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            margin: '-16pt',
                          }}
                        >
                          <Image src="/assets/dashboard/demo.png" alt="" />
                        </div>
                        <div
                          style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          飞机盒
                          <br />
                          18&quot; x 15&quot; x 7&quot;
                        </div>
                      </div>
                      {/* <Image src="/assets/dashboard/demo.png" /> */}
                    </div>
                  </Row>
                );
              })}
            </Row>
          </div>
          <div>
            <Pagination count={20} initialPage={3} />
          </div>
        </div>
      </>
    </PageContainer>
  );
}

export default Clients;
