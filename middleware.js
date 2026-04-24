import { NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/jwt'

const PUBLIC_ADMIN = ['/admin/login', '/api/admin/login', '/api/admin/logout']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const isAdminPage = pathname.startsWith('/admin') && !PUBLIC_ADMIN.some(p => pathname === p)
  const isAdminApi = pathname.startsWith('/api/admin') && !PUBLIC_ADMIN.some(p => pathname.startsWith(p))

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      if (isAdminApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await verifyJWT(token)
    } catch {
      if (isAdminApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
