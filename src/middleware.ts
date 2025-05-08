import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    
    // If user is authenticated and trying to access login/signup pages,
    // redirect them to dashboard
    if (token && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
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
        if (pathname === "/login" || pathname === "/signup") {
          return true;
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
    '/login',
    '/signup',
  ]
};