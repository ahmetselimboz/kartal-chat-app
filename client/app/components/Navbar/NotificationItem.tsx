import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IconType } from 'react-icons'
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { FaEnvelopeCircleCheck, FaUserPlus } from "react-icons/fa6";
import { FiUserCheck, FiUserX } from 'react-icons/fi';

interface notifyProp {
  type: string,
  icon?: IconType,
  from: string,
  fromId: string,
  id: string,
  username: string | null | undefined,
  removeFunc: (id: string, username: string | null | undefined, fromId: string | null | undefined, type: string | null | undefined) => {};
  addFriendFunc: (id: string, fromId: string | null | undefined, type: string | null | undefined) => {};
}


const NotificationItem = ({ type, fromId, from, id, username, removeFunc, addFriendFunc }: notifyProp) => {

  const router = useRouter()

  //console.log(from)

  const notifyType = [
    {
      type: "friendship-invitation",
      icon: FaUserPlus
    },
    {
      type: "new-message",
      icon: FaEnvelopeCircleCheck
    },
    {
      type: "reject-friendship-invitation",
      icon: FiUserX
    },
    {
      type: "accept-friendship-invitation",
      icon: FiUserCheck
    },
    {
      type: "remove-friendship",
      icon: AiOutlineUsergroupDelete
    },
  ]

  if (type == "friendship-invitation") {
    return (

      <div className='flex items-start justify-evenly gap-4 transition-all hover:notify-menu-area px-4 w-full pt-2'>
        {
          notifyType.map((item, i) => (
            item.type == type ? (<item.icon key={i} className='btn-text text-5xl' />) : null
          ))
        }
        <div className='flex flex-col items-center'>
          <div className='btn-text text-sm text-center'><div className='notify-username'>{from}</div> kişisinden arkadaşlık daveti!</div>
          <div className='flex w-full flex-row justify-end items-center gap-2 my-3 px-4'>
            <div onClick={() => { addFriendFunc(id, fromId, type) }} className='csm rounded-md bg-lightOrange hover:bg-lightOrange/80 px-2 py-1 cursor-pointer text-white'>Kabul Et</div>
            <div onClick={() => { removeFunc(id, username, fromId, type) }} className='csm rounded-md bg-darkGray hover:bg-darkGray/80 px-2 py-1 cursor-pointer  text-white'>Reddet</div>
          </div>
        </div>
      </div>
    )
  }
  if (type == "reject-friendship-invitation") {
    return (

      <div className='flex items-start justify-evenly gap-4 transition-all hover:notify-menu-area px-4 w-full pt-2'>
        {
          notifyType.map((item, i) => (
            item.type == type ? (<item.icon key={i} className='btn-text text-5xl' />) : null
          ))
        }
        <div className='flex flex-col items-center'>
          <div className='btn-text text-sm text-center'><div className='notify-username'>{from}</div> kişisi arkadaşlık davetinizi reddetti!</div>
          <div className='flex w-full flex-row justify-end items-center gap-2 my-3 px-4'>

            <div onClick={() => { removeFunc(id, username, fromId, type) }} className='csm rounded-md bg-darkGray hover:bg-darkGray/80 px-2 py-1 cursor-pointer  text-white'>Kapat</div>
          </div>
        </div>
      </div>
    )

  }

  if (type == "accept-friendship-invitation") {
    return (

      <div className='flex items-start justify-evenly gap-4 transition-all hover:notify-menu-area px-4 w-full pt-2'>
        {
          notifyType.map((item, i) => (
            item.type == type ? (<item.icon key={i} className='btn-text text-5xl' />) : null
          ))
        }
        <div className='flex flex-col items-center'>
          <div className='btn-text text-sm text-center'><div className='notify-username'>{from}</div> kişisi arkadaşlık davetinizi kabul etti! Artık arkadaşsınız!</div>
          <div className='flex w-full flex-row justify-end items-center gap-2 my-3 px-4'>

            <div onClick={() => { removeFunc(id, username, fromId, type) }} className='csm rounded-md bg-darkGray hover:bg-darkGray/80 px-2 py-1 cursor-pointer  text-white'>Kapat</div>
          </div>
        </div>
      </div>
    )
  }
  if (type == "remove-friendship") {
    return (

      <div className='flex items-start justify-evenly gap-4 transition-all hover:notify-menu-area px-4 w-full pt-2'>
        {
          notifyType.map((item, i) => (
            item.type == type ? (<item.icon key={i} className='btn-text text-5xl' />) : null
          ))
        }
        <div className='flex flex-col items-center'>
          <div className='btn-text text-sm text-center'><div className='notify-username'>{from}</div> kişisi sizi arkadaşlıktan çıkardı!</div>
          <div className='flex w-full flex-row justify-end items-center gap-2 my-3 px-4'>

            <div onClick={() => { removeFunc(id, username, fromId, type) }} className='csm rounded-md bg-darkGray hover:bg-darkGray/80 px-2 py-1 cursor-pointer  text-white'>Kapat</div>
          </div>
        </div>
      </div>
    )

  }
  if (type == "new-message") {
    return (

      <div className='flex items-start justify-evenly gap-4 transition-all hover:notify-menu-area px-4 w-full pt-2'>
        {
          notifyType.map((item, i) => (
            item.type == type ? (<item.icon key={i} className='btn-text text-5xl' />) : null
          ))
        }
        <div className='flex flex-col items-center'>
          <div className='btn-text text-sm text-center'><div className='notify-username'>{from}</div> kişisinden 20 yeni mesaj!</div>
          <div className='flex w-full flex-row justify-end items-center gap-2 my-3 px-4'>
          <div onClick={() => { router.push("/sohbet") }} className='csm rounded-md bg-lightOrange hover:bg-lightOrange/80 px-2 py-1 cursor-pointer text-white'>Tamam</div>
            <div onClick={() => { removeFunc(id, username, fromId, type) }} className='csm rounded-md bg-darkGray hover:bg-darkGray/80 px-2 py-1 cursor-pointer  text-white'>Kapat</div>
          </div>
        </div>
      </div>
    )

  }

}

export default NotificationItem