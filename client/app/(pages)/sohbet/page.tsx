"use client"

import ChatSection from '@/app/components/Chat/ChatSection'
import FriendList from '@/app/components/Chat/FriendList'
import SidePanel from '@/app/components/Chat/SidePanel'
import { useAppSelector } from '@/app/redux/hooks'
import React from 'react'
import useWidth from '@/app/hooks/useWidth'

const Conversation = () => {

  const sideMenu = useAppSelector((state) => state.sideMenu.sideMenu)
  const { width, height } = useWidth() as any;

  return (
    <div className='relative'>

      <div className='flex lg:flex-row flex-col w-full h-full lg:fixed'>
        <div className='lg:w-3/12 w-full md:w-full  h-[700px] bg-main lg:border-x-2 chat-line fixed lg:relative lg:block flex justify-center'>
         
          <FriendList />
        </div>
        <div className='lg:w-6/12 h-full bg-main lg:border-x-2 chat-line relative z-30 ' >
          <div className="lg:h-[90px] h-[80px]"></div>
          <div></div>
        </div>
        <div className={`lg:w-3/12 w-full h-[700px] ${function () { if (width <= 1024) { if (sideMenu.profil || sideMenu.market) { return "block" } return "hidden" } return "block" }()} bg-main lg:border-x-2 chat-line absolute lg:relative`}>
          <div className="lg:h-[80px] "></div>
          <SidePanel />
        </div>
      </div>
    </div>
  )
}

export default Conversation