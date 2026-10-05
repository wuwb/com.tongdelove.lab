'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
  useSearchParams,
  useParams,
} from 'next/navigation'

/**
 * App Router 下的 useRouter 兼容层。
 *
 * Pages Router 的 useRouter 提供 query / asPath / locale / events 等
 * App Router 没有直接对应物的能力，业务组件仍按 pages 语义调用。
 * 这里在不改变调用方式的前提下补齐这些字段，
 * 待全部页面迁到 App Router 后可直接删除。
 */
export type CompatRouter = {
  pathname: string
  route: string
  asPath: string
  query: Record<string, string | string[] | undefined>
  params: Record<string, string | string[] | undefined>
  basePath: string
  locale?: string
  locales?: string[]
  isReady: boolean
  isFallback: boolean
  push: (href: string, options?: { scroll?: boolean }) => void
  replace: (href: string, options?: { scroll?: boolean }) => void
  back: () => void
  prefetch: (href: string) => void
  events: {
    on: (event: string, handler: Handler) => void
    off: (event: string, handler: Handler) => void
    emit: (event: string, ...args: unknown[]) => void
  }
}

type Handler = (...args: unknown[]) => void

/**
 * 极简事件总线，用于替代 router.events。
 * 仅在客户端维护，路由变化时触发 routeChangeComplete。
 */
const createEmitter = () => {
  const handlers = new Map<string, Set<Handler>>()

  return {
    on(event: string, handler: Handler) {
      if (!handlers.has(event)) handlers.set(event, new Set())
      handlers.get(event)!.add(handler)
    },
    off(event: string, handler: Handler) {
      handlers.get(event)?.delete(handler)
    },
    emit(event: string, ...args: unknown[]) {
      handlers.get(event)?.forEach((handler) => handler(...args))
    },
  }
}

const globalEmitter = createEmitter()

export const useCompatRouter = (): CompatRouter => {
  const router = useNextRouter()
  const pathname = useNextPathname() ?? '/'
  const searchParams = useSearchParams()
  const params = useParams()

  const query = useMemo(() => {
    const result: Record<string, string | string[] | undefined> = {}

    searchParams?.forEach((value, key) => {
      const existing = result[key]
      if (existing === undefined) {
        result[key] = value
      } else if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        result[key] = [existing, value]
      }
    })

    return { ...result, ...(params as Record<string, string | string[]>) }
  }, [searchParams, params])

  const search = searchParams?.toString() ?? ''
  const asPath = search ? `${pathname}?${search}` : pathname

  // 路由变化后触发 routeChangeComplete，替代 pages 的 router.events
  const lastPath = useRef(asPath)
  useEffect(() => {
    if (lastPath.current === asPath) return
    lastPath.current = asPath
    globalEmitter.emit('routeChangeComplete', asPath, { shallow: false })
  }, [asPath])

  const push = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      router.push(href, options)
    },
    [router]
  )

  const replace = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      router.replace(href, options)
    },
    [router]
  )

  const events = useMemo(
    () => ({
      on: (event: string, handler: Handler) => globalEmitter.on(event, handler),
      off: (event: string, handler: Handler) => globalEmitter.off(event, handler),
      emit: (event: string, ...args: unknown[]) =>
        globalEmitter.emit(event, ...args),
    }),
    []
  )

  return {
    pathname,
    route: pathname,
    asPath,
    query,
    params: query,
    basePath: '',
    isReady: true,
    isFallback: false,
    push,
    replace,
    back: () => router.back(),
    prefetch: (href: string) => router.prefetch(href),
    events,
  }
}

/** 兼容别名：替换 next/router 的 useRouter */
export const useRouter = useCompatRouter
