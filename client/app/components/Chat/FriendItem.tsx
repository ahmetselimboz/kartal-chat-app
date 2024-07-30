"use client"

import Image from 'next/image';
import React, { useState } from 'react'


interface friendItemProps{
   username:string,
   imageUrl:string,
   bioDesc:string,
   onButtonClick: () => void;
}

const FriendItem = ({username, imageUrl, bioDesc, onButtonClick}:friendItemProps) => {

    const [selected, setSelected] = useState(false)

    return (
        <div className={`w-full h-fit flex items-center ${selected? "bg-chatlist-item": ""} cursor-pointer`} onClick={()=>{onButtonClick(); setSelected(true)}}>
            <div className='w-3/12 p-4 h-fit '>
                <div className='bg-gray-300 w-[45px] h-[45px] rounded-full overflow-hidden'>
                    <Image src={imageUrl} height={100} width={100} alt=""/>
                </div>
            </div>
            <div className='w-9/12 flex flex-col items-start'>
                <div className='flex flex-row items-center justify-between w-[90%] mb-1'>
                    <div className='text-base'>{username}</div>
                    <div className='csm'>14.30</div>
                </div>
                <div className='text-xs'>
                   {(bioDesc).substring(0, 30)}...
                </div>
            </div>
        </div>
    )
}

export default FriendItem