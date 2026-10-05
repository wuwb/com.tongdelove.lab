import type { Session } from 'next-auth'

/**
 * tRPC 上下文（App Router 版本）。
 *
 * 原实现依赖 Pages Router 的 NextApiRequest/NextApiResponse，
 * App Router 下改为从 fetch 的 Request/Response 读取信息。
 *
 * 注意：lab 不持有数据库连接，数据访问统一通过 services/server 完成，
 * 因此 context 中不注入 prisma client。
 */

export interface TRPCContext {
  session: Session | null
  headers: Headers
}

/**
 * 生成供内部使用的 tRPC 上下文。
 */
const createInnerTRPCContext = (opts: TRPCContext): TRPCContext => ({
  session: opts.session,
  headers: opts.headers,
})

/**
 * 处理每个到达 /api/trpc 的请求。
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: {
  headers: Headers
  session?: Session | null
}): Promise<TRPCContext> => {
  return createInnerTRPCContext({
    session: opts.session ?? null,
    headers: opts.headers,
  })
}
