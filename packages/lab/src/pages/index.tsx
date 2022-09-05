import React from 'react';
import { Trans, useTranslation } from 'next-i18next';
// import Bar from 'bar';
import { DefaultLayout } from '@/components/layouts';
import { Home } from '@/content/home/Home';
import { Header, Footer, Container } from '@/components/common';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { NextPageWithLayout } from '@/types/app';

type IndexProps = {};

const HomePage: NextPageWithLayout<IndexProps> = props => {
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);


  const email = user?.email || '';


  return (
    <Container>
      <div>home</div>
      {isLoggedIn ? '已经登录了' : '未登录，请登录'}
      {email}
      {/* <Bar /> */}
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
    const res = await fetch(
      // 'https://api.github.com/repos/wuwb/wuwb.github.io',
      'https://api.github.com/repos/huydhoang/next-mui-emotion'
    );
    const json = await res.json();

    return {
      props: {
        stars: json.stargazers_count,
      },
    };
  } catch (error) {
    return {
      props: {
        stars: 0,
      },
    };
  }
}
