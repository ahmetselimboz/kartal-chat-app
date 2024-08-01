"use client"

import { useAppSelector } from '@/app/redux/hooks';
import { Typing } from '@/app/redux/typingSlice';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';


interface friendItemProps {
    id?: Number,
    username: string,
    imageUrl: string,
    bioDesc: string,
    selected?: string,
    chatId?: string,
    onButtonClick: () => void;
}

const FriendItem = ({ username, imageUrl, bioDesc, selected, chatId, onButtonClick }: friendItemProps) => {
    const socket = useRef(io(process.env.NEXT_PUBLIC_SERVER_URL as string)).current;
    // const isTyping = useAppSelector(state => state.isTyping.isTyping)
    const [typing, setTyping] = useState<Typing | null | undefined>();
    const authUser = useAppSelector(state => state.user.user)



    useEffect(() => {
        socket.emit('joinRoom', chatId);

        socket.on('typing', (isTyping) => {
            setTyping(isTyping)
        });
        
        return () => {
            socket.off('typing');
        }

    }, [socket, chatId])



    return (
        <div className={`w-full h-fit flex items-center ${selected == username ? "bg-chatlist-item" : ""} cursor-pointer`} onClick={() => { onButtonClick(); }}>
            <div className='w-3/12 p-4 h-fit '>
                <div className='bg-gray-300 w-[45px] h-[45px] rounded-full overflow-hidden'>
                    <Image src={imageUrl} height={100} width={100} alt="" />
                </div>
            </div>
            <div className='w-9/12 flex flex-col items-start'>
                <div className='flex flex-row items-center justify-between w-[90%] mb-1'>
                    <div className='text-base'>{username}</div>
                    <div className='csm'>14.30</div>
                </div>
                <div className='text-xs'>
                    {(bioDesc).substring(0, 30)}...
                    <div className="font-normal text-sm text-lightOrange">{typing?.isTyping && typing?.userId == authUser?.id ? "Yazıyor..." : "Çevrimiçi"}</div>
                </div>
            </div>
        </div>
    )
}

export default FriendItem