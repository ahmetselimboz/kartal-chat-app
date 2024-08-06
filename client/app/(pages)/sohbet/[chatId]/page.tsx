"use client"

import ChatSection, { Message } from '@/app/components/Chat/ChatSection'
import FriendList from '@/app/components/Chat/FriendList'
import SidePanel from '@/app/components/Chat/SidePanel'
import { chatUserFunc } from '@/app/redux/chatSlice'
import { useAppSelector } from '@/app/redux/hooks'
import { User } from '@/app/redux/userSlice'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import socket from "@/app/socket/socket"
import useWidth from '@/app/hooks/useWidth'
import DeleteMessageModal from '@/app/components/Modals/DeleteMessageModal'
import { IoTrashOutline } from 'react-icons/io5'

const ConversationChat = () => {

  const params = useParams<{ chatId: string }>();
  const chatId = params.chatId
  const authUser = useAppSelector((state) => state.user.user)
  const sideMenu = useAppSelector((state) => state.sideMenu.sideMenu)
  const { width, height } = useWidth() as any;
  const dispatch = useDispatch()

  const [receiverUser, setReceiverUser] = useState<User>();

  const [modalData, setModalData] = useState<Message>()
  const [closeModal, setCloseModal] = useState(false)

  useEffect(() => {
    const getReceiver = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/receiver/${chatId}`);

        if (res.data.data.success) {
          const filteredUsers = res.data.data.chat.participants.members.filter((members: { memberId: { _id: string | null | undefined } }) => members.memberId._id !== authUser?.id);

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


  }, [authUser?.id, chatId, dispatch]);

  const deleteMessages = async (messageIds: any[]) => {

    socket.emit("deleteMessages", { chatId, messageIds });

  };


  const modalOpen = (msg: Message) => {


    setModalData(msg)
    setCloseModal(true)
  }

  const modalSubmit = () => {
    
    deleteMessages([modalData?._id])
    setCloseModal(false)
  }

  return (

    <div className='relative'>
      {
        closeModal ? (<DeleteMessageModal onSubmit={modalSubmit} invite_name={modalData?.message} title="Mesajı Sil" icon={IoTrashOutline} onClose={() => { setCloseModal(false) }} />) : ""
      }
      <div className='flex lg:flex-row flex-col w-full h-full lg:fixed'>

        {
          width >= 1024 ? (
            <div className='lg:w-3/12 h-[700px] bg-main lg:border-x-2 chat-line fixed lg:relative'>
              <FriendList />
            </div>
          ) : null
        }

        <div className='lg:w-6/12 h-full bg-main lg:border-x-2 chat-line relative z-30 ' >

          <ChatSection onClickSubmit={modalOpen} />
        </div>
        <div className={`lg:w-3/12 w-full h-[700px] ${function () { if (width <= 1024) { if (sideMenu.profil || sideMenu.market) { return "block" } return "hidden" } return "block" }()} bg-main lg:border-x-2 chat-line absolute lg:relative`}>
          <div className="lg:h-[80px] "></div>
          <SidePanel />
        </div>
      </div>
    </div>
  )
}

export default ConversationChat