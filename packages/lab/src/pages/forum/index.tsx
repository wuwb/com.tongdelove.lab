import React from 'react';
// import Bar from 'bar';
import Router from 'next/router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { DefaultLayout } from '@/components/layouts';
import { Home } from '@/content/home/Home';
import { Footer } from '@/components/common/Footer';
import { Header } from '@/components/common/Header';

function ForumPage(props): any {
  const handleRedirectToDashboards = () => {
    Router.push('/admin/dashboard');
  };

  return (
    <Container maxWidth="lg">
      <Home />
      {/* <Bar /> */}
      {props.stars}
      <Footer />
    </Container>
  );
}

ForumPage.getLayout = function getLayout(page: JSX.Element) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ForumPage;

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
