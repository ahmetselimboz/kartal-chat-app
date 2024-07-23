"use client"

import React from "react"
import MenuItem from "./MenuItem"
import { usePathname } from "next/navigation"

interface NavbarMenuProps {
    classNameProp: string
}

const NavbarMenu = ({ classNameProp }: NavbarMenuProps) => {

    const pathname = usePathname()

    const categories = [
        {
            name: "Yenilikler",
            slug: "/yenilikler"
        },
        {
            name: "Hakkında",
            slug: "/hakkinda"
        },
        {
            name: "Bildirimler",
            slug: "/bildirimler"
        }
    ]


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
