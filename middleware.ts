import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest){
    const token = request.cookies.get('token'); 

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/matricula');

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL('/cadastro', request.url));
    }
    
    if (request.nextUrl.pathname === '/' && token) {
      return NextResponse.redirect(new URL('/matricula', request.url));
    }
    
    if (request.nextUrl.pathname === '/' && !token) {
      return NextResponse.redirect(new URL('/cadastro', request.url));
    }
    
    return NextResponse.next();
};

export const config = {
  matcher: ['/', '/matricula/:path*']
}
