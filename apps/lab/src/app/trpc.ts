import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { type AppRouter } from '@/server/trpc/root'
import superjson from 'superjson'

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${process.env.NEXTAUTH_URL}/api/trpc`,
      // url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
    }),
  ],
})
