import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/trpc/root'
import { createTRPCContext } from '@/server/trpc/context'
import { auth } from '@/auth'
import { env } from '@/env/server'

/**
 * App Router 下的 tRPC endpoint。
 *
 * 原实现在 pages/api/trpc/[trpc].ts（NextApiRequest/NextApiResponse），
 * 这里改用 fetch adapter，session 由 next-auth v5 的 auth() 解析。
 */

const onError =
  env.NODE_ENV === 'development'
    ? ({ path, error }: { path?: string; error: Error }) => {
        if (error.name === 'INTERNAL_SERVER_ERROR') {
          console.error('Something went wrong', error)
        }
        console.error(
          `x tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
        )
      }
    : undefined

const createContext = async (req: Request) => {
  const session = await auth()

  return createTRPCContext({
    session,
    headers: req.headers,
  })
}

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError,
  })

export { handler as GET, handler as POST }
