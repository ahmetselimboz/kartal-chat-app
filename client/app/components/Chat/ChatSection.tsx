"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import Image from "next/image";
import axios from "axios";
import io from 'socket.io-client';
import { isTypingFunc } from '@/app/redux/typingSlice';

interface Message {
    sender: string;
    receiver: string;
    message: string;
    timestamp: Date;
}

interface Typing {
    chatId: string,
    userId: string,
    isTyping: boolean,

}

const ChatSection = ({ chatIdd }: any) => {
    const [plus, setPlus] = useState(false);
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState<Typing>();
    const chatUser = useAppSelector((state) => state.chat.chatUser);
    const authUser = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const chatId = chatIdd
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const socket = useRef(io(process.env.NEXT_PUBLIC_SERVER_URL as string)).current;
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        const getChat = async () => {
            if (chatUser != null && chatId) {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/${chatId}`);
                setMessageList(res.data.data.chat.messages);
            }
        };
        getChat();

    }, [chatUser, chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (chatId) {

            socket.emit('joinRoom', chatId);

            const handleMessage = (newMessage: Message) => {
                setMessageList((prevState) => [
                    ...prevState,
                    newMessage,
                ]);

            };

            socket.on('message', handleMessage);

            socket.on('typing', (isTyping) => {
                setTypingUser(isTyping);
                dispatch(isTypingFunc({ userId: isTyping.userId, isTyping: isTyping.isTyping }))
            });
            // Cleanup to avoid duplicate listeners
            return () => {
                socket.off('message', handleMessage);
                socket.off('typing');
            };
        }
    }, [chatId, socket, typingUser, dispatch]);



    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                sender: authUser?.id,
                receiver: chatUser?.id,
                chatId: chatId,
                message,
                timestamp: new Date(),
            };

            socket.emit("chatMessage", newMessage);
            setMessage('');
        }


    };

    const onKeyFunc = (e: any) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const inputOnChange = (e: any) => {
        setMessage(e.target.value)
        if (!isTyping) {
            setIsTyping(true);
            socket.emit('typingUser', { chatId, userId: chatUser?.id, isTyping: true });

        }

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            socket.emit('typingUser', { chatId, userId: chatUser?.id, isTyping: false });

        }, 1000); // Adjust the debounce delay as needed
    }

    if (!chatUser) {
        return <div></div>;
    }

    return (
        <>
            <div className="fixed lg:relative lg:flex hidden z-30 w-full bg-main lg:px-4 px-2 pb-3  items-center justify-between lg:border-b-2  chat-line">
                <div className="flex flex-row items-center gap-5">
                    <div className="lg:w-[45px] lg:h-[45px] w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200 border-2 chat-profile-img-border">
                        <Image src={chatUser?.imageUrl as any} alt="" width={100} height={100} />
                    </div>
                    <div className="flex flex-col">
                        <div>{chatUser?.username}</div>
                        <div className="text-sm text-lightOrange">{typingUser?.isTyping && typingUser.userId == authUser?.id ? "Yazıyor..." : "Çevrimiçi"}</div>
                    </div>
                </div>
                <div>
                    <div className="bg-transparent  hover:bg-gray-400/20 p-2 rounded-full transition-all cursor-pointer">
                        <BsThreeDotsVertical size={20} />
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="w-full h-[70%] bg-main overflow-y-scroll overflow-x-clip relative scroll-container scrollbar-sm md:scrollbar-lg">
                {messageList.map((msg, i) => (
                    msg.sender === authUser?.id ? (
                        <div className="w-full flex justify-end mb-3" key={i}>
                            <div className="w-full lg:w-1/2 h-fit flex items-start justify-end mb-3 mr-4">
                                <div className="bg-darkGray rounded-tl-md rounded-br-md rounded-bl-md h-auto w-auto  min-w-[100px] lg:w-9/12 cursor-pointer px-2 py-2 mt-2">
                                    <div className="mb-2 md:csm text-xs text-lightGray">{msg.message}</div>
                                    <div className="flex items-center flex-row justify-between gap-1 mx-1">
                                        <div className="cxs text-lightGray">
                                            {(function () {
                                                const date = new Date(msg.timestamp);
                                                let hours = date.getHours();

                                                const minutes = date.getMinutes();

                                                // PM saatleri için 12 ekleyelim, 12'den büyükse zaten PM olur
                                                if (hours < 12 && date.getHours() >= 12) {
                                                    hours += 12;
                                                }
                                                const formattedHours = hours.toString().padStart(2, '0');
                                                const formattedMinutes = minutes.toString().padStart(2, '0');

                                                return (formattedHours + "." + formattedMinutes).toString();
                                            })()}
                                        </div>
                                        <div className="cxs text-lightGray">
                                            <IoCheckmarkDoneSharp className="csm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex justify-start mb-3 ml-4" key={i}>
                            <div className="w-full lg:w-1/2 h-fit flex items-start justify-start">
                                <div className="bg-darkOrange rounded-tr-md rounded-br-md rounded-bl-md h-auto min-w-[100px] lg:w-9/12 cursor-pointer px-2 py-2 mt-2">
                                    <div className="mb-2 md:csm text-xs text-lightGray">{msg.message}</div>
                                    <div className="flex items-center flex-row justify-end gap-1 mx-1">
                                        {(function () {
                                            const date = new Date(msg.timestamp);
                                            let hours = date.getHours();

                                            const minutes = date.getMinutes();

                                            // PM saatleri için 12 ekleyelim, 12'den büyükse zaten PM olur
                                            if (hours < 12 && date.getHours() >= 12) {
                                                hours += 12;
                                            }
                                            const formattedHours = hours.toString().padStart(2, '0');
                                            const formattedMinutes = minutes.toString().padStart(2, '0');

                                            return (formattedHours + "." + formattedMinutes).toString();
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <div className='w-full h-[48px] bg-transparent'></div>
            <div className="bg-main w-full flex items-center lg:absolute fixed bottom-0 py-1">
                <div className="md:w-1/12 w-1/12 h-full bg-darkgray flex items-center justify-center relative">
                    <div className={`${plus ? "block" : "hidden"} lg:w-[200px] w-[200px] h-[100px] profile-card absolute left-2 bottom-9 rounded-md`}></div>
                    <FaPlus onClick={() => setPlus(!plus)} className="w-[25px] h-[25px] rounded-full text-lightGray bg-mediumBlue text-2xl p-1 transition-all cursor-pointer hover:bg-darkModeBlue" />
                </div>
                <div className="md:w-9/12 w-8/12">
                    <input type="text" onKeyDown={onKeyFunc} value={message} onChange={inputOnChange} className="w-full rounded-md h-auto px-4 py-2 outline-none bg-input" placeholder="Mesaj" />
                </div>
                <div className="md:w-2/12 w-3/12 bg-transparent px-1 flex items-center justify-center">
                    <button onClick={sendMessage} type="submit" className="flex items-center px-2 py-1 gap-2 bg-mediumBlue text-lightGray rounded-md w-fit cursor-pointer transition-all hover:bg-darkModeBlue">
                        <IoIosSend className="text-lg" />
                        <div>Send</div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatSection;
