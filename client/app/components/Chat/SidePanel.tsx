"use client"


import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import useWidth from '@/app/hooks/useWidth'
import { MdArrowBackIosNew } from 'react-icons/md'
import { sideMenuMarketFunc, sideMenuProfilFunc } from '@/app/redux/sideMenuSlice'
import Image from 'next/image'
import { FaPen } from 'react-icons/fa6'
import { LuPencil } from 'react-icons/lu'
import Button from '../Buttons/Button'
import { TfiBrushAlt } from 'react-icons/tfi'
import { FiUserMinus } from 'react-icons/fi'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { setUser } from '@/app/redux/userSlice'
import { chatUserFunc } from '@/app/redux/chatSlice'
import { Message } from './ChatSection'
import socket from "@/app/socket/socket"

const SidePanel = () => {

    const [userList, setUserList] = useState("")
    const [deleteFriendState, setDeleteFriendState] = useState<any>()
    const [messageList, setMessageList] = useState<Message[]>([])
    const [messageIdsList, setMessageIdsList] = useState<string[]>([])
    const sideMenu = useAppSelector(state => state.sideMenu.sideMenu)
    const chatUser = useAppSelector(state => state.chat.chatUser)
    const authUser = useAppSelector(state => state.user.user)
    const { width, height } = useWidth() as any;
    const params = useParams<{ chatId: string }>()
    const chatId = params.chatId
    const dispatch = useAppDispatch()
    const router = useRouter()

    const searchParams = useSearchParams()
 
    const search = searchParams.get('q')

    useEffect(() => {
        if (sideMenu && chatUser?.username) {
            const fetchFriendList = async () => {

                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-friends`, { username: chatUser?.username })

                setUserList(res.data.data.list.length);
            };
            fetchFriendList();
        }

    }, [sideMenu, chatUser?.username])

    const deleteFriends = useCallback(() => {
        const newDeleteFriendState = {
            chatUser: chatUser?.id,
            authUser: authUser?.id,
            chatId
        };
        setDeleteFriendState(newDeleteFriendState);
        console.log(newDeleteFriendState);
        socket.emit("deleteFriend", newDeleteFriendState);
        socket.emit("sendNotification", { senderId:authUser?.id, receiverId:chatUser?.id, senderUsername: authUser?.username, slug:"remove-friendship" })
    }, [chatUser, authUser, chatId]);






    const deleteMessages = async () => {
      
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/${chatId}`)
        if (res.data.data.success) {
            setMessageList(res.data.data.chat.messages)
        } else {
            toast.error("Mesajlar Silinemedi!")
        }
    }

    useEffect(() => {

        const ids = messageList.map(message => message._id);
        setMessageIdsList(ids);
    }, [messageList]);


    useEffect(() => {

        socket.emit("deleteMessages", { chatId, messageIds: messageIdsList });
        if(sideMenu.profil == true){
            dispatch(sideMenuProfilFunc())
        }
    
    }, [chatId, messageIdsList]);




    if (width <= 1024) {
        return (
            <>
                <div className='relative z-40  h-full'>
                    <div className={`${sideMenu.profil ? "block" : "hidden"} w-full fixed h-full bg-main z-40`}>
                        <div onClick={() => { dispatch(sideMenuProfilFunc()) }} className='flex relative top-6 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400/20 transition-all'>
                            <MdArrowBackIosNew size={23} className='mr-[3px] absolute' />
                        </div>
                        <div className='w-full h-1/2  py-4'>
                            <div className='flex items-center justify-center my-2 relative'>
                                <div className='w-[140px] h-[140px] rounded-full bg-slate-300 relative overflow-hidden border-2 chat-profile-img-border'>
                                    <Image src={chatUser?.imageUrl || "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png"} className='' width={500} height={500} alt="Profil Resmi" />
                                </div>
                                {/* <div className='profile-edit hover:hover-profile-edit transition-all flex items-center justify-center  w-10 h-10 rounded-full absolute bottom-0 right-1/3 overflow-visible cursor-pointer'>
                                    <LuPencil size={20} className='text-lightGray' />
                                </div> */}
                            </div>
                            <div className='flex flex-col items-center justify-center my-2  relative'>
                                <div className='font-bold text-2xl text-main  my-2'>
                                    {chatUser?.username}
                                </div>
                                <div className=' text-sm text-center text-main w-10/12  my-1'>
                                    {chatUser?.bioDesc}
                                </div>
                            </div>
                            <div className='w-full h-full flex flex-row items-center justify-center gap-4'>

                                <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                    <div className='w-fit title-text tracking-wider'>
                                        Grup
                                        <hr className='border border-user-menu  w-full' />
                                    </div>
                                    <div className='text-3xl title-text my-2'>0</div>
                                </div>
                                <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                    <div className='w-fit title-text tracking-wider'>
                                        Arkadaş
                                        <hr className='border border-user-menu  w-full' />
                                    </div>
                                    <div className='text-3xl title-text my-2'>{userList}</div>
                                </div>
                                <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                    <div className='w-fit title-text tracking-wider'>
                                        Oda
                                        <hr className='border border-user-menu  w-full' />
                                    </div>
                                    <div className='text-3xl title-text my-2'>0</div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-1/2 flex flex-col items-center justify-center py-4'>

                            <div className='w-full flex flex-col items-center justify-end gap-1'>

                                <button onClick={() => { if (window.confirm("Tüm Mesajlar Silinecek Emin Misiniz?")) { deleteMessages() } }} className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-base text-white rounded-md  transition-all border flex items-center justify-center gap-4'><TfiBrushAlt size={28} /> Sohbeti Temizle</button>
                                <button className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-base text-white rounded-md  transition-all border flex items-center justify-center gap-4'><FiUserMinus size={28} />Arkadaşlıktan Çıkar</button>
                            </div>

                        </div>
                    </div>
                    <div className={`${sideMenu.market && search == "Market" ? "block" : "hidden"} w-full absolute h-full bg-main z-10`}>
                        <div onClick={() => { dispatch(sideMenuMarketFunc());router.push(`/sohbet/${chatId}`) }} className='flex relative top-3 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400/20 transition-all'>
                            <MdArrowBackIosNew size={23} className='mr-[3px] absolute' />
                        </div>
                        <div className='flex flex-col items-start justify-center mx-4 my-4 w-fit'>

                            <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                                Market
                            </div>
                            <hr className='border border-user-menu  w-full' />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='relative z-40  h-[590px]'>
                <div className={`${sideMenu.profil ? "block" : "hidden"} w-full absolute h-full bg-main z-20 `}>
                    <div onClick={() => { dispatch(sideMenuProfilFunc()) }} className='flex relative top-3 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400/20 transition-all'>
                        <MdArrowBackIosNew size={23} className=' absolute' />
                    </div>
                    <div className='w-full h-1/2  py-4'>
                        <div className='flex items-center justify-center my-2 relative'>
                            <div className='w-[140px] h-[140px] rounded-full bg-slate-300 relative overflow-hidden border-2 chat-profile-img-border'>
                                <Image src={chatUser?.imageUrl || "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png"} className='' width={500} height={500} alt="Profil Resmi" />
                            </div>
                            {/* <div className='profile-edit hover:hover-profile-edit transition-all flex items-center justify-center  w-10 h-10 rounded-full absolute bottom-0 right-1/3 overflow-visible cursor-pointer'>
                                <LuPencil size={20} className='text-lightGray' />
                            </div> */}
                        </div>
                        <div className='flex flex-col items-center justify-center my-2  relative'>
                            <div className='font-bold text-2xl text-main  my-2'>
                                {chatUser?.username}
                            </div>
                            <div className=' text-sm text-center text-main w-10/12  my-1'>
                                {chatUser?.bioDesc}
                            </div>
                        </div>

                    </div>
                    <div className='w-full h-1/2 flex flex-col items-center justify-center py-4'>
                        <div className='w-full h-full flex flex-row items-center justify-center gap-4'>

                            <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                <div className='w-fit title-text tracking-wider'>
                                    Grup
                                    <hr className='border border-user-menu  w-full' />
                                </div>
                                <div className='text-3xl title-text my-2'>0</div>
                            </div>
                            <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                <div className='w-fit title-text tracking-wider'>
                                    Arkadaş
                                    <hr className='border border-user-menu  w-full' />
                                </div>
                                <div className='text-3xl title-text my-2'>{userList}</div>
                            </div>
                            <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                <div className='w-fit title-text tracking-wider'>
                                    Oda
                                    <hr className='border border-user-menu  w-full' />
                                </div>
                                <div className='text-3xl title-text my-2'>0</div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-center justify-end gap-1'>

                            <button onClick={() => { if (window.confirm("Tüm Mesajlar Silinecek Emin Misiniz?")) { deleteMessages() } }} className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-lg text-white rounded-md  transition-all border flex items-center justify-center gap-4'><TfiBrushAlt size={28} /> Sohbeti Temizle</button>
                            <button onClick={() => { if (window.confirm("Arkadaşlıktan Çıkarmak İstediğinize Emin Misiniz?")) { deleteFriends() } }}className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-lg text-white rounded-md  transition-all border flex items-center justify-center gap-4'><FiUserMinus size={28} />Arkadaşlıktan Çıkar</button>
                        </div>

                    </div>
                </div>
                <div className='w-full absolute h-full bg-main z-10'>
                    <div className='flex flex-col items-start justify-center mx-4 mb-2 w-fit'>

                        <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                            Market
                        </div>
                        <hr className='border border-user-menu  w-full' />
                    </div>
                </div>

            </div>
        </>
    )
}

export default SidePanel