import { auth } from '@/auth'
import { SessionData } from '@/components/auth-test/session-data'

/**
 * 迁移自 src/pages/auth-test/server-example/index.tsx。
 *
 * 原实现用 getServerSideProps + 手写 fetch('/api/auth/session') 拿 session，
 * App Router 下可直接用 next-auth 的 auth()，无需自行拼 URL 与转发 header。
 */
export default async function Page() {
  const serverSession = await auth()

  return (
    <div className="mx-auto mt-10 max-w-screen-md space-y-4">
      <h1 className="text-3xl font-bold">Server-side session Usage</h1>
      <p className="leading-loose">
        This page is server-rendered using <code>auth()</code>.
      </p>
      <SessionData session={serverSession} />
    </div>
  )
}
