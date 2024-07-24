"use client"

import React from 'react'


import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    id: string,
    type: string,
    placeholder: string,
    labelTitle: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors,
    required: boolean
}


const Input = ({ id, type, placeholder, labelTitle, register, errors, required }: InputProps) => {
    return (
        <div className="flex flex-col my-2">
            <label htmlFor={id} className='text-main'>{labelTitle}:</label>
            <input className={`${errors[id] ? "border border-red-500" : "border border-gray-500"} w-full outline-none py-2 px-4 rounded-md`}
                {...register(id, { required })}
                type={type}
                id={id}
                placeholder={placeholder}
                required />

            {
                !errors[id] ? (
                    <div></div>
                ) : (
                    <div className="text-sm text-red-500">{errors[id]?.type != "required" ? "" : "Boş Bırakılamaz!"}</div>
                )
            }


        </div>
    )
}

export default Input