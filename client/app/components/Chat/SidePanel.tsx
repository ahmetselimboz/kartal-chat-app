"use client"


import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import useWidth from '@/app/hooks/useWidth'
import { MdArrowBackIosNew } from 'react-icons/md'
import { sideMenuMarketFunc, sideMenuProfilFunc } from '@/app/redux/sideMenuSlice'
import Image from 'next/image'
import { FaPen } from 'react-icons/fa6'
import { LuPencil } from 'react-icons/lu'
import Button from '../Buttons/Button'
import { TfiBrushAlt } from 'react-icons/tfi'
import { FiUserMinus } from 'react-icons/fi'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { setUser } from '@/app/redux/userSlice'
import { chatUserFunc } from '@/app/redux/chatSlice'
import { Message } from './ChatSection'
import socket from "@/app/socket/socket"
import { IoCheckmarkSharp } from 'react-icons/io5'

interface Product {
    _id: string
    name: string
    imageUrl: string
    price: string
    categoryId: string
}

interface Category {
    _id: string
    name: string
}

interface GroupedProducts {
    category_name: string;
    products: Product[];
}

const SidePanel = () => {

    const [userList, setUserList] = useState("")
    const [deleteFriendState, setDeleteFriendState] = useState<any>()
    const [messageList, setMessageList] = useState<Message[]>([])
    const [messageIdsList, setMessageIdsList] = useState<string[]>([])
    const sideMenu = useAppSelector(state => state.sideMenu.sideMenu)
    const chatUser = useAppSelector(state => state.chat.chatUser)
    const authUser = useAppSelector(state => state.user.user)
    const { width, height } = useWidth() as any;
    const params = useParams<{ chatId: string }>()
    const chatId = params.chatId
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('q')

    const [productList, setProductList] = useState<GroupedProducts[]>([])
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [list, setList] = useState<GroupedProducts[]>([
        {
            category_name: "",
            products: [
                {
                    _id: "",
                    name: "",
                    imageUrl: "",
                    price: "",
                    categoryId: "",
                }
            ]
        }
    ])

    const [selectedList, setSelectedList] = useState<string[]>([])

    useEffect(()=>{
        const fetchCart = async ()=>{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-cart-list`, { id: authUser?.id })
   
            setSelectedList(res.data.data.cart.cart.map((item: { productId: {_id:any} }) => item.productId._id))
        }
        fetchCart()
    }, [])


    useEffect(() => {
        if (sideMenu && chatUser?.username) {
            const fetchFriendList = async () => {

                const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-friends`, { username: chatUser?.username })

                setUserList(res.data.data.list.length);
            };
            fetchFriendList();
        }

    }, [sideMenu, chatUser?.username])

    const deleteFriends = useCallback(() => {
        const newDeleteFriendState = {
            chatUser: chatUser?.id,
            authUser: authUser?.id,
            chatId
        };
        setDeleteFriendState(newDeleteFriendState);
        console.log(newDeleteFriendState);
        socket.emit("deleteFriend", newDeleteFriendState);
        socket.emit("sendNotification", { senderId: authUser?.id, receiverId: chatUser?.id, senderUsername: authUser?.username, slug: "remove-friendship" })
    }, [chatUser, authUser, chatId]);

    useEffect(() => {
        socket.emit("productList")
    }, [])

    useEffect(() => {


        const handleProduct = (product: GroupedProducts[]) => {

            setProductList(product)
            console.log("productList1: ", productList)
        }

        socket.on('getProductList', handleProduct)

        console.log("productList2: ", productList)
      
        return () => {
            socket.off('getProductList', handleProduct)
        }

    }, [setProductList])



    const deleteMessages = async () => {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/${chatId}`)
        if (res.data.data.success) {
            setMessageList(res.data.data.chat.messages)
        } else {
            toast.error("Mesajlar Silinemedi!")
        }
    }

    useEffect(() => {

        const ids = messageList.map(message => message._id);
        setMessageIdsList(ids);
    }, [messageList]);


    useEffect(() => {

        socket.emit("deleteMessages", { chatId, messageIds: messageIdsList });
        if (sideMenu.profil == true) {
            dispatch(sideMenuProfilFunc())
        }

    }, [chatId, messageIdsList]);


    const selectedItems = useCallback((id: string) => {
        setSelectedList(prevList => [...prevList, id]);
        socket.emit("addCart", {id:authUser?.id, productId:id})
    }, [authUser?.id]);


    const unSelectedItems = useCallback((id: string) => {
        setSelectedList(prevList => prevList.filter(item => item !== id));
        socket.emit("deleteCart", {id:authUser?.id, productId:id})
    }, []);


    if (productList.length == 0) {
        return <div></div>
    }

    if (width <= 1024) {
        return (
            <>
                <div className='relative z-40  h-full'>
                    <div className={`${sideMenu.profil ? "block" : "hidden"} w-full fixed h-full bg-main z-40`}>
                        <div onClick={() => { dispatch(sideMenuProfilFunc()) }} className='flex relative top-6 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400/20 transition-all'>
                            <MdArrowBackIosNew size={23} className='mr-[3px] absolute' />
                        </div>
                        <div className='w-full h-1/2  py-4'>
                            <div className='flex items-center justify-center my-2 relative'>
                                <div className='w-[140px] h-[140px] rounded-full bg-slate-300 relative overflow-hidden border-2 chat-profile-img-border'>
                                    <Image src={chatUser?.imageUrl || "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png"} className='' width={500} height={500} alt="Profil Resmi" />
                                </div>
                                {/* <div className='profile-edit hover:hover-profile-edit transition-all flex items-center justify-center  w-10 h-10 rounded-full absolute bottom-0 right-1/3 overflow-visible cursor-pointer'>
                                    <LuPencil size={20} className='text-lightGray' />
                                </div> */}
                            </div>
                            <div className='flex flex-col items-center justify-center my-2  relative'>
                                <div className='font-bold text-2xl text-main  my-2'>
                                    {chatUser?.username}
                                </div>
                                <div className=' text-sm text-center text-main w-10/12  my-1'>
                                    {chatUser?.bioDesc}
                                </div>
                            </div>
                            <div className='w-full h-full flex flex-row items-center justify-center gap-4'>

                                <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                    <div className='w-fit title-text tracking-wider'>
                                        Grup
                                        <hr className='border border-user-menu  w-full' />
                                    </div>
                                    <div className='text-3xl title-text my-2'>0</div>
                                </div>
                                <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                    <div className='w-fit title-text tracking-wider'>
                                        Arkadaş
                                        <hr className='border border-user-menu  w-full' />
                                    </div>
                                    <div className='text-3xl title-text my-2'>{userList}</div>
                                </div>
                                <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                    <div className='w-fit title-text tracking-wider'>
                                        Oda
                                        <hr className='border border-user-menu  w-full' />
                                    </div>
                                    <div className='text-3xl title-text my-2'>0</div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-1/2 flex flex-col items-center justify-center py-4'>

                            <div className='w-full flex flex-col items-center justify-end gap-1'>

                                <button onClick={() => { if (window.confirm("Tüm Mesajlar Silinecek Emin Misiniz?")) { deleteMessages() } }} className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-base text-white rounded-md  transition-all border flex items-center justify-center gap-4'><TfiBrushAlt size={28} /> Sohbeti Temizle</button>
                                <button className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-base text-white rounded-md  transition-all border flex items-center justify-center gap-4'><FiUserMinus size={28} />Arkadaşlıktan Çıkar</button>
                            </div>

                        </div>
                    </div>
                    <div className={`${sideMenu.market && search == "Market" ? "block" : "hidden"} w-full absolute h-full bg-main z-10`}>
                        <div onClick={() => { dispatch(sideMenuMarketFunc()); router.push(`/sohbet/${chatId}`) }} className='flex relative top-3 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400/20 transition-all'>
                            <MdArrowBackIosNew size={23} className='mr-[3px] absolute' />
                        </div>
                        <div className='flex flex-col items-start justify-center mx-4 my-4 w-fit'>

                            <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                                Market
                            </div>
                            <hr className='border border-user-menu  w-full' />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='relative z-40  h-[610px]'>
                <div className={`${sideMenu.profil ? "block" : "hidden"} w-full absolute h-full bg-main z-20 `}>
                    <div onClick={() => { dispatch(sideMenuProfilFunc()) }} className='flex relative top-3 left-2 items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-400/20 transition-all'>
                        <MdArrowBackIosNew size={23} className=' absolute' />
                    </div>
                    <div className='w-full h-1/2  py-4'>
                        <div className='flex items-center justify-center my-2 relative'>
                            <div className='w-[140px] h-[140px] rounded-full bg-slate-300 relative overflow-hidden border-2 chat-profile-img-border'>
                                <Image src={chatUser?.imageUrl || "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png"} className='' width={500} height={500} alt="Profil Resmi" />
                            </div>
                            {/* <div className='profile-edit hover:hover-profile-edit transition-all flex items-center justify-center  w-10 h-10 rounded-full absolute bottom-0 right-1/3 overflow-visible cursor-pointer'>
                                <LuPencil size={20} className='text-lightGray' />
                            </div> */}
                        </div>
                        <div className='flex flex-col items-center justify-center my-2  relative'>
                            <div className='font-bold text-2xl text-main  my-2'>
                                {chatUser?.username}
                            </div>
                            <div className=' text-sm text-center text-main w-10/12  my-1'>
                                {chatUser?.bioDesc}
                            </div>
                        </div>

                    </div>
                    <div className='w-full h-1/2 flex flex-col items-center justify-center py-4'>
                        <div className='w-full h-full flex flex-row items-center justify-center gap-4'>

                            <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                <div className='w-fit title-text tracking-wider'>
                                    Grup
                                    <hr className='border border-user-menu  w-full' />
                                </div>
                                <div className='text-3xl title-text my-2'>0</div>
                            </div>
                            <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                <div className='w-fit title-text tracking-wider'>
                                    Arkadaş
                                    <hr className='border border-user-menu  w-full' />
                                </div>
                                <div className='text-3xl title-text my-2'>{userList}</div>
                            </div>
                            <div className='w-fit h-full py-2 px-1 flex flex-col items-center'>
                                <div className='w-fit title-text tracking-wider'>
                                    Oda
                                    <hr className='border border-user-menu  w-full' />
                                </div>
                                <div className='text-3xl title-text my-2'>0</div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-center justify-end gap-1'>

                            <button onClick={() => { if (window.confirm("Tüm Mesajlar Silinecek Emin Misiniz?")) { deleteMessages() } }} className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-lg text-white rounded-md  transition-all border flex items-center justify-center gap-4'><TfiBrushAlt size={28} /> Sohbeti Temizle</button>
                            <button onClick={() => { if (window.confirm("Arkadaşlıktan Çıkarmak İstediğinize Emin Misiniz?")) { deleteFriends() } }} className='opacity-100 cursor-pointer hover:bg-red-700 select-none lg:w-10/12  w-8/12 min-h-[50px] py-2 px-8 bg-red-600 text-lg text-white rounded-md  transition-all border flex items-center justify-center gap-4'><FiUserMinus size={28} />Arkadaşlıktan Çıkar</button>
                        </div>

                    </div>
                </div>
                <div className='w-full absolute h-full overflow-hidden bg-main z-10'>
                    <div className='flex flex-col items-start justify-center mx-4 mb-2 w-fit'>

                        <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>

                            Market
                        </div>
                        <hr className='border border-user-menu  w-full' />
                    </div>
                    <div className='px-4 my-6 w-full h-full overflow-y-scroll overflow-x-clip relative scroll-container scrollbar-sm md:scrollbar-lg'>
                        <div className='w-full '>
                            <div className='w-fit  my-3'>
                                <div className='text-start text-xl font-light title-text  mx-1 w-fit'>
                                    {productList[1].category_name}

                                </div>

                                <hr className='border border-user-menu  w-full' />
                            </div>
                            <div className='w-full h-fit flex flex-wrap gap-3 justify-between '>
                                {
                                    productList[1].products.map((item, i) => (
                                        <div key={i} className='flex flex-col my-2 items-center w-[47%] h-fit'>
                                            <div className='bg-slate-500/20 relative flex items-center justify-center p-2 rounded-md mb-1 w-full h-[160px]'>
                                                <Image src={item.imageUrl} alt="" height={200} width={200} />
                                                <div className='absolute w-16 text-center rounded-full h-auto bottom-0 right-0 bg-lightOrange text-white'>{item.price} TL</div>
                                            </div>
                                            <div className='csm text-center my-2'>{item.name}</div>
                                            {
                                                selectedList.some(data => item._id === data) ? (
                                                    <div key={`select-${i}`} onClick={() => { unSelectedItems(item._id) }} className='w-5/6 h-[30px] rounded-full bg-darkGray transition-all border flex items-center justify-center text-lightGray cursor-pointer'>
                                                        Çıkar
                                                    </div>
                                                ) : (
                                                    <div key={`select-${i}`} onClick={() => { selectedItems(item._id) }} className='w-5/6 h-[30px] rounded-full bg-lightOrange hover:bg-orange-500 transition-all border flex items-center justify-center text-lightGray cursor-pointer'>
                                                        Ekle
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ))
                                }





                            </div>
                        </div>
                        <hr className='border border-user-menu  w-full my-8' />
                        <div className='w-full bg-main h-[30px]'></div>
                        <div className='w-full '>
                            <div className='w-fit  my-3'>
                                <div className='text-start text-xl font-light title-text  mx-1 w-fit'>
                                    {productList[0].category_name}

                                </div>

                                <hr className='border border-user-menu  w-full' />
                            </div>
                            <div className='w-full h-full flex flex-wrap gap-3 justify-between '>
                                {
                                    productList[0].products.map((item, i) => (
                                        <div key={i} className='flex flex-col my-2 items-center w-[47%] h-fit'>
                                            <div className='bg-slate-500/20 rounded-md mb-1 w-full h-5/6'>
                                                <Image src={item.imageUrl} alt="" height={200} width={200} />
                                            </div>
                                            <div className='csm my-1'>{item.name}</div>
                                            {
                                                selectedList.some(data => item._id === data) ? (
                                                    <div key={`select-${i}`} onClick={() => { unSelectedItems(item._id) }} className='w-5/6 h-[30px] rounded-full bg-darkGray transition-all border flex items-center justify-center text-lightGray cursor-pointer'>
                                                        Çıkar
                                                    </div>
                                                ) : (
                                                    <div key={`select-${i}`} onClick={() => { selectedItems(item._id) }} className='w-5/6 h-[30px] rounded-full bg-lightOrange hover:bg-orange-500 transition-all border flex items-center justify-center text-lightGray cursor-pointer'>
                                                        Ekle
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }



                            </div>

                        </div>
                        <hr className='border border-user-menu  w-full my-4' />
                        <div className='w-full bg-main h-[30px]'></div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default SidePanel