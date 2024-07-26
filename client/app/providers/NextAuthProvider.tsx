"use client"
import { SessionProvider, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';


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


  useEffect(() => {

    if (status === 'authenticated' && session?.user?.username === '#') {
      router.push(`/kullanici-adi?id=${session.user.id}`);
    }
  }, [session, status, router, pathname]);

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
}


