"use client";
import NavbarMenu from './NavbarMenu';
import NavbarLogo from './NavbarLogo';
import NavbarProfile from './NavbarProfile';
import { FaBars, FaUserLarge } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import UserProfile from './UserProfile';
import { FaUserEdit } from "react-icons/fa";
import NotificationCard from './NotificationCard';
import useWidth from '@/app/hooks/useWidth';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useParams, useRouter } from 'next/navigation';
import { MdArrowBackIosNew, MdOutlineSettings } from 'react-icons/md';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { PiSignOut } from 'react-icons/pi';
import MenuItem from './MenuItem';
import { IoBagHandleOutline } from 'react-icons/io5';
import { sideMenuMarketFunc, sideMenuProfilFunc } from '@/app/redux/sideMenuSlice';

interface User {
  id: string;
  email: string;
  username: string;
  imageUrl: string;
}

const Navbar = () => {
  const user = useAppSelector((state) => state.user.user) as unknown
  const [menuOpen, setMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { navbarShow } = useAppSelector(state => state.navbar) as any;
  const chatUser = useAppSelector(state => state.chat.chatUser)
  const params = useParams<{ chatId: string }>()
  const chatId = params.chatId
  const { width, height } = useWidth() as any;
  const router = useRouter()
  const dispatch = useAppDispatch()

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

  if (user && chatUser && width <= 1024) {

    return (
      <div className="relative">
        <div className={`flex bg-main lg:absolute fixed w-full lg:px-0 px-2 items-center justify-between h-[80px] z-40 lg:border-x-2 chat-line`}>
          <NavbarMenu user={user} classNameProp={"lg:flex hidden w-3/12"} />
          <UserProfile user={chatUser} classNameProp={"lg:w-6/12 w-full"}/>
          <div className='flex flex-row items-center lg:w-3/12 lg:px-6'>

            <NavbarProfile classNameProp={"lg:flex hidden lg:w-full"} user={user} />
            <div className='flex items-center gap-4'>
              {
                width >= 1024 ? (<ThemeToggle />) : (<NotificationCard />)
              }

              <FaBars className='lg:hidden block text-lightOrange text-xl cursor-pointer ml-1 mr-2' onClick={() => setMenuOpen(!menuOpen)} />
              {/* {
                width <= 1024 && chatId ? (
                  <div className='flex  items-center justify-center   relative'>
                    <div onClick={() => { setShow(!show) }} className='flex  items-center justify-center w-8 h-8 rounded-full hover:bg-gray-500/30 transition-all cursor-pointer'>
                      <BsThreeDotsVertical size={23} className='' />
                    </div>


                    <div className={`${show ? "block " : "hidden "} profile-card lg:w-[200px] w-[200px] h-auto top-14 right-0 absolute z-20 rounded-md flex flex-col gap-2 items-start py-4 px-4`}>
                      <Link href="/profil" className='flex items-center gap-4 text-xl font-bold btn-text transition-all hover:hover-profile-text '><IoBagHandleOutline  className='' />Market</Link>
                      <hr className='border-t-2 w-full text-black' />


                    </div>
                  </div>
                ) : null
              } */}
            </div>
          </div>
        </div>
        <div className={`${menuOpen ? "fixed flex items-center flex-col gap-5  w-full mt-[80px] z-40 bg-main border-b border-mediumBlue py-4" : "hidden"}`}>

          <NavbarProfile classNameProp={"flex items-center w-full my-0 "} user={user} />


          <MenuItem slug="?q=Market" name='Market' selected={false} icon={IoBagHandleOutline} onClickSubmit={()=> {dispatch(sideMenuMarketFunc())}}/>
          <MenuItem slug="/profil" name='Profil' selected={false} icon={FaUserEdit } />
          <MenuItem slug="/ayarlar" name='Ayarlar' selected={false} icon={MdOutlineSettings} />



          <div onClick={async () => {
            if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
              await signOut();
              router.push("/");

            }
          }} className='flex items-center gap-4 text-xl font-bold mb-2 btn-text cursor-pointer menu-text transition-all hover:hover-menu-text'><PiSignOut />Çıkış Yap</div>


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

              <FaBars className='lg:hidden block text-lightOrange text-xl cursor-pointer' onClick={() => setMenuOpen(!menuOpen)} />
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
          <FaBars className='lg:hidden block text-lightOrange text-xl cursor-pointer' onClick={() => setMenuOpen(!menuOpen)} />
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
