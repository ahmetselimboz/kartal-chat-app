"use client"

import { useEffect, useState } from "react"
import { useAppDispatch } from "../redux/hooks"
import { setUser } from "../redux/userSlice"

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