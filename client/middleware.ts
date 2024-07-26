/* eslint-disable react-hooks/rules-of-hooks */
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('next-auth.session-token');


  if (token) {
    try {

      if (pathname === '/giris-yap' || pathname === '/kayit-ol') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }


    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/giris-yap', '/kayit-ol', '/protected', '/another-protected'],
};
