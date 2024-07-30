"use client"
import { SessionProvider, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { kanit } from "@/app/utils/Fonts"


export const NextAuthProvider = ({ children }: AuthWrapperProps) => {
  return (
    <SessionProvider >
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </SessionProvider>
  );
}

interface AuthWrapperProps {
  children: ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname()




  return <>{children}</>;
}


