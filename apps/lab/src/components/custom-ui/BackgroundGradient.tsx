import clsx from 'clsx'
import { motion } from 'framer-motion'

export function BackgroundGradient({ className }: { className?: string }) {
  return (
    <div className={clsx('animate-fluid absolute -z-10 blur-3xl', className)} />
  )
}
