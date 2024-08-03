import { useEffect } from 'react';
import socket from './socket';



const useNotifications = (authUserId: string |null | undefined) => {

    useEffect(() => {
       // console.log('Bildirim senderID', authUserId);
        socket.emit('register', authUserId);



        return () => {
           //socket.disconnect();
        };
    }, [authUserId]);


    const sendNotification = (receiverId: string | null | undefined, slug: string, senderUsername: string | null | undefined) => {
    
        const data = {
            senderId: authUserId,
            receiverId,
            senderUsername,
            slug
        }
      
        socket.emit('sendNotification', data);
    };

    return {
        sendNotification
    };
};

export default useNotifications;
