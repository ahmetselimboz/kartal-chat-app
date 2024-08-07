"use client"

import Button from "@/app/components/Buttons/Button"
import { useAppSelector } from "@/app/redux/hooks"
import axios from "axios"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { GoTrash } from "react-icons/go"
import socket from "@/app/socket/socket"

interface Product {
    _id: string
    name: string
    imageUrl: string
    price: string
    categoryId: string
}

const Sepet = () => {

    const [selectedList, setSelectedList] = useState<Product[]>([])
    const [sum,setSum] = useState<String>("")
    const authUser = useAppSelector(state => state.user.user)

    useEffect(() => {
        const fetchCart = async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-cart-list`, { id: authUser?.id })

            setSelectedList(res.data.data.cart.cart.map((item: { productId: any }) => item.productId))

        }
        fetchCart()
    }, [authUser?.id])

    const deleteProduct = useCallback((id: string) => {
        setSelectedList(prevList => prevList.filter(item => item._id !== id));
        socket.emit("deleteCart", { id: authUser?.id, productId: id })
    }, []);

    const onSubmit = () => {

    }

    useEffect(()=>{
        console.log(selectedList)

        const totalPrice = selectedList.reduce((sum, item) => {
            const price = parseFloat(item.price);
            return sum + price;
        }, 0);
      
        setSum(totalPrice.toFixed(2))
    },[selectedList])


    return (
        <div className="w-full h-full lg:border-x-2 chat-line">

            <div className="w-full h-full p-4 ">
                <div className="w-full h-[80px]"></div>
                <div className="w-full  h-[590px] flex flex-row items-center overflow-hidden">
                    <div className="w-5/6 h-full mr-4 pr-4 overflow-y-scroll overflow-x-clip relative scroll-container scrollbar-sm md:scrollbar-md">
                        {
                            selectedList.map((item, i) => (
                                <div key={i} className="w-full h-[250px] rounded-sm bg-slate-500/20 flex flex-row items-center justify-around  mb-4 px-6 py-4">
                                    <div className="w-2/6 h-full flex items-center justify-start">
                                        <div className="bg-slate-500 rounded-md w-[250px] h-full flex items-center justify-center">
                                            <Image src={item.imageUrl} alt="" height={200} width={200} />
                                        </div>
                                    </div>
                                    <div className="w-3/6 h-full flex items-center justify-start">
                                        <div className="font-normal text-xl ">{item.name}
                                        </div>
                                    </div>
                                    <div className="w-1/6 h-full flex items-center justify-center ">
                                        <div onClick={() => { deleteProduct(item._id) }} className="w-fit px-5 h-14 rounded-full hover:bg-gray-400/20 transition-all cursor-pointer flex items-center justify-center">
                                            <GoTrash className=" text-3xl text-red-500" />
                                            <div className="w-fit text-2xl mx-2 text-red-500">Sil</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }



                    </div>
                    <hr className="h-4/5  border chat-line" />
                    <div className="w-1/4 h-full  px-4">
                        <div className="flex flex-col h-3/4 py-2">
                            <div className='flex flex-col items-start justify-center mx-4 mb-2 w-fit'>

                                <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                                    Sepet
                                </div>
                                <hr className='border border-user-menu  w-full' />
                            </div>
                            <div className="w-full h-full pr-2 overflow-y-scroll overflow-x-clip relative scroll-container scrollbar-sm lg:scrollbar-sm">
                                {
                                    selectedList.map((item, i) => (

                                        <div key={i} className="w-full px-3 py-4 mb-2 flex flex-row items-center bg-slate-500/20 rounded-sm">
                                            <div className="w-4/5 h-full ">
                                                <div className="font-normal text-base ">{item.name}</div>
                                            </div>
                                            <div className="w-1/5 h-full  text-center">
                                                <div className="font-normal text-base ">{item.price} TL</div>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>

                        </div>
                        <hr className='border border-user-menu  w-full' />
                        <div className="w-full h-1/4 flex flex-col items-center justify-center">
                            <div className="w-full px-3 py-4 mb-2 flex flex-row items-center bg-slate-500/20 rounded-sm">
                                <div className="w-3/4 h-full ">
                                    <div className="font-normal text-base ">Toplam:</div>
                                </div>
                                <div className="w-1/4 h-full text-center">
                                    <div className="font-normal text-base ">{sum} TL</div>
                                </div>
                            </div>
                            <div className="w-full">
                                <button className="opacity-100 cursor-pointer hover:bg-orange-700 select-none lg:w-full w-8/12 py-2 px-8 bg-darkOrange text-2xl text-white rounded-md  transition-all border ">Satın Al</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sepet