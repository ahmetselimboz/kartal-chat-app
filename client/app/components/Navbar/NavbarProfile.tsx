"use client"

import Image from "next/image"
import MenuItem from "./MenuItem"
import { useAppSelector } from "@/app/redux/hooks"
import UserProfile from "./UserProfile"

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
    {
      name: "Çıkış Yap",
      slug: "cikis-yap"
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
        {/* <UserProfile user={user}/> */}

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