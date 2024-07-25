
import connectToDatabase from '@/app/libs/mongoose';
import User from '@/app/models/User';
import axios from 'axios';
import { getServerSession } from 'next-auth';


export interface User {
    id: string | undefined;
    email: string | undefined;
    username: string | undefined;
    imageUrl: string | undefined;
}



export async function registerGoogleData(data: any) {
    try {
        await connectToDatabase();

        const user = await User?.findOne({
            email: data.email
        })

        if (!user) {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`, data)

            if (res?.data?.data?.success) {

                return {
                    success:true,
                    message: "Giriş Yapıldı!!",
                    id:res?.data?.data?.id
                }
            } else {

                return {
                    message: res?.data?.message
                }
            }
        }



        return true



    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

function generateRandomFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

async function getUniqueUsername(username : string) {
    const user = await User?.findOne({
        username: username
    })

    if(!user) username = `user#${generateRandomFourDigitNumber()}`

    if (user && user.username == username) {
        username = `user#${generateRandomFourDigitNumber()}`
    }

    if(!user) return username

    getUniqueUsername(username)

}


