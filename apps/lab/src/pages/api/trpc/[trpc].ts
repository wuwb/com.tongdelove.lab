import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '@/server/trpc/root'
import { createTRPCContext } from '@/server/trpc/context'
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from '@/env/server'

export const config = {
  runtime: 'nodejs',
}

// export API handler
const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          if (error.code === 'INTERNAL_SERVER_ERROR') {
            // send to bug reporting
            console.error('Something went wrong', error)
          }
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          )
        }
      : undefined,
  /**
   * Enable query batching
   */
  batching: {
    enabled: true,
  },
  /**
   * @link https://trpc.io/docs/caching#api-response-caching
   */
  // responseMeta() {
  //   // ...
  // },
})

export default function handleApiHelloRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We can use the response object to enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }
  // finally pass the request on to the tRPC handler
  return nextApiHandler(req, res)

  // res.send(sayHello('world loaded from /api/hello'));
}
