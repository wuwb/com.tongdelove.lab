import type { ClassValue } from 'clsx'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeParamsFromPath(path: string, params: string[]) {
  const url = new URL(path)
  params.forEach((param) => {
    url.searchParams.delete(param)
  })
  return url.toString()
}
