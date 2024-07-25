"use client"
import Button from '@/app/components/Buttons/Button'
import Input from '@/app/components/Inputs/Input'
import { navbarShowFunc } from '@/app/redux/navbarSlice'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'


const Username = () => {
    const router = useRouter()
    const id = useSearchParams().get("id")
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
            id:""
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        data.id = id
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/update-user`, data)
            console.log(res)
            if (res?.data?.data?.success) {
                toast.success("Kayıt Olma İşlemi Başarılı!!")
                router.push("/giris-yap")
            } else {
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
    }, [dispatch]);

    return (
        <div className='flex items-center justify-center w-full h-full'>

            <div className='lg:w-1/3 w-[90%] h-auto px-4 py-6 bg-transparent rounded-md border-4 border-mediumBlue'>
                <div className='lg:text-4xl text-3xl title-text font-bold text-center'>
                    Kullanıcı Adı Belirleyin
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

                </div>
                <div className="flex justify-center flex-col items-center w-full">
                    <Button onSubmit={handleSubmit(onSubmit)} btnLabel="Kaydet" />

                </div>
              
            </div>

        </div>
    )
}

export default Username