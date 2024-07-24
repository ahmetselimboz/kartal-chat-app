"use client"

import { IconType } from "react-icons"


interface ButtonProps {
    btnLabel: string,
    onSubmit: (e:React.MouseEvent<HTMLButtonElement>)=> void
   
}

const Button= ({btnLabel, onSubmit}:ButtonProps) => {
  return (
    <button className="select-none lg:w-1/2 w-8/12 py-2 px-8 bg-darkOrange text-xl text-white rounded-md hover:bg-orange-700 transition-all border" onClick={onSubmit}>{btnLabel}</button>
  )
}

export default Button