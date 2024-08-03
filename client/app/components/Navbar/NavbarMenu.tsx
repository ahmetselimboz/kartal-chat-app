"use client"

import React from "react"
import MenuItem from "./MenuItem"
import { usePathname } from "next/navigation"
import { MdMeetingRoom } from "react-icons/md"
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
        return (
            <>

                <FriendCategory classNameProp={classNameProp}/>
            </>
        )
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
