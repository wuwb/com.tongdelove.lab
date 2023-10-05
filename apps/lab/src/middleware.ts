import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

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
