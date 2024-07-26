"use client"
import NavbarMenu from './NavbarMenu'
import NavbarLogo from './NavbarLogo'
import NavbarProfile from './NavbarProfile'
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchCurrentUser } from '@/app/actions/getCurrentUser';
import { setUser } from '@/app/redux/userSlice';
import UserProfile from './UserProfile';


const Navbar =  ({user}:any) => {
  //  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false)
  const { navbarShow } = useAppSelector(state => state.navbar)


  if (!navbarShow) {
    return (
      <>
        <div className={`flex bg-transparent absolute w-full lg:px-6 px-2  items-center justify-between `}>

          <NavbarLogo classNameProp={"lg:w-fit"} />

          <div className='flex items-center gap-4'>
            <ThemeToggle />
          </div>
        </div>
      </>
    )
  }

  if(user){
    return (
      <>
        <div className={`flex bg-transparent  w-full lg:px-6 px-2  items-center justify-between h-[80px]`}>
          <NavbarMenu classNameProp={"lg:flex hidden w-1/3"} />
          <UserProfile user={user} classNameProp={"lg:w-1/3 w-full"}/>
          <NavbarProfile classNameProp={"lg:flex hidden"} user={user}/>
          <div className='flex items-center gap-4'>
            <ThemeToggle />
            <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
        <div className={`${menuOpen ? "bg-main border-b border-mediumBlue py-4" : "hidden"}`}>
          <NavbarMenu classNameProp={`flex items-center w-full`} />
          <NavbarProfile classNameProp={"flex items-center w-full"} user={user}/>
        </div>
      </>
    )
  }




  return (
    <>
      <div className={`flex bg-transparent  w-full lg:px-6 px-2  items-center justify-between `}>
        <NavbarMenu classNameProp={"lg:flex hidden w-1/3"} />
        <NavbarLogo classNameProp={"w-1/3"} />
        <NavbarProfile classNameProp={"lg:flex hidden"} user={user}/>
        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>
      <div className={`${menuOpen ? "bg-main border-b border-mediumBlue py-4" : "hidden"}`}>
        <NavbarMenu classNameProp={`flex items-center w-full`} />
        <NavbarProfile classNameProp={"flex items-center w-full"} user={user}/>
      </div>
    </>
  )
}

export default Navbar