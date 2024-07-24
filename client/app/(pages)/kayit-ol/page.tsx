"use client"
import Button from '@/app/components/Buttons/Button'
import Input from '@/app/components/Inputs/Input'
import { navbarShowFunc } from '@/app/redux/navbarSlice'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import SocialMediaButton from "@/app/components/Buttons/SocialMediaButton"
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import PasswordInput from '@/app/components/Inputs/PasswordInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import bcrypt from "bcryptjs"

const Register = () => {
    const router = useRouter()

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
        console.log(data)
      
        if (data.password !== data.repassword) {
            toast.error("Şifrelerinizin Eşleştiğinden Emin Olunuz!!")
            setValue("password", "")
            setValue("repassword", "")
            return false
        }
        data.password = await bcrypt.hash(data.password, 10)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`, data)
            console.log(res)
            if (res?.data?.data?.success) {
                toast.success("Kayıt Olma İşlemi Başarılı!!")
                router.push("/")
            } else {
                toast.error(res?.data?.message)
                setValue("password", "")
            }
        } catch (error) {
            toast.error("Bir Hata Oluştu!!")
            setValue("password", "")

        }
    }

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const dispatch = useDispatch()



    useEffect(() => {

        dispatch(navbarShowFunc());

        return () => {
            dispatch(navbarShowFunc());
        };
    }, [dispatch]);

    return (
        <div className='flex items-center justify-center w-full h-full'>

            <div className='lg:w-1/3 w-[90%] h-auto px-4 py-6 bg-transparent rounded-md border-4 border-mediumBlue'>
                <div className='lg:text-4xl text-3xl title-text font-bold text-center'>
                    Kayıt Ol
                </div>
                <hr className='my-4' />
                <div className='my-4'>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Kullanıcı Adınız"
                        labelTitle="Kullanıcı Adınız"
                        register={register}
                        errors={errors}
                        required
                    />
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
                    <Button onSubmit={handleSubmit(onSubmit)} btnLabel="Kayıt Ol" />

                </div>
                <div className="flex flex-col items-center mt-3">
                    <div>Ya da</div>
                    <SocialMediaButton
                        icon={FcGoogle}
                        btnTitle="Google ile Giriş"
                        onSubmit={() => { signIn('google', { callbackUrl }) }}
                    />

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