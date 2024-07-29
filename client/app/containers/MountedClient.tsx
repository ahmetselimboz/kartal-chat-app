"use client"

import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux/hooks"
import { setUser } from "../redux/userSlice"
import { getSession } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]/route"

const MountedClient = ({ children }: { children: React.ReactNode }) => {

    const [mounted, setMounted] = useState(false)



    useEffect(()=>{
        setMounted(true)
      
    }, [])

    if(!mounted){
        return null
    }

    return (
        <>
            {children}
        </>
    )
}

export default MountedClient