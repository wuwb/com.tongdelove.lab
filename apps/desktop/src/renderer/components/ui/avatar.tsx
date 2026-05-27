import * as React from 'react'
import { cn } from '@/renderer/lib/utils'

const AvatarContext = React.createContext<{
  loading?: 'eager' | 'lazy'
}>({})

interface AvatarProps extends React.ComponentPropsWithoutRef<'span'> {
  loading?: 'eager' | 'lazy'
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(({ className, loading, ...props }, ref) => {
  return (
    <AvatarContext.Provider value={{ loading }}>
      <span
        ref={ref}
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
      />
    </AvatarContext.Provider>
  )
})
Avatar.displayName = 'Avatar'

interface AvatarImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src?: string
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, onLoadingStatusChange, alt, ...props }, ref) => {
    const { loading } = React.useContext(AvatarContext)
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')

    React.useEffect(() => {
      if (src) {
        setStatus('loading')
        onLoadingStatusChange?.('loading')
      }
    }, [src, onLoadingStatusChange])

    if (!src) return null

    return (
      <img
        ref={ref}
        src={src}
        alt={alt || ''}
        loading={loading || 'eager'}
        onLoad={() => {
          setStatus('loaded')
          onLoadingStatusChange?.('loaded')
        }}
        onError={() => {
          setStatus('error')
          onLoadingStatusChange?.('error')
        }}
        className={cn('aspect-square h-full w-full', className)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = 'AvatarImage'

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<'span'> {
  delayMs?: number
  name?: string
}

const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, delayMs, name, children, ...props }, ref) => {
    const [showFallback, setShowFallback] = React.useState(!delayMs)

    React.useEffect(() => {
      if (delayMs) {
        const timer = setTimeout(() => setShowFallback(true), delayMs)
        return () => clearTimeout(timer)
      }
    }, [delayMs])

    if (!showFallback) return null

    let displayContent = children
    if (name && !children) {
      displayContent = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <span
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
          className
        )}
        {...props}>
        {displayContent}
      </span>
    )
  }
)
AvatarFallback.displayName = 'AvatarFallback'

const AvatarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-space-x-2 flex items-center justify-end', className)} {...props} />
  )
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
