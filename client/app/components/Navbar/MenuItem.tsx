"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'

interface MenuItemProps {
  name: string,
  slug: string,
  selected: boolean
}

const MenuItem = ({ name, slug, selected }: MenuItemProps) => {
  const router = useRouter()
  return (
    <div className="w-fit">
      <Link href={slug} className={`font-bold text-xl transition-all hover:hover-menu-text ${selected ? "hover-menu-text" : "menu-text"}`}>
        {name}
      </Link>




    </div>
  )
}

export default MenuItem
