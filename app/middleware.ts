import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('user_session');
  const path = request.nextUrl.pathname;

  // 1. Protect /posts: Redirect unauthenticated users to /signin
  if (path.startsWith('/posts') && !sessionCookie) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 2. Protect /admin: Ensure user exists and has ADMIN role
  if (path.startsWith('/admin')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      const user = JSON.parse(sessionCookie.value);
      if (user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to both /posts and /admin routes
export const config = {
  matcher: ['/posts/:path*', '/admin/:path*'],
};