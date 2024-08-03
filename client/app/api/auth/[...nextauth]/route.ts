/* eslint-disable react-hooks/rules-of-hooks */
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import connectToDatabase from '@/app/libs/mongoose';
import prisma from "@/app/libs/prismadb"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import User from '@/app/models/User';
import { useRouter } from "next/navigation";

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                await connectToDatabase();
                const { username, password } = credentials as { username: string; password: string };

                if (!username || !password) {
                    throw new Error("Bir Hata Oluştu!!")
                }

                const user = await User.findOne({
                    $or: [
                        { username: username },
                        { email: username }
                    ]
                });

              

                if (user?.emailConfirmed == false) {
                    throw new Error("Emailiniz doğrulanmamış! Email Kutunuzu kontrol ediniz!")
                }

                if (!user || !user.password) {
                    throw new Error("Kullanıcı Bulunamadı!!")
                }

                const comparePassword = await bcrypt.compare(password, user.password)

                if (!comparePassword) {
                    throw new Error("Kullanıcı Adı ya da Şifre Yanlış!!")
                }

                return {
                    id: user._id.toString() as string,
                    username: user.username as string,
                    email: user.email as string,
                    imageUrl: user.imageUrl as string,
                };

            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sohbet",
        signOut: "/",
        error: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    events: {
        signIn: async ({ user, account, profile }) => {
         //   console.log("Kullanıcı Giriş Yaptı:", user);


        },
        signOut: async () => {
         //   console.log("Kullanıcı Çıkış Yaptı");
        }

    },
    callbacks: {
        async session({ session, token, user }) {
            return session;
        },
        async jwt({ token, user, account, profile, trigger, session }) {

            if (trigger === "update" && session) {

                return { ...token, ...session?.user };
            }

            return token;
        },

    },

}




const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

