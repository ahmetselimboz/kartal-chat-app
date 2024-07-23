"use client"

import MenuItem from "./MenuItem"

interface navbarMenuProps {
  classNameProp: string
}

const NavbarProfile = ({classNameProp}:navbarMenuProps) => {

  const categories = [
    {
      name: "Kayıt Ol",
      slug: "kayit-ol"
    },
    {
      name: "Giriş Yap",
      slug: "giris-yap"
    },

  ]

  return (
    <div className={`lg:w-1/3 w-full flex lg:flex-row flex-col lg:my-0 my-8 items-center justify-evenly gap-10 ${classNameProp}`}>
      {
        categories.map((m, i) => (
          <MenuItem key={i} name={m.name} slug={m.slug} selected={false}/>
        ))
      }
   
    </div>
  )
}

export default NavbarProfile