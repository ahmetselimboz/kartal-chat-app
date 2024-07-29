"use client";
import NavbarMenu from './NavbarMenu';
import NavbarLogo from './NavbarLogo';
import NavbarProfile from './NavbarProfile';
import { FaBars } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAppSelector } from '@/app/redux/hooks';
import UserProfile from './UserProfile';
import { axiosCurrentUser, fetchCurrentUser } from '@/app/actions/getCurrentUser';

interface User {
  id: string;
  email: string;
  username: string;
  imageUrl: string;
}

const Navbar = ({user}:any) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navbarShow } = useAppSelector(state => state.navbar);

  console.log('Navbar: user state', user); 
  if (!navbarShow) {
    return (
      <div className={`flex bg-transparent absolute w-full lg:px-6 px-2 items-center justify-between`}>
        <NavbarLogo classNameProp={"lg:w-fit"} />
        <div className='flex items-center gap-4'>
          <ThemeToggle />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <div className={`flex bg-transparent w-full lg:px-6 px-2 items-center justify-between h-[80px]`}>
          <NavbarMenu classNameProp={"lg:flex hidden w-1/3"} />
          <UserProfile user={user} classNameProp={"lg:w-1/3 w-full"} />
          <NavbarProfile classNameProp={"lg:flex hidden"} user={user} />
          <div className='flex items-center gap-4'>
            <ThemeToggle />
            <FaBars className='lg:hidden block text-lightOrange text-xl ' onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
        <div className={`${menuOpen ? "bg-main border-b border-mediumBlue py-4" : "hidden"}`}>
          <NavbarMenu classNameProp={`flex items-center w-full`} />
          <NavbarProfile classNameProp={"flex items-center w-full"} user={user} />
        </div>
      </>
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
