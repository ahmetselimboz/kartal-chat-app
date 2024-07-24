import type { Metadata } from "next";
import { poppins } from "./utils/Fonts";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import ThemeWrapper from "./containers/ThemeWrapper";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ReduxProvider from "./providers/ReduxProviders";
import MountedClient from "./containers/MountedClient";
import Script from "next/script";
import ToastProvider from "./providers/ToastProviders";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development'


  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Kartal Chat App</title>
        <link rel="shortcut icon" href="/kartal_icon.svg" type="image/x-icon" />
      </head>
      <body className={`${poppins.className}   bg-main h-screen w-full`} >
        <ReduxProvider>
          <MountedClient>
            <ThemeProvider attribute="class" enableSystem={true}>
              <ThemeWrapper>
              <ToastProvider/>
                <Navbar />
                {children}
              </ThemeWrapper>
            </ThemeProvider>
          </MountedClient>
        </ReduxProvider>
      </body>
      <Script  src="./node_modules/preline/dist/preline.js"></Script>
    </html>
  );
}
