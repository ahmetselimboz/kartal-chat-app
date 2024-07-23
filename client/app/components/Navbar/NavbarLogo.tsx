"use client"

import Image from "next/image"
import { kanit } from "@/app/utils/Fonts"
import Link from "next/link"

interface navbarMenuProps {
  classNameProp: string
}

const NavbarLogo = ({classNameProp}:navbarMenuProps) => {
  return (
    <Link href="/" className={`flex flex-row items-center lg:justify-center justify-start lg:w-1/3 w-full`}>
      {/* <div className="w-[80px] h-auto rounded-full overflow-hidden border-2 border-mediumBlue">
        <Image src="/kartal_icon.svg" width={200} height={500} alt="Logo" />
      </div> */}
      <div className="lg:w-[120px] lg:py-0 max-w-[80px] min-w-[80px] py-2 h-auto rounded-full overflow-hidden">
        <Image src="/logo.png" width={200} height={500} alt="Logo" />
      </div>
      <div className={` lg:text-4xl text-3xl logo-text font-bold ${kanit.className}`}>Kartal</div>
    </Link>
  )
}

export default NavbarLogo