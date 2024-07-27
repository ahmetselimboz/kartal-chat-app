"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { MdOutlineDarkMode, MdOutlineWbSunny  } from "react-icons/md";

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { systemTheme, theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const themeMode = theme === "system" ? systemTheme : theme

    return (

        <div>
            {
                mounted && (themeMode === "dark" ?
                    <MdOutlineWbSunny onClick={()=> setTheme("light")}  size={25} className='cursor-pointer text-lightOrange'  />
                    :
                    <MdOutlineDarkMode onClick={()=> setTheme("dark")} size={25} className='cursor-pointer  text-darkBlue ' />

                )
            }

        </div>
    )
}

export default ThemeToggle