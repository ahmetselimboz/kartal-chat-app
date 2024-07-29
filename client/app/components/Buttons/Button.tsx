"use client"

import { IconType } from "react-icons"


interface ButtonProps {
    btnLabel: string,
    onSubmit: (e:React.MouseEvent<HTMLButtonElement>)=> void
    disabled?: boolean
}

const Button= ({btnLabel, onSubmit, disabled}:ButtonProps) => {
  console.log(disabled)

  if(disabled){
    return (
      <button className={`opacity-50 cursor-not-allowed select-none lg:w-1/2 w-8/12 py-2 px-8 bg-darkOrange text-xl text-white rounded-md  transition-all border `} onClick={onSubmit} disabled>{btnLabel}</button>
    )
  }


  return (
    <button className={`opacity-100 cursor-pointer hover:bg-orange-700 select-none lg:w-1/2 w-8/12 py-2 px-8 bg-darkOrange text-xl text-white rounded-md  transition-all border `} onClick={onSubmit} >{btnLabel}</button>
  )
}

export default Button