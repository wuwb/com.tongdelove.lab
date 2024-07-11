import styled from '@emotion/styled';
import { Button } from 'antd';
import Link from 'next/link';

const MainBanner = styled.div`
  text-align: center;
  padding: 100px 0;
`;

const Page = () => {
  return (
    <MainBanner>
      <h1 className="main-banner__title">包装简化</h1>
      <h3 className="main-banner__desc">
        成千上万的电子商务公在海维包装网以无与伦比的价格获得世界级的包装。
      </h3>
      <div className="main-banner__actions">
        <Link href="/get-started">
        <a className="btn btn-primary" href="/get-started">
          <Button type="primary">开始</Button>
        </a>
        </Link>
      </div>
    </MainBanner>
  );
}

export default Page;
