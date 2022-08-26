import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Bar from 'bar';
import { BaseLayout } from '@/components/layouts';
import { Home } from '@/content/home/Home';
import { Header, Footer, Container } from '@/components/common';
import type { WithGetLayout } from '@/helper/WithGetLayout';

type IndexProps = {};

const HomePage: NextPage<IndexProps> & WithGetLayout = props => {
  return (
    <>
      <Header />
      <Container>
        <Home />
        <Bar />
        <Footer />
      </Container>
    </>
  );
};

HomePage.getLayout = function getLayout(page: JSX.Element) {
  return <BaseLayout>{page}</BaseLayout>;
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
