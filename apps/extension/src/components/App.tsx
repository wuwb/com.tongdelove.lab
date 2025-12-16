import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@tongdelove/ui/lib/utils'
import { Button } from '@tongdelove/ui/components/button'
import { storage } from '#imports'
import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { routeTree } from '@/routeTree.gen'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/context/ThemeProvider'
import { STORAGE_KEY_HIDE_ALERT } from '@/constants/app'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

interface AppRootProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shadowRoot?: ShadowRoot
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (import.meta.env.DEV) console.log({ failureCount, error })

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return !(error instanceof AxiosError && [401, 403].includes(error.response?.status ?? 0))
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        // handleServerError(error)

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error('Content not modified!')
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error('Session expired!')
          // useAuthStore.getState().auth.reset()
          const redirect = `${router.history.location.href}`
          router.navigate({ to: '/sign-in', search: { redirect } })
        }
        if (error.response?.status === 500) {
          toast.error('Internal Server Error!')
          // Only navigate to error page in production to avoid disrupting HMR in development
          if (import.meta.env.PROD) {
            router.navigate({ to: '/500' })
          }
        }
        if (error.response?.status === 403) {
          // router.navigate("/forbidden", { replace: true });
        }
      }
    },
  }),
})

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // 初始路径
})

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    shadowRoot: undefined,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  history: memoryHistory,
})

export const AppRoot = ({ open, onOpenChange, shadowRoot }: AppRootProps) => {
  const [hideAlert, setHideAlert] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      const storedValue = await storage.getItem<boolean>(STORAGE_KEY_HIDE_ALERT)
      // 默认为 false
      setHideAlert(!!storedValue)
    }
    loadSettings()
  }, [])

  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [open])

  return (
    <div
      style={{ display: open ? 'flex' : 'none' }}
      className={cn(
        'fixed inset-0 z-[99999] items-center justify-center bg-black/20',
        open ? 'animate-in fade-in-0' : ''
      )}
    >
      {/* bg masker */}
      <div className="absolute inset-0" onClick={() => onOpenChange(false)} />
      <div
        id="temu-admin-content"
        className={cn(
          'relative bg-white shadow-lg w-full border sm:rounded-lg flex flex-col overflow-hidden',
          "bg-background text-foreground has-[div[data-variant='inset']]:bg-sidebar",
          'bg-white'
        )}
        style={{
          margin: '20px',
          width: 'calc(100vw - 40px)',
          height: 'calc(100vh - 40px)',
          maxWidth: 'none',
          maxHeight: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 z-50" />
            <span className="sr-only ">Close</span>
          </Button>
        </div>

        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <div className="h-full w-full isolate">
                <RouterProvider
                  router={router}
                  context={{
                    shadowRoot,
                  }}
                />
              </div>
            </ThemeProvider>
          </QueryClientProvider>
        </StrictMode>
      </div>
    </div>
  )
}
