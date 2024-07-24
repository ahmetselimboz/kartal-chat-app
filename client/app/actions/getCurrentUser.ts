
import connectToDatabase from '@/app/libs/mongoose';
import User from '@/app/models/User';
import { getServerSession } from 'next-auth';


export interface User {
  id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  imageUrl: string | undefined;
}



export async function fetchCurrentUser(){
  try {
    await connectToDatabase(); // Veritabanı bağlantısını başlat
    const session = await getServerSession()
  


    if (!session?.user?.email) {
      return null;
    }


    const user = await User?.findOne({
      email: session?.user?.email,
    }).lean(); // lean() ile düz JSON formatında döndür
    console.log("getCurrentUser",user)
   if (!user) {
    return null
   }

    return {
      id: user?._id.toString(),
      email: user?.email,
      username: user?.username,
      imageUrl: user?.imageUrl,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}



