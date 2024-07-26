"use client"
import Button from '@/app/components/Buttons/Button'
import Input from '@/app/components/Inputs/Input'
import { navbarShowFunc } from '@/app/redux/navbarSlice'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
interface Suggestion {
    username: string;
}

const Username = () => {
    const router = useRouter()
    const id = useSearchParams().get("id")
    const { data: session, update } = useSession()
    const [message, setMessage] = useState(null)
    const [existError, setExistError] = useState<boolean | null>(null);

    const [userName, setUsername] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            id: ""
        }
    })

    const handleUpdateUser = async (username: string) => {
        const newSession = {
            ...session,
            user: {
                ...session?.user,
                username: username
            },
        };
   
        await update(newSession);
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            data.id = session?.user.id
            data.username = userName

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/update-user`, data)
 
            if (res?.data?.data?.success) {
                handleUpdateUser(userName)
                toast.success("Giriş İşlemi Başarılı!!")
                window.location.href = "/"
            } else {
                toast.error(res.data.data.message)
                toast.error("Bir Hata Oluştu! Tekrar deneyiniz!")
            }
        } catch (error) {
            toast.error("Bir Hata Oluştu!!")

        }
    }

    const dispatch = useDispatch()



    useEffect(() => {

        dispatch(navbarShowFunc());

        return () => {
            dispatch(navbarShowFunc());
        };

    }, [dispatch, inputValue]);

    const existUsername = async (e?: any) => {
        setInputValue(e.target.value)

        if (e.target.value != "") {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/exist-user`, { username: e.target.value })
            setSuggestions(result.data.data.suggestion)
           
          
            setExistError(result.data.data.success)
            setMessage(result.data.data.message)
            if (result.data.data.success) {
                setUsername(e.target.value)
            }
        } else {
            setExistError(null)
            setMessage(null)
        }


    }

    return (
        <div className='flex items-center justify-center w-full h-full'>

            <div className='lg:w-1/3 w-[90%] h-auto px-4 py-6 bg-transparent rounded-md border-4 border-mediumBlue'>
                <div className='lg:text-4xl text-3xl title-text font-bold text-center'>
                    Kullanıcı Adı Belirleyin
                </div>
                <hr className='my-4' />
                <div className="flex flex-col my-2">
                    <label htmlFor="username" className='text-main'>Kullanıcı Adınız:</label>
                    <input className={`${existError == null && message == null ? "border border-gray-500" : `${existError != true ? "border border-red-500" : "border border-green-500"} `}w-full outline-none py-2 px-4 rounded-md`}
                        onChange={existUsername}
                        value={inputValue}
                        type="text"
                        id="username"
                        placeholder="Kullanıcı Adınız"
                        required />

                    {
                        existError == false ? (
                            <>
                                <div className="text-xs text-red-500 my-1 mx-2">{message}</div>
                                <div className='flex flex-row items-center justify-start gap-2 my-1 mx-2'>
                                    <div className='text-main text-sm'>Öneriler: </div>
                                    {suggestions?.map((item, i) => (
                                        <div key={i} className="text-xs text-lightOrange my-1 cursor-pointer" onClick={()=>{setInputValue(item.username);setExistError(true); setMessage(null);setUsername(item.username)}}>
                                            {item.username}
                                        </div>
                                    ))}
                                </div>

                            </>
                        ) : (
                            <div className="text-xs text-green-500 my-1 mx-2">{message}</div>
                        )
                    }



                </div>


                <div className="flex justify-center flex-col items-center w-full">
                    <Button onSubmit={handleSubmit(onSubmit)} btnLabel="Kaydet" />

                </div>

            </div>

        </div>
    )
}

export default Username