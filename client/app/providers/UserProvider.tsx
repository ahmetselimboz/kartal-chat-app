
import { SessionProvider, useSession } from 'next-auth/react';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import NavbarLogo from '../components/Navbar/NavbarLogo';
import { Session, User } from 'next-auth';
import { fetchCurrentUser } from '../actions/getCurrentUser';

interface AuthWrapperProps {
  children: ReactElement;
}

export default async function UserProvider({ children }: AuthWrapperProps) {
  const user = await fetchCurrentUser() as any

  return (
    <>
  
    </>
  );
}

function Auth({ children }: AuthWrapperProps) {

  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   fetchCurrentUser().then((sessionData:any) => {
  //     setSession(sessionData)
  //   });
  // }, []);

  console.log(session)
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <NavbarLogo />
      </div>
    );
  }

  return <>{children}</>;
}
