// @link https://nextjs.org/docs/app/building-your-application/routing/middleware
import { authConfig } from './auth.config'

import NextAuth from 'next-auth'
export const { auth: middleware } = NextAuth(authConfig)

// export const config = {
//   runtime: 'nodejs',
//   matcher: [
//     '/admin/:path*',
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
//   ],
// }

// export function middleware(request: NextRequest) {
//   // request.auth
//   console.log('request path: ', request.nextUrl.href)

//   // if (request.nextUrl.pathname.startsWith('/_next/image')) {
//   //     const url = request.nextUrl.clone()
//   //     url.pathname = '/logo_white.png'
//   //     url.search = ''
//   //     return NextResponse.rewrite(url)
//   // }

//   const { pathname } = request.nextUrl
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )

//   if (pathnameHasLocale) return

//   // Redirect if there is no locale
//   const locale = getLocale(request)
//   request.nextUrl.pathname = `/${locale}${pathname}`
//   // return NextResponse.redirect(request.nextUrl)

//   return NextResponse.next()
// }
