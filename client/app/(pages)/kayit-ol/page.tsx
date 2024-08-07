"use client"
import Button from '@/app/components/Buttons/Button'
import Input from '@/app/components/Inputs/Input'
import { navbarShowFunc } from '@/app/redux/navbarSlice'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import SocialMediaButton from "@/app/components/Buttons/SocialMediaButton"
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import PasswordInput from '@/app/components/Inputs/PasswordInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import bcrypt from "bcryptjs"
import { sendEmail } from '@/app/actions/sendEmail'
import { setUser } from '@/app/redux/userSlice'

interface Suggestion {
    username: string;
}

const Register = () => {
    const router = useRouter()
    const { data: session, update } = useSession()
    const [message, setMessage] = useState<boolean | null>(null)
    const [existError, setExistError] = useState<boolean | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

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
            email: "",
            password: "",
            repassword: "",
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
       // console.log(data)

        if (data.password !== data.repassword) {
            toast.error("Şifrelerinizin Eşleştiğinden Emin Olunuz!!")
            setValue("password", "")
            setValue("repassword", "")
            return false
        }
        data.password = await bcrypt.hash(data.password, 10)
        data.repassword = ""

        data.username = userName
    
        if (userName == "") {
            toast.error("Boş Bırakmayınız!")
            return false
        }
        if (userName == "#") {
            toast.error("Lütfen Bir Kullanıcı Adı Seçiniz!")
            return false
        }


    
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`, data)
   
            if (res?.data?.data?.success) {
            
                toast.success("Emailinize Doğrulama Linki Gönderdik!! Email Kutunuzu Kontrol Ediniz!!")
                const jwtInfo = {
                    id: res?.data?.data?.id,
                    email: data.email,
                };

                await sendEmail(jwtInfo)
                router.push("/giris-yap")
            } else {
                toast.error(res?.data?.message)
                setValue("password", "")
                setValue("repassword", "")
            }
        } catch (error) {
            toast.error("Bir Hata Oluştu!!")
            setValue("password", "")
            setValue("repassword", "")

        }
    }


    const dispatch = useDispatch()

    useEffect(() => {
        const id = setTimeout(() => {
            if (userName != "" && !suggestions) {
                setDisabled(false)
                setExistError(true)
                setMessage(true)
            }

        }, 1500);
        return () => clearTimeout(id);

    }, [userName, inputValue, suggestions])

    useEffect(() => {

        dispatch(navbarShowFunc());

        return () => {
            dispatch(navbarShowFunc());
        };
    }, [dispatch]);

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

    const existUsername = async (e?: any) => {

        try {
            setInputValue(e.target.value)
            setUsername("")
            if (e.target.value != "") {

                const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/exist-user`, { username: e.target.value })
                setSuggestions(result.data.data.suggestion)
                setUsername("#")

                setExistError(result.data.data.success)
                setMessage(result.data.data.message)
                if (result.data.data.success) {
                    setDisabled(false)
                    setUsername(e.target.value)

                }
            } else {
                setExistError(null)
                setMessage(null)
            }

        } catch (error) {
            window.location.reload()
        }

    }


    return (
        <div className='flex items-center justify-center w-full h-full'>

            <div className='lg:w-1/3 w-[90%] h-auto px-4 py-6 bg-transparent rounded-md border-4 border-mediumBlue'>
                <div className='lg:text-4xl text-3xl title-text font-bold text-center'>
                    Kayıt Ol
                </div>
                <hr className='my-4' />
                <div className='my-4'>

                <div className="flex flex-col my-2">
                    <label htmlFor="username" className='text-main'>Kullanıcı Adınız:</label>
                    <input className={`${existError == null && message == null ? "border border-gray-500" : `${existError != true ? "border border-red-500" : "border border-green-500"} `} w-full outline-none py-2 px-4 rounded-md `}
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
                                        <div key={i} className="text-xs text-lightOrange my-1 cursor-pointer" onClick={() => { setInputValue(item.username); setExistError(true); setMessage(true); setUsername(item.username);  }}>
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
                    <Input
                        id="email"
                        type="email"
                        placeholder="Emailiniz"
                        labelTitle="Emailiniz"
                        register={register}
                        errors={errors}
                        required
                    />
                    <PasswordInput id="password"

                        placeholder="Şifreniz"
                        labelTitle="Şifreniz"
                        register={register}
                        errors={errors}
                        required />

                    <PasswordInput id="repassword"

                        placeholder="Şifrenizi Tekrar Giriniz"
                        labelTitle="Şifrenizi Tekrar Giriniz"
                        register={register}
                        errors={errors}
                        required />
                </div>
                <div className="flex justify-center flex-col items-center w-full">
                    {
                        message && existError ? (
                            <Button onSubmit={handleSubmit(onSubmit)} btnLabel="Kaydet" />
                        ) : (
                            <Button onSubmit={handleSubmit(onSubmit)} btnLabel="Kaydet" disabled />
                        )
                    }


                </div>
                <div className="flex flex-col items-center mt-3">
                    {/* <div>Ya da</div>
                    <SocialMediaButton
                        icon={FcGoogle}
                        btnTitle="Google ile Giriş"
                        onSubmit={() => { signIn('google', { callbackUrl }) }}
                    /> */}

                    <div className="">
                        <small>Zaten hesabınız var mı?</small>
                        <Link href="/giris-yap" className="cursor-pointer text-sm mx-1 text-lightOrange  hover:border-b border-lightOrange transition-all">Giriş Yap</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register