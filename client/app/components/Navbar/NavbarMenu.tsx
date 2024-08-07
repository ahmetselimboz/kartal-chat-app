"use client"

import React from "react"
import MenuItem from "./MenuItem"
import { usePathname, useRouter } from "next/navigation"
import { MdArrowBackIosNew, MdMeetingRoom } from "react-icons/md"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaUsers } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { activeMenu } from "@/app/redux/menuSlice"
import FriendCategory from "./FriendCategory"

interface NavbarMenuProps {
    classNameProp: string,
    user?: any
}



const NavbarMenu = ({ user, classNameProp }: NavbarMenuProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const dispatch = useAppDispatch();

    const categories = [
        {
            name: "Yenilikler",
            slug: "/yenilikler"
        },
        {
            name: "Hakkında",
            slug: "/hakkinda"
        }
    ]


    if (user) {
        if (pathname != "/sepet" && pathname != "/profil") {
            return (
                <>

                    <FriendCategory classNameProp={classNameProp} />
                </>
            )
        } else {
            return (
                <>

                    <div className={`${classNameProp}`} >
                        <div onClick={() => { router.push(`/sohbet`) }} className='flex relative items-center justify-center cursor-pointer w-10 h-10 ml-6 rounded-full hover:bg-gray-400/20 transition-all'>
                            <MdArrowBackIosNew className='mr-[3px] text-3xl' />
                        </div>
                    </div>
                </>
            )
        }

    }

    return (
        <div className={`flex lg:flex-row flex-col items-center justify-evenly gap-10 ${classNameProp}`}>
            {categories.map((m, i) => (
                <MenuItem key={i} name={m.name} slug={m.slug} selected={pathname === m.slug} />
            ))}
        </div>
    )
}

export default NavbarMenu
