"use client"

import ChatSection from '@/app/components/Chat/ChatSection'
import FriendList from '@/app/components/Chat/FriendList'
import { chatUserFunc } from '@/app/redux/chatSlice'
import { useAppSelector } from '@/app/redux/hooks'
import { User } from '@/app/redux/userSlice'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
//import socket from "@/app/socket/socket"


const ConversationChat = () => {

  const params = useParams<{ chatId: string }>();
  const chatId = params.chatId
  const authUser = useAppSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const [receiverUser, setReceiverUser] = useState<User>();



  useEffect(() => {
    const getReceiver = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/receiver/${chatId}`);

        if (res.data.data.success) {
          const filteredUsers = res.data.data.chat.participants.members.filter((members: { memberId: {_id: string | null | undefined} }) => members.memberId._id !== authUser?.id);
      
          if (filteredUsers.length > 0) {
            const user = filteredUsers[0].memberId;
            const users = {
              id: user._id,
              username: user.username,
              email: user.email,
              imageUrl: user.imageUrl,
              bioDesc: user.bioDesc,
              userStatus: user.userStatus,
            };

            setReceiverUser(users);
            dispatch(chatUserFunc(users));
          } else {
            console.error('No other participant found in the chat.');
          }
        } else {
          console.error('API response was not successful:', res.data);
        }
      } catch (error) {
        console.error('Error fetching receiver user:', error);
      }
    };


    getReceiver()


  }, []);


  useEffect(() => {


   // socket.emit('inChat', { chatId, userId: receiverUser?.id, inChat: true });

  }, [chatId, receiverUser?.id])


  return (

    <div className='relative'>

      <div className='flex lg:flex-row flex-col w-full h-full lg:fixed'>
        <div className='lg:w-3/12 h-[700px] bg-main lg:border-x-2 chat-line fixed lg:relative'>

          <FriendList />
        </div>
        <div className='lg:w-6/12 h-full bg-main lg:border-x-2 chat-line relative z-30 ' >
          <div className="lg:h-[90px] h-[80px]"></div>
          <ChatSection />
        </div>
        <div className='lg:w-3/12 h-full bg-main lg:border-x-2 chat-line'></div>
      </div>
    </div>
  )
}

export default ConversationChat