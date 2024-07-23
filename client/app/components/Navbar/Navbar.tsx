"use client"
import NavbarMenu from './NavbarMenu'
import NavbarLogo from './NavbarLogo'
import NavbarProfile from './NavbarProfile'

import { FaBars } from "react-icons/fa6";
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)


  return (
    <>
    <div className='bg-transparent w-full lg:px-6 px-2 flex items-center justify-between '>
      <NavbarMenu classNameProp={"lg:flex hidden w-1/3"} />
      <NavbarLogo classNameProp={"w-1/3 "}/>
      <NavbarProfile classNameProp={"lg:flex hidden"} />
      <div className='flex items-center gap-4'>
        <ThemeToggle />
        <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={()=>setMenuOpen(!menuOpen)}/>
      </div>
    </div>
    <div className={`${menuOpen ? "bg-main border-b border-mediumBlue py-4": "hidden"}`}>
    <NavbarMenu classNameProp={`flex items-center w-full`} />
    <NavbarProfile classNameProp={"flex items-center w-full"} />
    </div>
    </>
  )
}

export default Navbar