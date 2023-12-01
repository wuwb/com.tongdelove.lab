// @link https://nextjs.org/docs/app/building-your-application/routing/middleware
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware';

type MiddlewareEnabledRouteMatchers = (typeof config.matcher)[number];

export const config = {
  matcher: [
    '/admin/:path*',
    // '/profile/:path*'
  ],
};

const adminAuthRoutes: MiddlewareEnabledRouteMatchers[] = ['/admin/:path*'];

const isAdminRoute = (
  pathName: string,
  adminRoutes: MiddlewareEnabledRouteMatchers[]
): boolean => {
  return adminRoutes.some((routePrefix) => {
    const path = pathName.toLowerCase().trim();
    if (routePrefix.endsWith(':path*')) {
      return pathName.startsWith(routePrefix.slice(0, -7));
    }
    return path === routePrefix;
  });
};

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;
      return (
        !isAdminRoute(pathname, adminAuthRoutes) || token?.role === 'admin'
      );
    },
  },
});


export function middleware(request: NextRequest) {
    console.log('request path: ', request.nextUrl.href)

    // if (request.nextUrl.pathname.startsWith('/_next/image')) {
    //     const url = request.nextUrl.clone()
    //     url.pathname = '/logo_white.png'
    //     url.search = ''
    //     return NextResponse.rewrite(url)
    // }

    return NextResponse.next()
}


