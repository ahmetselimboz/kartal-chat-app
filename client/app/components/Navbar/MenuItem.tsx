"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { IconType } from "react-icons"
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";
import { useState } from "react"
import useWidth from '@/app/hooks/useWidth';
interface MenuItemProps {
  name?: string,
  slug: string,
  selected: boolean,
  icon?: IconType
  onClickSubmit?: ()=> void;
}

const MenuItem = ({ name, slug, selected, icon: Icon, onClickSubmit }: MenuItemProps) => {

  const [notifyExist, setNotifyExist] = useState<Boolean>(true)
  const { width, height } = useWidth() as any;


  return (
    <div className={`transition-all hover:hover-menu-text ${selected ? "hover-menu-text" : "menu-text"}`} onClick={onClickSubmit} >

      <Link href={slug} className={`font-bold text-xl  flex items-center gap-2`}>
        {Icon && <Icon size={25} className={`text-2xl  block `} />}
        {name == "Sepet" && width >= 1024 ?
          (
            <div>

            </div>
          ) : (
            <div>
              {name}
            </div>
          )}
      </Link>
    </div>
  )
}

export default MenuItem
