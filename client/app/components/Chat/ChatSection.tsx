"use client"
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import React, { useState } from 'react'
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const ChatSection = () => {

    const [plus, setPlus] = useState(false)

    return (
        <>
            <div className='w-full h-fit bg-main'>
                <div className="w-full flex justify-start mb-3">
                    <div className="w-1/2 h-fit flex items-start justify-start ">
                        <div className="w-[30px] h-[30px] bg-reverse-main rounded-full mx-2 cursor-pointer"></div>
                        <div className="bg-darkOrange rounded-tr-md rounded-br-md rounded-bl-md  h-auto w-9/12 cursor-pointer px-2 py-2 mt-2">
                            {/* <div className="csm w-fit text-lightGray">
                                ahmetselimbozz
                                <hr className="border-b mb-2 rounded-md" />
                            </div> */}

                            <div className="mb-2 csm text-lightGray">Merhaba! Hoş Geldiniz! Mesajlaşmaya başlayın!</div>
                            <div className="flex items-center flex-row justify-end gap-1 mx-1">
                                {
                                /* <div className="text-xs text-lightGray">
                                    <IoCheckmarkDoneSharp />
                                   </div> 
                                */
                                }
                                <div className="cxs text-lightGray">
                                    14.30
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end mb-3">
                    <div className="w-1/2 h-fit flex items-start justify-end mb-3">

                        <div className="bg-darkGray rounded-tl-md rounded-br-md rounded-bl-md  h-auto w-9/12 cursor-pointer px-2 py-2 mt-2">
                            <div className="mb-2 csm text-lightGray">Merhaba! Hoş Geldiniz! Mesajlaşmaya başlayın!</div>
                            <div className="flex items-center flex-row justify-between gap-1 mx-1">
                                <div className="cxs text-lightGray">
                                    14.30
                                </div>
                                <div className="cxs text-lightGray">
                                    <IoCheckmarkDoneSharp className="csm"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-[30px] h-[30px] bg-reverse-main rounded-full mx-2 cursor-pointer"></div>
                    </div>
                </div>
            </div>
            <div className=' bg-transparent w-full flex items-center absolute bottom-0 mb-1'>
                    <div className='w-1/12 h-full bg-darkgray flex items-center justify-center relative'>
                        <div className={`${plus ? "block" : "hidden"} lg:w-[200px] h-[100px] bg-transparent absolute left-2 bottom-9 rounded-md`}></div>
                        <FaPlus onClick={() => { setPlus(!plus) }} className="w-[25px] h-[25px] rounded-full text-lightGray bg-mediumBlue text-2xl p-1 transition-all cursor-pointer hover:bg-darkModeBlue" />
                    </div>
                    <div className='w-9/12'><input type="text" className='w-full rounded-md h-auto px-4 py-2 outline-none bg-input' placeholder='Mesaj' /></div>
                    <div className='w-2/12 bg-transparent px-1 flex items-center justify-center'>
                        <button type="submit" className="flex items-center px-2 py-1 gap-2 bg-mediumBlue text-lightGray rounded-md w-fit cursor-pointer transition-all hover:bg-darkModeBlue">
                            <IoIosSend className="text-lg" />
                            <div >Send</div>
                        </button>

                    </div>
                </div>
        </>
    )
}

export default ChatSection