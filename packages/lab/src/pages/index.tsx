import { Container } from '@/components/common';
import { getRencentTasks } from '@/server/task';
import { useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';
import { useTranslation } from 'next-i18next';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "@/utils/api";
import { Footer } from '@/components/layouts/components/BaseLayout/Footer'

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
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const email = user?.email || '';
  const { tasks } = props;

  // {
  //   tasks ? <TaskBlock tasks={tasks} /> : null
  // }

  return (
    <>
      <Container>
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
        <AuthShowcase />
      </Container>
      <Footer />
    </>
  );
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

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
