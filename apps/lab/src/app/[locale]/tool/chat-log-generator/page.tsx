'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { trpc } from '@/utils/trpc'


// 原 create-t3-app 模板残留的 metadata 导出。
// 本文件是 client component（'use client'），App Router 不允许 client
// 组件导出 metadata，编译期会直接报错，故移除；页面标题由 [locale]/layout.tsx 统一提供。

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  )
}

function AuthShowcase() {
  const { data: sessionData } = useSession()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}
