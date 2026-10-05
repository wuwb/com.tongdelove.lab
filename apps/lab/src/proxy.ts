import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/locales'

/**
 * App Router 的 locale 重写。
 *
 * 迁移前由 next.config.ts 的 `i18n` 配置承担，Next 16 的 App Router 不再支持该配置
 * （会剥离 URL 首段作为 locale，与 app/[locale] 动态段冲突），因此改由 proxy 实现。
 *
 * 行为：
 * - `/`            -> 按 Accept-Language 协商后重写到 `/<locale>`
 * - `/about`       -> 重写到 `/<locale>/about`
 * - `/zh/about`    -> 已有 locale，透传不做处理
 * - `/api/*`、`/_next/*`、静态资源 -> 跳过
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */

const PUBLIC_FILE = /\.[^/]+$/

/** 从 Accept-Language 中挑出第一个受支持的 locale */
function negotiateLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale

  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith('q='))
      const quality = q ? Number.parseFloat(q.slice(2)) : 1

      const normalized = tag?.trim().toLowerCase()
      return {
        tag: normalized,
        quality: Number.isNaN(quality) ? 0 : quality,
      }
    })
    .filter((c) => c.tag !== undefined && c.tag.length > 0)
    .sort((a, b) => b.quality - a.quality)

  for (const { tag } of candidates) {
    if (!tag) continue
    if ((locales as readonly string[]).includes(tag)) return tag

    // 处理 zh-CN / en-US 与基础语言 zh / en 的降级匹配
    const base = tag.split('-')[0]
    if (base && (locales as readonly string[]).includes(base)) return base
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过 API、Next 内部资源与带扩展名的静态文件
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/svg') ||
    pathname.startsWith('/locales') ||
    pathname.startsWith('/.well-known') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  if (first && (locales as readonly string[]).includes(first)) {
    // 已有合法 locale，直接放行
    return NextResponse.next()
  }

  const locale = negotiateLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  // rewrite 而非 redirect：URL 保持无 locale 前缀，由 app/[locale] 处理渲染
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径但排除 API、Next 内部资源与静态文件，
     * 避免不必要的 proxy 开销。
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|svg|locales|\\.well-known).*)',
  ],
}
