import ChatSection from '@/app/components/Chat/ChatSection'
import FriendList from '@/app/components/Chat/FriendList'
import React from 'react'

const Conversation = () => {
  return (
    <div className='flex lg:flex-row flex-col w-full h-full '>
      <div className='lg:w-3/12 h-[700px] bg-main border-x-2 chat-line '>
        <div className="h-[90px]"></div>
        <FriendList />
      </div>
      <div className='lg:w-6/12 h-full bg-main border-x-2 chat-line relative' >
        <div className="h-[90px] "></div>
        <ChatSection />
      </div>
      <div className='lg:w-3/12 h-full bg-main border-x-2 chat-line'></div>
    </div>
  )
}

export default Conversation