"use client"

import Input from "@/app/components/Inputs/Input"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks"
import { navbarShowFunc } from "@/app/redux/navbarSlice"
import { setUser, User } from "@/app/redux/userSlice"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { LuPencil } from "react-icons/lu"
import { toast } from "react-toastify"

interface Suggestion {
    username: string;
}

const Profil = () => {
    const [message, setMessage] = useState<boolean | null>(null)
    const [existError, setExistError] = useState<boolean | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [userName, setUsername] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputValueBio, setInputValueBio] = useState("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [file, setFile] = useState<any | null>(null);
    const authUser = useAppSelector(state => state.user.user) as User
    const [preview, setPreview] = useState<string>("");
    const [routerMessage, setRouterMessage] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    const router = useRouter()

    const dispatch = useAppDispatch()

    useEffect(() => {
        const id = setTimeout(() => {
            if (userName != "" && !suggestions) {
                setDisabled(false)
                setExistError(true)
                setMessage(true)
            }

        }, 1500);
        return () => clearTimeout(id);

    }, [userName, inputValue, suggestions])

    useEffect(() => {
        setInputValue(authUser.username as any)
        setInputValueBio(authUser.bioDesc as any)
        setPreview(authUser.imageUrl as string)


    }, []);



    const bioDescFunc = async (e?: any) => {
        console.log(e.target.value)
        setInputValueBio(e.target.value)
    }


    const existUsername = async (e?: any) => {

        try {
            setInputValue(e.target.value)
            setUsername("")
            if (e.target.value != "") {

                const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/exist-user`, { username: e.target.value })
                setSuggestions(result.data.data.suggestion)
                setUsername("#")

                setExistError(result.data.data.success)
                setMessage(result.data.data.message)
                if (result.data.data.success) {
                    setDisabled(false)
                    setUsername(e.target.value)

                }
            } else {
                setExistError(null)
                setMessage(null)
            }

        } catch (error) {
            window.location.reload()
        }

    }

    const imageFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
            // Create a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreview(reader.result);

                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview("");
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setRouterMessage('');

        const formData = new FormData(e.currentTarget);
        console.log("formData: ", formData)
        formData.append('userId', authUser.id as string);
        formData.append('profilePicture', file);
        formData.append('preview', preview as any);


        try {
            const response = await fetch('/api/image', {
                method: 'POST',
                body: formData,

            });

            const data = await response.json();

            if (response.ok) {
                const options = {
                    id: authUser.id,
                    username: data.username,
                    bioDesc: data.bio,
                    imageUrl: data.url,
                }

                const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/user-update`, options)
                if (result.data.data.success) {
                    toast.success("Güncellendi!")
                    const user = result.data.data.result
                    dispatch(setUser({
                        id: user._id.toString(),
                        email: user.email,
                        username: user.username,
                        imageUrl: user.imageUrl,
                        bioDesc: user.bioDesc,
                        userStatus: user.userStatus,
                    }))
                    router.push("/sohbet")
                } else {
                    toast.error("Bir Hata Oluştu!")
                }

            } else {
                setRouterMessage(`Error: ${data.error}`);
            }
        } catch (error: any) {
            setRouterMessage(`Error: ${error.message}`);
        }


    };


    return (
        <div className="w-full h-full lg:border-x-2 chat-line">

            <div className="w-full h-full px-4 py-8">
                <div className="w-full h-[80px]"></div>
                <div className="w-full  h-[590px] flex flex-col items-center justify-center overflow-hidden">
                    <form onSubmit={handleSubmit} className="flex flex-row w-1/2 h-full">
                        <div className="flex flex-col items-center justify-start w-1/3">
                            <div className='flex items-center justify-center my-2 relative'>
                                <div className='w-[180px] h-[180px] rounded-full bg-slate-300 relative overflow-hidden border-2 chat-profile-img-border'>
                                    <Image src={preview || `https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png`} className='w-[180px] h-[180px] object-cover' width={1000} height={1000} alt="Profil Resmi" />
                                </div>
                                <label role="button" className='text-lightGray' htmlFor="edit">
                                    <div className='profile-edit hover:hover-profile-edit transition-all flex items-center justify-center  w-10 h-10 rounded-full absolute bottom-0 right-0 overflow-hidden cursor-pointer'>
                                        <LuPencil size={20} />

                                    </div>
                                </label>
                                <input type="file" onChange={imageFunc} className="cursor-pointer hidden" id="edit" />

                            </div>
                        </div>
                        <div className="my-6 w-2/3">
                            <div className="flex flex-col my-2">
                                <label htmlFor="username" className='text-main'>Kullanıcı Adınız:</label>
                                <input className={`${existError == null && message == null ? "border border-gray-500" : `${existError != true ? "border border-red-500" : "border border-green-500"} `} w-full outline-none py-2 px-4 rounded-md`}
                                    onChange={existUsername}
                                    value={inputValue}
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Kullanıcı Adınız"
                                    required
                                />

                                {
                                    existError == false ? (
                                        <>
                                            <div className="text-xs text-red-500 my-1 mx-2">{message}</div>
                                            <div className='flex flex-row items-center justify-start gap-2 my-1 mx-2'>
                                                <div className='text-main text-sm'>Öneriler: </div>
                                                {suggestions?.map((item, i) => (
                                                    <div key={i} className="text-xs text-lightOrange my-1 cursor-pointer" onClick={() => { setInputValue(item.username); setExistError(true); setMessage(true); setUsername(item.username); }}>
                                                        {item.username}
                                                    </div>
                                                ))}
                                            </div>

                                        </>
                                    ) : (
                                        <div className="text-xs text-green-500 my-1 mx-2">{message}</div>
                                    )
                                }



                            </div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="bio" className='text-main'>Biyografiniz:</label>
                                <input className={`border border-gray-500 w-full outline-none py-2 px-4 rounded-md`}
                                    type="text"
                                    id="bio"
                                    name="bio"
                                    placeholder='Biyografiniz'
                                    onChange={bioDescFunc}
                                    value={inputValueBio}
                                    required />
                            </div>
                            <div className="w-full flex justify-center my-8">
                                <button type="submit" className="opacity-100 cursor-pointer hover:bg-orange-700 select-none lg:w-1/3 w-8/12 py-2 px-8 bg-darkOrange text-xl text-white rounded-md  transition-all border ">Kaydet</button>
                            </div>
                        </div>


                    </form>


                </div>
            </div>
        </div>
    )
}

export default Profil