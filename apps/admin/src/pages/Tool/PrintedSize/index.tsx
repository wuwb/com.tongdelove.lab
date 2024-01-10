import PrintedSize from '@/assets/printed-size.jpg';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Image } from 'antd';

function Page() {
  return (
    <PageContainer>
      <Card>
        <Image src={PrintedSize} alt="" />
      </Card>
    </PageContainer>
  );
}

export default Page;
