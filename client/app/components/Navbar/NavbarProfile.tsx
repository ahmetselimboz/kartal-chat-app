"use client"

import Image from "next/image"
import MenuItem from "./MenuItem"
import { useAppSelector } from "@/app/redux/hooks"

interface navbarMenuProps {
  classNameProp?: string,
  user:any
}

const NavbarProfile = ({ classNameProp,user }: navbarMenuProps) => {


  console.log("NavbarProfile: ", user)
  const categoriesNotUser = [
    {
      name: "Kayıt Ol",
      slug: "kayit-ol"
    },
    {
      name: "Giriş Yap",
      slug: "giris-yap"
    },

  ]

  const categoriesUser = [
    {
      name: "Ayarlar",
      slug: "ayarlar"
    },
    {
      name: "Sepet",
      slug: "giris-yap"
    },

  ]


 // console.log("NavbarProfile", user)

  if (user) {

    return (
      <div className={`lg:w-1/3 w-full flex lg:flex-row flex-col lg:my-0 my-8 items-center justify-evenly gap-10 ${classNameProp}`}>
        {
          categoriesUser.map((m, i) => (
            <MenuItem key={i} name={m.name} slug={m.slug} selected={false} />
          ))
        }
        <div className="flex flex-row-reverse items-center gap-4">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200 border-2 border-mediumBlue">
          <Image src={user?.imageUrl} width={500} height={500} alt="Profil Resmi"/>
          </div>
          <div className="font-bold  transition-all menu-text">
            {user?.username}
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className={`lg:w-1/3 w-full flex lg:flex-row flex-col lg:my-0 my-8 items-center justify-evenly gap-10 ${classNameProp}`}>
      {
        categoriesNotUser.map((m, i) => (
          <MenuItem key={i} name={m.name} slug={m.slug} selected={false} />
        ))
      }

    </div>
  )
}

export default NavbarProfile