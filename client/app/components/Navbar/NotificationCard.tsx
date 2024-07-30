import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { LuBellRing } from "react-icons/lu";
import { FaEnvelopeCircleCheck, FaUserPlus } from "react-icons/fa6";
import NotificationItem from './NotificationItem';

interface UserProfileProp {
    user?: any,
    classNameProp?: string
}


const NotificationCard = (classNameProp: UserProfileProp) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter()

    const notifyType = [
        {
            type: "friendship-invitation",
            icon: FaUserPlus
        },
        {
            type: "new-message",
            icon: FaEnvelopeCircleCheck 
        },
    ]


    return (
        <div className={`${classNameProp}  flex flex-column items-center justify-center gap-4 select-none`}>
            <div className='relative'>
                <div className={`transition-all lg:hover:hover-menu-text ${menuOpen ? "hover-menu-text": "menu-text"}     cursor-pointer relative `} onClick={() => { setMenuOpen(!menuOpen) }}>
                    <div className="bg-darkOrange w-[10px] h-[10px] absolute top-0 right-0 rounded-full"></div>
                    <div className={`font-bold text-xl  flex items-center gap-2`}>
                        <LuBellRing size={25} className={`text-2xl  block `} />
                    </div>
                </div>
                <div className={`${menuOpen ? "block " : "hidden "} profile-card lg:w-[300px] w-[280px] h-auto lg:top-10 top-14 right-1 absolute z-40 rounded-md flex flex-col gap-2 items-start py-4 `}>
                    {
                        notifyType.map((nt, i) =>(
                            <NotificationItem key={i} type={nt.type} icon={nt.icon}/>
                        ))
                    }
              
               </div>
            </div>
        </div>
    )
}

export default NotificationCard