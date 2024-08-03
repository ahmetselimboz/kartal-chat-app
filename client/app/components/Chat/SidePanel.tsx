"use client"


import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import React, { useState } from 'react'
import useWidth from '@/app/hooks/useWidth'
import { MdArrowBackIosNew } from 'react-icons/md'
import { sideMenuFunc } from '@/app/redux/sideMenuSlice'

const SidePanel = () => {

    const [show, setShow] = useState(false)
    const sideMenu = useAppSelector(state => state.sideMenu.sideMenu)
    const { width, height } = useWidth() as any;

    const dispatch = useAppDispatch()


    if (width <= 1024) {
        return (
            <>
                <>
                    <div className={`${sideMenu.market ? "block" : "hidden"} w-full fixed h-screen bg-main z-40`}>
                        <div onClick={() => { dispatch(sideMenuFunc()) }} className='flex absolute top-6 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-500/30 transition-all'>
                            <MdArrowBackIosNew size={23} className='mr-[3px]' />
                        </div>
                    </div>

                </>
            </>
        )
    }

    return (
        <>
            <div className='relative z-40'>
                <div className={`${sideMenu.market ? "block" : "hidden"} w-full fixed h-screen bg-mediumBlue z-20`}>
                    <div onClick={() => { dispatch(sideMenuFunc()) }} className='flex absolute top-2.5 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-500/30 transition-all'>
                        <MdArrowBackIosNew size={23} className='mr-[3px]' />
                    </div>
                </div>
                <div className='w-full fixed h-screen bg-lightOrange/20 z-10'></div>

            </div>
        </>
    )
}

export default SidePanel