"use client"
/* eslint-disable react-hooks/rules-of-hooks */
import { updateEmail } from '@/app/actions/sendEmail'
import { useAppDispatch } from '@/app/redux/hooks'
import { navbarShowFunc } from '@/app/redux/navbarSlice'
import { MdError, MdOutlineCheckCircleOutline } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Button from '@/app/components/Buttons/Button';

const emailConfirmed = () => {


    const params = useSearchParams()
    const id = params.get("id")
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [result, setResult] = useState(null) as any


    useEffect(() => {
        const emailFun = async () => {
            setResult(await updateEmail(id) as any)
        }

        emailFun()
        dispatch(navbarShowFunc());

        return () => {
            dispatch(navbarShowFunc());
        };
    }, [id, dispatch])
    console.log(result)

    if (!result?.status) {
        return (
            <div className='flex items-center justify-center w-full h-screen gap-5'>
                <MdError size={70} className='text-red-600 text-3xl' />
                <div className='text-2xl font-bold text-main'>
                    {result?.message}
                </div>
            </div>
        )
    }

    return (
        <div className='flex items-center justify-center w-full h-screen  ' >
            <div className='flex flex-col items-center justify-center gap-5 lg:w-1/3 w-[90%] h-auto px-4 py-6 bg-transparent rounded-md border-4 border-mediumBlue'>

                <div className='flex items-center gap-5'>
                    <MdOutlineCheckCircleOutline size={70} className='text-green-600 text-3xl' />
                    <div className=''> 
                        <div className='text-2xl font-bold text-main'>
                            Emailiniz Doğrulandı!
                        </div>
                        <div className='text-2xl font-bold text-main'>
                            Giriş Yapabilirsiniz!
                        </div>
                    </div>
                </div>

                <div className='flex justify-center w-full'>
                    <Button onSubmit={() => router.push(`/giris-yap`)} btnLabel='Giriş Yap' />
                </div>
            </div>
        </div>
    )
}

export default emailConfirmed   