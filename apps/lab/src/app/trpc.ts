import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { type AppRouter } from '@/server/trpc/root'
import superjson from 'superjson'
import { env } from '@/env/server'

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${env.NEXTAUTH_URL}/api/trpc`,
      // url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
    }),
  ],
})
