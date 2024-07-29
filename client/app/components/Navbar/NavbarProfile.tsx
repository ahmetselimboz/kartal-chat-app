"use client"

import MenuItem from "./MenuItem"

import { MdOutlineShoppingCart } from "react-icons/md";
import { LuBellRing } from "react-icons/lu";
import NotificationCard from "./NotificationCard";
interface navbarMenuProps {
  classNameProp?: string,
  user?:any
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
      icon: MdOutlineShoppingCart,
      name: "",
      slug: "sepet"
    }


  ]


 // console.log("NavbarProfile", user)

  if (user) {

    return (
      <div className={`lg:w-1/3 w-full flex lg:flex-row flex-col lg:my-0 my-8 lg:px-6 items-center justify-end gap-6 ${classNameProp}`}>
        <NotificationCard />
        {
          categoriesUser.map((m, i) => (
            <MenuItem key={i} name={m.name} slug={m.slug} icon={m.icon as any} selected={false} />
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