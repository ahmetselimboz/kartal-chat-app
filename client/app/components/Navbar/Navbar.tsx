"use client";
import NavbarMenu from './NavbarMenu';
import NavbarLogo from './NavbarLogo';
import NavbarProfile from './NavbarProfile';
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAppSelector } from '@/app/redux/hooks';
import UserProfile from './UserProfile';

import NotificationCard from './NotificationCard';
import useWidth from '@/app/hooks/useWidth';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface User {
  id: string;
  email: string;
  username: string;
  imageUrl: string;
}

const Navbar = () => {
  const user = useAppSelector((state) => state.user.user) as unknown
  const [menuOpen, setMenuOpen] = useState(false);
  const { navbarShow } = useAppSelector(state => state.navbar) as any;
  const chatUser = useAppSelector(state => state.chat.chatUser)

  const { width, height } = useWidth() as any;



  if (!navbarShow) {
    return (
      <div className={`flex bg-main absolute w-full lg:px-6 px-2 items-center justify-between`}>
        <NavbarLogo classNameProp={"lg:w-fit"} />
        <div className='flex items-center gap-4'>
          <ThemeToggle />
        </div>
      </div>
    );
  }

  if(user && chatUser &&  width <= 1024){
  
    return (
      <div className="relative">
        <div className={`flex bg-main lg:absolute fixed w-full lg:px-0 px-2 items-center justify-between h-[80px] z-40 lg:border-x-2 chat-line`}>
          <NavbarMenu user={user} classNameProp={"lg:flex hidden w-3/12"} />
          <UserProfile user={chatUser} classNameProp={"lg:w-6/12 w-full"} />
          <div className='flex flex-row items-center lg:w-3/12 lg:px-6'>

            <NavbarProfile classNameProp={"lg:flex hidden lg:w-full"} user={user} />
            <div className='flex items-center gap-4'>
              {
                width >= 1024 ? (<ThemeToggle />) : (<NotificationCard />)
              }

              <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={() => setMenuOpen(!menuOpen)} />
              <div className="bg-transparent lg:hidden block  hover:bg-gray-400/20 rounded-full transition-all cursor-pointer">
                        <BsThreeDotsVertical size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className={`${menuOpen ? "fixed  w-full mt-[80px] z-40 bg-main border-b border-mediumBlue py-4" : "hidden"}`}>

          <NavbarProfile classNameProp={"flex items-center w-full"} user={user} />
        </div>
      </div>
    );
  }


  if (user) {
    return (
      <div className="relative">
        <div className={`flex bg-main lg:absolute fixed w-full lg:px-0 px-2 items-center justify-between h-[80px] z-40 lg:border-x-2 chat-line`}>
          <NavbarMenu user={user} classNameProp={"lg:flex hidden w-3/12"} />
          <UserProfile user={user} classNameProp={"lg:w-6/12 w-full"} />
          <div className='flex flex-row items-center lg:w-3/12 lg:px-6'>

            <NavbarProfile classNameProp={"lg:flex hidden lg:w-full"} user={user} />
            <div className='flex items-center gap-4'>
              {
                width >= 1024 ? (<ThemeToggle />) : (<NotificationCard />)
              }

              <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={() => setMenuOpen(!menuOpen)} />
            </div>
          </div>
        </div>
        <div className={`${menuOpen ? "fixed  w-full mt-[80px] z-40 bg-main border-b border-mediumBlue py-4" : "hidden"}`}>

          <NavbarProfile classNameProp={"flex items-center w-full"} user={user} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex bg-transparent w-full lg:px-6 px-2 items-center justify-between`}>
        <NavbarMenu classNameProp={"lg:flex hidden w-1/3"} />
        <NavbarLogo classNameProp={"w-1/3"} />
        <NavbarProfile classNameProp={"lg:flex hidden"} user={null} />
        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>
      <div className={`${menuOpen ? "bg-main border-b border-mediumBlue py-4" : "hidden"}`}>
        <NavbarMenu classNameProp={`flex items-center w-full`} />
        <NavbarProfile classNameProp={"flex items-center w-full"} user={null} />
      </div>
    </>
  );
};

export default Navbar;
