import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest){
    const token = request.cookies.get('access_token'); 

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/matricula');
    
    if (request.nextUrl.pathname === '/cadastro' && token) {
      return NextResponse.redirect(new URL('/matricula/dados_do_responsavel', request.url));
    }
    
    if (request.nextUrl.pathname === '/registrar' && token) {
      return NextResponse.redirect(new URL('/matricula/dados_do_responsavel', request.url));
    }

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL('/cadastro', request.url));
    }
    
    if (request.nextUrl.pathname === '/' && token) {
      return NextResponse.redirect(new URL('/matricula/dados_do_responsavel', request.url));
    }
    
    if (request.nextUrl.pathname === '/' && !token) {
      return NextResponse.redirect(new URL('/cadastro', request.url));
    }
    
    return NextResponse.next();
};

export const config = {
  matcher: ['/', '/matricula/:path*', '/cadastro', '/registrar']
}
