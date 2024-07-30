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

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <div className="lg:w-[120px] lg:py-0 max-w-[80px] min-w-[80px] py-2 h-auto rounded-full overflow-hidden">
          <Image src="/logo.png" width={200} height={500} alt="Logo" priority={true} />
        </div>
        <div className={` lg:text-4xl text-3xl logo-text font-bold ${kanit.className}`}>Kartal</div>
      </div>
    )
  }

  return <>{children}</>;
}


