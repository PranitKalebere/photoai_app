import { NextResponse } from 'next/server';

// This function runs on each request
export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === '/login' || path === '/register' || path === '/';

  // Dummy check for authentication token
  const token = request.cookies.get('auth-token')?.value || '';

  // Redirect if authenticated user tries to access login/register
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect if unauthenticated user tries to access protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

// Run middleware on specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
