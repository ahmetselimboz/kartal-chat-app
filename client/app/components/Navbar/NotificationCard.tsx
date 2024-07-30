import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { LuBellRing } from "react-icons/lu";

import NotificationItem from './NotificationItem';
import { useAppSelector } from '@/app/redux/hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserProfileProp {
    user?: any,
    classNameProp?: string
}

type Notification = {
    _id: string,
    type: string,
    from: string,
    readed: boolean
}


const NotificationCard = (classNameProp: UserProfileProp) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const stateUsername = useAppSelector(state => state.user.user) as any
    const [notifyList, setNotifyList] = useState<Notification[]>([])





    useEffect(() => {
        const notifyFunc = async () => {
            const getNotifyList = async () => {
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-notification`, { username: stateUsername.username })

                    return res.data.data.list
                } catch (error) {
                    console.log(error)
                    return []
                }
            }

            const res = await getNotifyList()



            setNotifyList(res.notification)

        }

        notifyFunc()
    }, [setNotifyList, stateUsername])

    const refuseFunc = async (id: string, username: string | null | undefined) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/remove-notification?id=${id}&username=${username}`)
        if (res.data.data.success) {
            toast.success("Silindi!")
            setNotifyList(notifyList.filter((item) => { item._id != id }))
            setMenuOpen(false)
        } else {
            toast.error("Silinemedi! Tekrar Deneyiniz!")
        }
    }

    const addFriendFunc = async (id: string, username: string | null | undefined) => {
        const options = {
            from: username,
            to: stateUsername.id
        }
        console.log(options)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/add-friend`, options)
        if (res.data.data.success) {
            toast.success("Artık Arkadaşsınız! Konuşmaya başlayın!")
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/remove-notification?id=${id}&username=${stateUsername.username}`)
            if (res.data.data.success) {

                setNotifyList(notifyList.filter((item) => { item._id != id }))
                setMenuOpen(false)
            } else {
                toast.error("Silinemedi! Tekrar Deneyiniz!")
            }

        } else {
            toast.error("Bir Hata Oluştu! Tekrar Deneyiniz!")
        }
    }


    return (
        <div className={`${classNameProp}  flex flex-column items-center justify-center gap-4 select-none`}>
            <div className='relative'>
                <div className={`transition-all lg:hover:hover-menu-text ${menuOpen ? "hover-menu-text" : "menu-text"}     cursor-pointer relative `} onClick={() => { setMenuOpen(!menuOpen) }}>
                    {
                        notifyList.length > 0 ? (<div className="bg-darkOrange w-[10px] h-[10px] absolute top-0 right-0 rounded-full"></div>) : null
                    }


                    <div className={`font-bold text-xl  flex items-center gap-2`}>
                        <LuBellRing size={25} className={`text-2xl  block `} />
                    </div>
                </div>
                <div className={`${menuOpen ? "block " : "hidden "} profile-card lg:w-[320px] w-[280px] h-auto lg:top-10 top-14 right-1 absolute z-40 rounded-md flex flex-col items-center  py-4 `}>
                    {
                        notifyList.length == 0 ? (
                            <div className='btn-text'>
                                Yeni Bildiriminiz Yok
                            </div>
                        ) : (
                            notifyList.map((nt: any, i: any) => (
                                <NotificationItem key={i} type={nt.slug} id={nt._id} fromId={nt.fromId} from={nt.fromName} username={stateUsername.username} removeFunc={refuseFunc} addFriendFunc={addFriendFunc} />
                            ))
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default NotificationCard