import type { Metadata } from "next";
import { poppins } from "./utils/Fonts";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import ThemeWrapper from "./containers/ThemeWrapper";
import Navbar from "./components/Navbar/Navbar";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Kartal Chat App</title>
        <link rel="shortcut icon" href="/kartal_icon.svg" type="image/x-icon" />
      </head>
      <body className={`${poppins.className}   bg-main h-screen w-full`}>
        <ThemeProvider attribute="class" enableSystem={true}>
          <ThemeWrapper>
          <Navbar/>
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>

    </html>
  );
}
