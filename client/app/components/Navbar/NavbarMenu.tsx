"use client"

import React from "react"
import MenuItem from "./MenuItem"
import { usePathname } from "next/navigation"
import { MdMeetingRoom, MdPeopleOutline } from "react-icons/md"
import { AiOutlineTeam, AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaUsers } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { activeMenu } from "@/app/redux/menuSlice"

interface NavbarMenuProps {
    classNameProp: string,
    user?: any
}

const NavbarMenu = ({ user, classNameProp }: NavbarMenuProps) => {

    const pathname = usePathname()
    const selectedMenu = useAppSelector(state => state.menu.activeMenu.menuTitle)

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
    const userExistCategories = [
        {
            menuTitle: "Arkadaşlar",
            icon: AiOutlineUsergroupAdd,
            placeholder: "Kullanıcı Adı",
            btnTitle: "Katıl"
        },
        {
            menuTitle: "Gruplar",
            icon: FaUsers,
            placeholder: "Grup Adı",
            btnTitle: "Katıl"
        },
        {
            menuTitle: "Odalar",
            icon: MdMeetingRoom,
            placeholder: "Oda Adı",
            btnTitle: "Katıl"
        },
    ]

    if (user) {
        return (

            <div className={`flex flex-row items-center justify-center h-full gap-3 py-3 ${classNameProp}`}>
                {
                    userExistCategories?.map((ct, i) => (
                        <div key={i} onClick={() => { dispatch(activeMenu(ct)) }} className={`border-2  w-3/12 h-full rounded-md ${selectedMenu == ct.menuTitle ? "border-lightOrange text-lightOrange" : "border-user-menu text-user-menu"} flex flex-col items-center transition-all justify-center cursor-pointer hover:border-lightOrange hover:text-lightOrange`}>
                            <ct.icon className="text-xl" />
                            <div className="text-sm">{ct.menuTitle}</div>
                        </div>
                    ))
                }

                {/* <div className="border-2 border-lightGray w-3/12 h-full rounded-md flex flex-col items-center justify-center cursor-pointer">
                    <AiOutlineUsergroupAdd className="text-xl" />
                    <div className="text-sm">Arkadaşlar</div>
                </div>
                <div className="border-2 border-lightGray w-3/12 h-full rounded-md flex flex-col  items-center justify-center  cursor-pointer">
                    <FaUsers className="text-xl" />
                    <div className="text-sm">Gruplar</div>
                </div>
                <div className="border-2 border-lightGray w-3/12 h-full rounded-md flex flex-col  items-center justify-center cursor-pointer">
                    <MdMeetingRoom className="text-xl" />
                    <div className="text-sm">Odalar</div>
                </div> */}
            </div>

        )
    }


    return (
        <div className={`flex lg:flex-row flex-col items-center justify-evenly gap-10 ${classNameProp}`}>
            {
                categories.map((m, i) => (
                    <MenuItem key={i} name={m.name} slug={m.slug} selected={pathname === m.slug} />
                ))
            }
        </div>
    )
}

export default NavbarMenu
