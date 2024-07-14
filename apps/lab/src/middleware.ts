// @link https://nextjs.org/docs/app/building-your-application/routing/middleware
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './i18n/config'
export { auth } from '@/auth'

type MiddlewareEnabledRouteMatchers = (typeof config.matcher)[number]

const adminAuthRoutes: MiddlewareEnabledRouteMatchers[] = ['/admin/:path*']

const isAdminRoute = (pathName: string, adminRoutes: MiddlewareEnabledRouteMatchers[]): boolean => {
  return adminRoutes.some(routePrefix => {
    const path = pathName.toLowerCase().trim()
    if (routePrefix.endsWith(':path*')) {
      return pathName.startsWith(routePrefix.slice(0, -7))
    }
    return path === routePrefix
  })
}

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
  const headers = { 'accept-language': defaultLocale }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale) // -> 'en-US'
}

export default auth((request: NextRequest) => {
  // request.auth
  console.log('request path: ', request.nextUrl.href)

  // if (request.nextUrl.pathname.startsWith('/_next/image')) {
  //     const url = request.nextUrl.clone()
  //     url.pathname = '/logo_white.png'
  //     url.search = ''
  //     return NextResponse.rewrite(url)
  // }

  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // return NextResponse.redirect(request.nextUrl)

  return NextResponse.next()
}) 

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',

    '/admin/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    // '/profile/:path*'
  ],
}
