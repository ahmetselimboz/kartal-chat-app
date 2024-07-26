// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // getToken ile oturum verilerini al
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Kullanıcı adı kontrolü
  if (token && token.username === '#') {
    return NextResponse.redirect(new URL("/kullanici-adi", request.nextUrl));
  }

  // Giriş ve kayıt sayfasına erişim kontrolü
  if (token) {
    if (pathname === '/giris-yap' || pathname === '/kayit-ol') {
    return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  if (token) {
    if (pathname.startsWith('/kullanici-adi') && token.username !== '#') {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
