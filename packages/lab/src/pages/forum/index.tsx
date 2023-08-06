// import Bar from 'bar';
import { Footer } from '@/components/common/Footer';
import { Home } from '@/content/home/Home';
import Container from '@mui/material/Container';
import Router from 'next/router';

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
