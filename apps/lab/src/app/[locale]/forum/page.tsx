import { Footer } from '@/components/common/Footer'

/**
 * 迁移自 src/pages/forum/index.tsx。
 *
 * 原 getServerSideProps 在服务端取 GitHub star 数，
 * App Router 下页面本身即 Server Component，直接在此取数即可。
 */
async function getStars(): Promise<number> {
  try {
    const res = await fetch(
      // 'https://api.github.com/repos/wuwb/wuwb.github.io',
      'https://api.github.com/repos/huydhoang/next-mui-emotion'
    )
    const json = await res.json()
    return json.stargazers_count
  } catch {
    return 0
  }
}

export default async function Forum() {
  const stars = await getStars()

  return (
    <div>
      {stars}
      <Footer />
    </div>
  )
}
