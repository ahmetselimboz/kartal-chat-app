"use client"
import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";
import Button from "../Buttons/Button";
import { useState } from "react";

interface ModalProps{
    title:string,
    icon: IconType,
    invite_name: string,
    onClose: ()=>void,
    onSubmit: ()=>void,

}



const Modal = ({title, icon:Icon,onClose, invite_name,onSubmit}:ModalProps) => {



    return (
        <div className='bg-black-alpha fixed flex items-center justify-center w-full h-full z-50'>
            <div className='bg-model opacity-100 w-1/3 h-auto flex flex-col rounded-md shadow-md shadow-gray-600 p-5'>
                <div className='flex flex-row items-center justify-center w-full relative'>
                    <Icon className="modal-title " size={75} />
                    <MdClose size={25} onClick={()=>{onClose()}} className="btn-text cursor-pointer hover:opacity-70 transition-opacity absolute top-0 right-0" />
                </div>
                <div className="flex items-center justify-center w-full ">
                    <div className="text-3xl modal-title font-bold w-fit">{title}</div>
                </div>
                <div className="text-xl btn-text flex flex-col items-center my-4">
                    <div className="text-darkOrange">{invite_name}</div> kişisine arkadaşlık göndermek istiyor musunuz?
                </div>
                <div className="flex flex-col items-center mb-3">
                    <Button btnLabel="Gönder" onSubmit={onSubmit}></Button>
                </div>
            </div>
        </div>
    )
}

export default Modal