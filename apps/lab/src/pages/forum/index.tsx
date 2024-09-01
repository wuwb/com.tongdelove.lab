import { Footer } from '@/components/common/Footer'
import { Home } from '@/components/HomePage/Home'
import { Container } from '@mantine/core'

function Forum(props): any {
  return (
    <Container>
      <Home />
      {props.stars}
      <Footer />
    </Container>
  )
}

export default Forum

export async function getServerSideProps() {
  try {
    const res = await fetch(
      // 'https://api.github.com/repos/wuwb/wuwb.github.io',
      'https://api.github.com/repos/huydhoang/next-mui-emotion'
    )
    const json = await res.json()

    return {
      props: {
        stars: json.stargazers_count,
      },
    }
  } catch (error) {
    return {
      props: {
        stars: 0,
      },
    }
  }
}
