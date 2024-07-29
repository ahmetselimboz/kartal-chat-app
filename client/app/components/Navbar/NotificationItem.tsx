import React from 'react'
import { IconType } from 'react-icons'

interface notifyProp{
    type: string,
    icon: IconType
}


const NotificationItem = ({type, icon:Icon }:notifyProp) => {



  return (
    <div className='flex items-center gap-3 cursor-pointer transition-all hover:bg-slate-200 px-4 w-full py-2'>
        <Icon  className='btn-text text-4xl'/>
        <div className='btn-text text-sm'><div className='notify-username'>ahmetselimbozz</div> kişisinden arkadaşlık daveti!</div>
    </div>
  )
}

export default NotificationItem