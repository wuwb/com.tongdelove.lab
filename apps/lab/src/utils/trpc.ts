/**
 * This is the client-side entrypoint for your tRPC API.
 * It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, httpLink, loggerLink, splitLink } from '@trpc/client'
import { type AppRouter } from '@/server/trpc/root'
import { createTRPCNext } from '@trpc/next'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'
import { queryClient, queryClientContext } from '@/clients/cache'
import fetchPonyfill from 'fetch-ponyfill'
import { env } from '@/env/client'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '' // browser should use relative url
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  }
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

const linksConfig = [
  splitLink({
    condition(op) {
      // check for context property `skipBatch`
      return op.context.skipBatch === true
    },
    // when condition is true, use normal request
    true: httpLink({
      // vercel issue with fetch undici
      fetch: fetchPonyfill().fetch,
      url: `${getBaseUrl()}/api/trpc`,
    }),
    // when condition is false, use batching
    false: httpBatchLink({
      fetch: fetchPonyfill().fetch,
      url: `${getBaseUrl()}/api/trpc`,
    }),
  }),
  httpBatchLink({
    /**
     * Transformer used for data de-serialization from the server.
     *
     * @see https://trpc.io/docs/data-transformers
     */
    transformer: superjson,
    // The server needs to know your app's full url
    url: `${getBaseUrl()}/api/trpc`,
    /**
     * Set custom request headers on every request from tRPC
     * @link https://trpc.io/docs/v10/header
     */
    // headers() {
    //   if (ctx?.req) {
    //     // To use SSR properly, you need to forward the client's headers to the server
    //     // This is so you can pass through things like cookies when we're server-side rendering

    //     // If you're using Node 18, omit the "connection" header
    //     const {
    //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //       connection: _connection,
    //       ...headers
    //     } = ctx.req.headers;
    //     return {
    //       ...headers,
    //       // Optional: inform server that it's an SSR request
    //       "x-ssr": "1",
    //     };
    //   }
    //   return {};
    // },
  }),
  loggerLink({
    enabled: (opts) =>
      env.ENABLE_TRPC_LOGGER === 'true' &&
      ((process.env.NODE_ENV === 'development' &&
        typeof window !== 'undefined') ||
        (opts.direction === 'down' && opts.result instanceof Error)),
  }),
]

/** A set of type-safe react-query hooks for your tRPC API. */
export const trpc = createTRPCNext<AppRouter>({
  reactQueryContext: queryClientContext,

  config({ ctx }) {
    // if (typeof window !== "undefined") {
    //   // during client requests
    //   return {
    //     transformer: superjson, // optional - adds superjson serialization
    //     links: [
    //       loggerLink({
    //         enabled: (_) => false,
    //       }),
    //       splitLink({
    //         condition(op) {
    //           // check for context property `skipBatch`
    //           return op.context.skipBatch === true
    //         },
    //         // when condition is true, use normal request
    //         true: httpLink({
    //           url: `${getBaseUrl()}/api/trpc`,
    //         }),
    //         // when condition is false, use batching
    //         false: httpBatchLink({
    //           url: `${getBaseUrl()}/api/trpc`,
    //         }),
    //       }),
    //       httpBatchLink({
    //         url: "/api/trpc",
    //       }),
    //     ],
    //     /**
    //       * Query client configuration
    //       * @see https://tanstack.com/query/v4/docs/react/reference/QueryClient
    //       */
    //     queryClientConfig: {
    //       defaultOptions: {
    //         queries: {
    //           staleTime: 1000 * 60 * 2, // 2 minutes
    //           cacheTime: 1000 * 60 * 10, // 10 minutes
    //           refetchOnWindowFocus: false,
    //           retry: false,
    //         },
    //       },
    //     },
    //   };
    // }

    return {
      queryClient,
      /**
       * Transformer used for data de-serialization from the server.
       * optional - adds superjson serialization
       * @see https://trpc.io/docs/data-transformers
       */
      transformer: superjson,

      /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
      links: linksConfig,
      /**
       * Query client configuration
       * @see https://tanstack.com/query/v4/docs/react/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 2, // 2 minutes
            cacheTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      },
    }
  },
  /**
   * Whether tRPC should await queries when server rendering pages.
   *
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: false,
  // transformer: superjson,
})

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>
