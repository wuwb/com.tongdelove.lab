import { cn } from '@tongdelove/ui/lib/utils'

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('animate-pulse bg-neutral-200', className)} {...props} />
  )
}
