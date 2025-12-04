import React from 'react'
import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from '@tongdelove/ui/components/sonner'
// import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/GeneralError'
import { NotFoundError } from '@/features/errors/NotFoundError'

// const TanStackRouterDevtools = import.meta.env.MODE === 'production'
//   ? () => null // 生产环境返回空组件
//   : React.lazy(() =>
//       import('@tanstack/react-router-devtools').then((res) => ({
//         default: res.TanStackRouterDevtools,
//       })),
//     )

// const ReactQueryDevtools = import.meta.env.MODE === 'production'
//   ? () => null
//   : React.lazy(() =>
//       import('@tanstack/react-query-devtools').then((res) => ({
//         default: res.ReactQueryDevtools,
//       })),
//     )


export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  shadowRoot?: ShadowRoot
}>()({
  component: ({ context }) => {
    return (
      <>
        {/* <NavigationProgress /> */}
        <Outlet />
        <Toaster duration={5000} />
        {import.meta.env.MODE === 'development' && (
          <>
            {/* <ReactQueryDevtools
              buttonPosition='bottom-left'
              shadowDOMTarget={context.shadowRoot}
            /> */}
            {/* <TanStackRouterDevtools position='bottom-right' /> */}
          </>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
