import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.pathname
  if (url.startsWith('/_vercel/insights')) {
    const cookie = request.cookies.get('site_owner')
    if (cookie?.value === 'true') {
      return new NextResponse(null, { status: 204 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/_vercel/insights/:path*'
}
