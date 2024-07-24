"use client"

import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => {

    const { theme } = useTheme()
    return (
        <>
            <ToastContainer theme={theme}/>
        </>
    )
}

export default ToastProvider