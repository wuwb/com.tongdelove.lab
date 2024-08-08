import {
  QueryClient,
  QueryClientProvider,
  defaultContext,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  /**
   * Query client configuration
   * @see https://tanstack.com/query/v4/docs/react/reference/QueryClient
   */
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const queryClientContext = defaultContext

export { QueryClientProvider, queryClient, queryClientContext }
