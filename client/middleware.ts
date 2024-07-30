import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // getToken ile oturum verilerini al
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // console.log("Middleware: ", token);

  // if (token) {
  //   if ((pathname === '/' || pathname.startsWith('/giris-yap') || pathname.startsWith('/sohbet')) && token.username === '#') {
  //     console.log(token.username);
  //     const response = NextResponse.redirect(new URL("/kullanici-adi", request.nextUrl));
  //     return response;
  //   }
  // }

  // Giriş ve kayıt sayfasına erişim kontrolü
  // if (token) {
  //   if (pathname.startsWith('/kullanici-adi') && token.username !== '#') {
  //     console.log(token.username + "22");
  //     const response = NextResponse.redirect(new URL("/sohbet", request.nextUrl));
  //     return response;
  //   }
  // }

  if (token) {
    if ((pathname === '/giris-yap' || pathname === '/kayit-ol' || pathname === '/')) {
      console.log(token.username + "33");
      const response = NextResponse.redirect(new URL("/sohbet", request.nextUrl));
      return response;
    }
  }

  if (!token) {
    if (pathname === '/sohbet') {
      const response = NextResponse.redirect(new URL("/", request.nextUrl));
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
