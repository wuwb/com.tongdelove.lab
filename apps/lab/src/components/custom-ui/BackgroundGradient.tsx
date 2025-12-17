import clsx from 'clsx'

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div className={clsx('animate-fluid absolute -z-10 blur-3xl', className)} />
  )
}
