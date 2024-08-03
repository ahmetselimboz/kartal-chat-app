"use client"
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";
import { MdArrowBackIosNew, MdOutlineSettings } from "react-icons/md";
import { useAppSelector } from '@/app/redux/hooks'
import useWidth from '@/app/hooks/useWidth'


import TypingIndicator from '../Chat/TypingIndicator';
;

interface UserProfileProp {
    user: any,
    classNameProp?: string,

}

const UserProfile = ({ user, classNameProp }: UserProfileProp) => {

    const params = useParams<{ chatId: string }>()
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter()
    const authUser = useAppSelector(state => state.user.user)
    const chatUser = useAppSelector(state => state.chat.chatUser)
    const { width, height } = useWidth() as any;
    const chatId = params.chatId;




    return (
        <div className={`${classNameProp}  flex flex-column items-center justify-start lg:justify-center gap-4 `}>
            <div className='relative'>

                <div className={` flex flex-row items-center justify-center gap-4 cursor-pointer`} onClick={() => { width <= 1024 && chatId ? null : setMenuOpen(!menuOpen) }} >
                    {
                        width <= 1024 && chatId ? (
                            <div onClick={() => { router.push("/") }} className='flex  items-center justify-center w-8 h-8 rounded-full hover:bg-gray-500/30 transition-all'>
                                <MdArrowBackIosNew size={23} className='mr-[3px]' />
                            </div>
                        ) : null
                    }


                    <div className="lg:w-[45px] lg:h-[45px] w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200 border-2 profile-img-border">
                        <Image src={user?.imageUrl || "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png"} width={500} height={500} alt="Profil Resmi" />
                    </div>
                    <div className="font-bold  transition-all menu-text ">
                        {user?.username}
                        {
                            width <= 1024 && chatId ? (<TypingIndicator chatUser={chatUser?.id} chatId={chatId} authUser={authUser} />) : null
                        }
                    </div>

                </div>
                <div className={`${menuOpen ? "block " : "hidden "} profile-card lg:w-[200px] w-[280px] h-auto top-16 absolute z-40 rounded-md flex flex-col gap-2 items-start py-4 px-4`}>
                    <Link href="/profil" className='flex items-center gap-4 text-xl font-bold btn-text transition-all hover:hover-profile-text '><FaUserLarge className='' />Profil</Link>
                    <hr className='border-t-2 w-full text-black' />
                    <Link href="/profil" className='flex items-center gap-4 text-xl font-bold btn-text transition-all hover:hover-profile-text'><MdOutlineSettings className='' />Ayarlar</Link>
                    <hr className='border-t-2 w-full text-black' />
                    <div onClick={async () => {
                        if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
                            await signOut();
                            router.push("/");

                        }
                    }} className='flex items-center gap-4 text-xl font-bold btn-text cursor-pointer transition-all hover:hover-profile-text'><PiSignOut />Çıkış Yap</div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile