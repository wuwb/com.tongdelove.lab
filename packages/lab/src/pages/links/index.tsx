import { BaseLayout } from '@/components/layouts';
import Daohang from '@/content/Applications/Links/index';

// ## 运营数据
// https://lunarcrush.com/
// https://app.santiment.net/#screeners
// https://www.similarweb.com/zh/

// 圆圈拉线成图算法
// https://github.com/jiang1997/image2seq

function DaohangPage(): JSX.Element {
  return (
    <div>
      <Daohang />
    </div>
  );
}

DaohangPage.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default DaohangPage;
