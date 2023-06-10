import { useTranslation } from 'next-i18next';
// import Bar from 'bar';
import { Container, Footer } from '@/components/common';
import { DefaultLayout } from '@/components/layouts';
import { Link } from '@/components/ui';
import { getRencentTasks } from '@/services/task';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';

type IndexProps = {
  tasks: any[];
};

const TaskBlock = (props) => {
  return (
    <div className="">
      <h3 className="">最近任务</h3>
      <div className="text-gray-700 bg-white p-5">
        {
          props.tasks.map(item => (
            <div key={item.id} className="leading-6 no-underline">
              <Link href={`/freelancer/task/${item.id}`}>
                {/* {new Date(item.time)} {item.title} */}
                {
                  // format(new Date(item.time), 'MM-dd HH:mm')
                }
                {item.title}
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

const HomePage: NextPageWithLayout<IndexProps> = props => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const email = user?.email || '';
  const { tasks } = props;

  return (
    <Container>
      <div className='banner-wrapper flex'>
        <div className="banner bg-white mr-5 w-40 h-10">
          banner 图片
        </div>
        <div className="w-20">公告</div>
      </div>
      {/* 显示最近 10 个任务 */}
      {
        tasks ? <TaskBlock tasks={tasks} /> : null
      }

      最新产品

      精选文章 - 最新文章

      合作伙伴

      <div className="">
        {/* <div>
          微信扫一扫，访问小程序
        </div> */}
        <div>
          <div></div>
          <div>
            <p>关注公众号，</p>
            <p>不定期分享成功的副业案例</p>
          </div>
        </div>
      </div>


      <Footer />
    </Container>
  );
};

HomePage.getLayout = function getLayout(page: JSX.Element) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default HomePage;

export async function getServerSideProps() {
  try {
    const res = await getRencentTasks();
    console.log('res: ', res);
    return {
      props: {
        tasks: res.data,
      },
    };
  } catch (error) {
    return {
      props: {
      },
    };
  }
}
