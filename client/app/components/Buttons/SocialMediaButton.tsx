"use client"
import React from 'react'
import { IconType } from 'react-icons'

interface SocialMediaButtonsProps {
    icon: IconType,
    btnTitle?: string
    onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SocialMediaIcon = ({ icon: Icon, btnTitle, onSubmit } : SocialMediaButtonsProps) => {
    return (
        <button className='text-darkBlue select-none bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer my-1 p-2 lg:w-3/5 w-10/12 flex items-center justify-center gap-2 rounded-md  border-2 border-gray-400' onClick={onSubmit}><Icon size={28} />{btnTitle}</button>
    )
}

export default SocialMediaIcon