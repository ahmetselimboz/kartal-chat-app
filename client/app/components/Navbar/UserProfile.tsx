"use client"
import Image from 'next/image'
import React from 'react'

interface UserProfileProp{
    user:any,
    classNameProp?:string
} 

const UserProfile = ({user, classNameProp}:UserProfileProp) => {

    return (
        <div className={`${classNameProp} flex flex-row items-center justify-center gap-4`}>
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200 border-2 border-mediumBlue">
                <Image src={user?.imageUrl} width={500} height={500} alt="Profil Resmi" />
            </div>
            <div className="font-bold  transition-all menu-text text-2xl">
                {user?.username}
            </div>
        </div>
    )
}

export default UserProfile