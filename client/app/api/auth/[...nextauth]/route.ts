import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import connectToDatabase from '@/app/libs/mongoose';
import prisma from "@/app/libs/prismadb"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import User from '@/app/models/User';

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    await connectToDatabase();
                    const { email, password } = credentials as { email: string; password: string };

                    if (!email || !password) {
                        throw new Error("Bir Hata Oluştu!!")
                    }

                    const user = await User.findOne({ email: email });


                    if (!user || !user.password) {
                        throw new Error("Kullanıcı Bulunamadı!!")
                    }

                    const comparePassword = await bcrypt.compare(password, user.password)

                    if (!comparePassword) {
                        throw new Error("Kullanıcı Adı ya da Şifre Yanlış!!")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };

                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
        signOut: "/",
        error: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    events: {
        signIn: async (result) => {
            console.log("Kullanıcı Giriş Yaptı:", result);
        },
        signOut: async () => {
            console.log("Kullanıcı Çıkış Yaptı");
        }

    },


}




const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

