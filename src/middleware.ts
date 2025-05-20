import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add TypeScript types
interface NextAuthRequest extends NextRequest {
  nextauth: {
    token: {
      role?: string;
      [key: string]: unknown;
    } | null;
  };
}

export default withAuth(
  function middleware(req: NextAuthRequest) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    
    // If user is authenticated and trying to access login/signup pages,
    // redirect them to the appropriate dashboard based on role
    if (token && (pathname === '/login' || pathname === '/signup')) {
      const redirectPath = token.role === 'admin' ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
    
    // If user tries to access admin routes but isn't an admin
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    // Otherwise, continue to the requested page
    return NextResponse.next();
  },
  {
    callbacks: {
      // This determines if the user should be allowed to access the page
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public pages that don't require authentication
        if (pathname === "/login" || pathname === "/signup" || 
            pathname === "/" || pathname.startsWith("/api/auth")) {
          return true;
        }
        
        // Admin routes require token with admin role
        if (pathname.startsWith('/admin') && token?.role !== 'admin') {
          return false;
        }
        
        // Protected routes - only allow if token exists
        return !!token;
      },
    },
  }
);

// Only apply middleware to these routes
export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin',
    '/admin/:path*',
    '/login',
    '/signup',
  ]
};