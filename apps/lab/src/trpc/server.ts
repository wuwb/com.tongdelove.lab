import { headers } from 'next/headers'
import { createCaller } from '@/server/trpc'
import { auth } from '@/auth'
import { createTRPCContext } from '@/server/trpc/context'

/**
 * RSC（Server Component）中调用 tRPC 的服务端入口。
 *
 * Server Component 运行在服务端，可以直接调用 procedure，
 * 不经过 HTTP，省去一次网络往返。
 */
const createContext = async () => {
  const heads = new Headers()
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    session: await auth(),
    headers: heads,
  })
}

/**
 * 调用前需显式创建 context：
 * `const trpc = createCaller(await createContext())`
 */
export { createContext, createCaller }

export type { TRPCContext } from '@/server/trpc/context'

/** 兼容旧引用：headers() 仅在需要透传请求头时使用 */
export const getRequestHeaders = () => headers()
