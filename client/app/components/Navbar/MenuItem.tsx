"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { IconType } from "react-icons"
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";
import { useState } from "react"

interface MenuItemProps {
  name?: string,
  slug: string,
  selected: boolean,
  icon?: IconType
}

const MenuItem = ({ name, slug, selected, icon: Icon }: MenuItemProps) => {

  const [notifyExist, setNotifyExist] = useState<Boolean>(true)


  // if(notifyExist && slug == "bildirimler"){

  //   return (
      
  //   )
  // }


  return (
    <div className={`transition-all hover:hover-menu-text ${selected ? "hover-menu-text" : "menu-text"}`}>

      <Link href={slug} className={`font-bold text-xl  flex items-center gap-2`}>
        {Icon && <Icon size={25} className={`text-2xl  block `} />}
        {name}
      </Link>
    </div>
  )
}

export default MenuItem
