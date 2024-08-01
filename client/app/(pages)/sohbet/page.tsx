import ChatSection from '@/app/components/Chat/ChatSection'
import FriendList from '@/app/components/Chat/FriendList'
import React from 'react'

const Conversation = () => {
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
        <div className='lg:w-3/12 h-full bg-main lg:border-x-2 chat-line'></div>
      </div>
    </div>
  )
}

export default Conversation