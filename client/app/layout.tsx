import type { Metadata } from "next";
import { poppins } from "./utils/Fonts";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import ThemeWrapper from "./containers/ThemeWrapper";
import Navbar from "./components/Navbar/Navbar";
import ReduxProvider from "./providers/ReduxProviders";
import MountedClient from "./containers/MountedClient";
import ToastProvider from "./providers/ToastProviders";
import { ReactNode } from "react";
import { axiosCurrentUser, fetchCurrentUser, User } from "./actions/getCurrentUser";
import UserContextProvider from "@/app/providers/UserProvider"; // Import the context provider
import {NextAuthProvider} from "./providers/NextAuthProvider";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: ReactNode}) {

  const user = await fetchCurrentUser()
  //console.log("Test: ", test)
  // console.log("Layout: ", user)

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Kartal Chat App</title>
        <link rel="shortcut icon" href="/kartal_icon.svg" type="image/x-icon" />
      </head>
      <body className={`${poppins.className} bg-main h-screen w-full`}>
        <ReduxProvider>

          <MountedClient>
            <ThemeProvider attribute="class" enableSystem={true}>
              <ThemeWrapper>
                <ToastProvider />

                <NextAuthProvider>
                  <Navbar user={user} />
                  {children}
                </NextAuthProvider>

              </ThemeWrapper>
            </ThemeProvider>
          </MountedClient>

        </ReduxProvider>
      </body>
    </html>
  );
}

// export async function getServerSideProps(context:any) {
//   const session = await getSession(context);
//   let user = null;

//   if (session) {
//     // Veritabanından kullanıcıyı fetch et
//     user = await axiosCurrentUser(session.user.email);
//   }

//   return {
//     props: {
//       user,
//     },
//   };
// }


