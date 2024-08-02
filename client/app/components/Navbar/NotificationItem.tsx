import axios from 'axios';
import React from 'react'
import { IconType } from 'react-icons'
import { FaEnvelopeCircleCheck, FaUserPlus } from "react-icons/fa6";

interface notifyProp {
  type: string,
  icon?: IconType,
  from: string,
  fromId: string,
  id: string,
  username: string | null | undefined,
  removeFunc: (id: string, username: string | null | undefined) => {};
  addFriendFunc: (id: string, username: string | null | undefined) => {};
}


const NotificationItem = ({ type, fromId, from, id, username, removeFunc, addFriendFunc }: notifyProp) => {

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
          <div className='flex flex-row items-center gap-2 my-3 '>
            <div onClick={() => { addFriendFunc(id, fromId) }} className='csm rounded-md bg-lightOrange hover:bg-lightOrange/80 px-2 py-1 cursor-pointer text-white'>Kabul Et</div>
            <div onClick={() => { removeFunc(id, username) }} className='csm rounded-md bg-darkGray hover:bg-darkGray/80 px-2 py-1 cursor-pointer  text-white'>Reddet</div>
          </div>
        </div>
      </div>
    )

  }

}

export default NotificationItem