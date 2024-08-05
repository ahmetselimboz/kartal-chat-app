"use client"

import { IconType } from "react-icons";
import { MdClose } from "react-icons/md";
import Button from "../Buttons/Button";
import { useState } from "react";

interface ModalProps {
    title: string,
    icon: IconType,
    invite_name: string | null | undefined,
    onClose: () => void,
    onSubmit: () => void,

}

const DeleteMessageModal = ({ title, icon: Icon, onClose, invite_name, onSubmit }: ModalProps) => {

    return (
        <div className='bg-black-alpha fixed flex items-center justify-center w-full lg:h-full h-screen z-50'>
            <div className='bg-model opacity-100 lg:w-1/4 w-2/3 h-auto flex flex-col rounded-md shadow-md shadow-gray-600 p-5'>
                <div className='flex flex-row items-center justify-center w-full relative'>
                    <Icon className="modal-title " size={75} />
                    <MdClose size={25} onClick={() => { onClose() }} className="btn-text cursor-pointer hover:opacity-70 transition-opacity absolute top-0 right-0" />
                </div>
                <div className="flex items-center justify-center w-full ">
                    <div className="md:text-3xl text-xl  modal-title font-bold w-fit">{title}</div>
                </div>
                <div className="text-xl btn-text flex flex-col items-center text-center my-4">
                    <div className="text-darkOrange">{invite_name}</div> mesajı silmek istiyor musunuz?
                </div>
                <div className="flex flex-col items-center mb-3">
                    <Button btnLabel="Sil" onSubmit={onSubmit}></Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteMessageModal