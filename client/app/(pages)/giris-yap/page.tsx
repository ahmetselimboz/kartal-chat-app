/* eslint-disable react-hooks/rules-of-hooks */
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
import { useAppDispatch } from '@/app/redux/hooks'
import { fetchCurrentUser } from "@/app/actions/getCurrentUser";
import { setUser } from '@/app/redux/userSlice'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
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
      password: "",
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)

    const result = await signIn('credentials', {
      ...data,
      redirect: false
    });

    if (result?.ok) {
      toast.success("Giriş İşlemi Başarılı!!")
      window.location.href = "/"
    } else if (!result?.ok) {
      toast.error(result?.error)
      reset()
    } else {
      toast.error("Giriş yapılamadı!!")
      reset()
    }
  }

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';





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
          Giriş Yap
        </div>
        <hr className='my-4' />
        <div className='my-4'>
          <Input
            id="username"
            type="text"
            placeholder="Email veya Kullanıcı Adınız"
            labelTitle="Email veya Kullanıcı Adınız"
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

        </div>
        <div className="flex justify-center flex-col items-center w-full">
          <Button onSubmit={handleSubmit(onSubmit)} btnLabel="Giriş Yap" />

        </div>
        <div className="flex flex-col items-center mt-3">
          <div>Ya da</div>
          <SocialMediaButton
            icon={FcGoogle}
            btnTitle="Google ile Giriş"
            onSubmit={() => { signIn('google', { callbackUrl }) }}
          />

          <div className="">
            <small>Hesabınız yok mu?</small>
            <Link href="/kayit-ol" className="cursor-pointer text-sm mx-1 text-lightOrange  hover:border-b border-lightOrange transition-all">Kayıt Ol</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login