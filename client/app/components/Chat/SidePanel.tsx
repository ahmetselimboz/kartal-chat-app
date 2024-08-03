"use client"


import { useAppSelector } from '@/app/redux/hooks'
import React, { useState } from 'react'

const SidePanel = () => {

    const [show, setShow] = useState(false)
    const sideMenu = useAppSelector(state => state.sideMenu.sideMenu)

    return (
        <>
            <div className='relative'>
                <div className={`${sideMenu.market ? "block" : "hidden"} w-full fixed h-screen bg-mediumBlue z-20`}></div>
                <div className='w-full fixed h-screen bg-lightOrange/20 z-10'></div>

            </div>
        </>
    )
}

export default SidePanel