import { useTranslation } from 'next-i18next';
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

const Page: NextPageWithLayout<IndexProps> = props => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const email = user?.email || '';
  const { tasks } = props;

  return (
    <Container>
      {
        tasks ? <TaskBlock tasks={tasks} /> : null
      }

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

Page.getLayout = function getLayout(page: JSX.Element) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Page;

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
