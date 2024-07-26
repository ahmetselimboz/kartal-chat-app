
import connectToDatabase from '@/app/libs/mongoose';
import User from '@/app/models/User';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import bcrypt from "bcryptjs"


export interface User {
    id: string | undefined;
    email: string | undefined;
    username: string | undefined;
    imageUrl: string | undefined;
}




export async function registerGoogleData(data: any) {
    try {
    
        await connectToDatabase();
        const session = await getServerSession()
     
        const user = await User?.findOne({
            email: data.email
        })

        if (!user) {
            data.password =  await bcrypt.hash(generateRandomFourDigitNumber().toString(), 10) as any
            data.username = "#"
            data.emailConfirmed = true
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`, data)

            if (res?.data?.data?.success) {

                return {
                    username: "#",
                    id:res?.data?.data?.id
                }
            } else {

                return {
                    message: res?.data?.message
                }
            }
        }



        return {
            username:user.username,
            id:user.id
        }



    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

function generateRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

export  async function getUsername(email : null | string | undefined) {
    const user = await User?.findOne({
        email: email
    })

    return user?.username

}


