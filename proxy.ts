import { NextResponse, type NextRequest } from 'next/server';

// Optimistic check only: send visitors without a session cookie to the login
// page. The real check happens in lib/auth/dal.ts on every admin request.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = pathname === '/admin/login' || pathname === '/admin/setup';
  if (!isPublic && !request.cookies.has('nys_admin_session')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
