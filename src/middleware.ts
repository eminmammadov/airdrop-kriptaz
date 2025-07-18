import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for protecting dashboard routes
 * Checks if user is connected to wallet before accessing dashboard
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/users/')) {
    // Get wallet connection status from cookies or headers
    const isConnected = request.cookies.get('wallet-connected')?.value === 'true';
    const walletAddress = request.cookies.get('wallet-address')?.value;
    
    // If not connected, redirect to home page
    if (!isConnected || !walletAddress) {
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('auth', 'required');
      return NextResponse.redirect(homeUrl);
    }
    
    // If accessing /dashboard directly, redirect to user-specific dashboard
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      const userDashboardUrl = new URL(`/users/${walletAddress}/dashboard`, request.url);
      return NextResponse.redirect(userDashboardUrl);
    }
  }
  
  return NextResponse.next();
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*'
  ]
};
