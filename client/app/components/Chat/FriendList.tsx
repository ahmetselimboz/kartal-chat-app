"use client"
import React, { useEffect, useRef, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import FriendItem from './FriendItem';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useSelector } from 'react-redux';
import Modal from '../Modals/Modal';
import { toast } from 'react-toastify';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa6';
import { MdMeetingRoom } from 'react-icons/md';
import { chatUserFunc } from '@/app/redux/chatSlice';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Typing } from '@/app/redux/typingSlice';
import useNotifications from '@/app/socket/notificationEvent';


type User = {
    _id: number;
    username: string;
    imageUrl: string;
    bioDesc: string;
    friends: [{userId:"", chatId:"", _id:""}];
};

type Group = {
    id: string,
    group_name: string,
    group_desc: string,
    group_profile_img: string,
    members: Array<[]>,
}

type Chat = {
    _id: string;

};

interface SearchTermState {
    id: string,
    username: string
}


const FriendList = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [searchFriendList, setSearchFriendList] = useState<User[]>([]);
    const [groupList, setGroupList] = useState<Group[]>([]);
    const [searchTerm, setSearchTerm] = useState<SearchTermState>({id:"", username:""});
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    const [modalData, setModalData] = useState<SearchTermState>()
    const [closeModal, setCloseModal] = useState(false)
    const [selected, setSelected] = useState("")
    const [newChats, setNewChats] = useState<Chat | null>(null)

    const selectedMenu = useAppSelector(state => state.menu.activeMenu) as any
    const stateUser = useAppSelector((state) => state.user.user)
    const { sendNotification } = useNotifications(stateUser?.id);
    const dispatch = useAppDispatch()
    const router = useRouter()



    const params = useParams<{ chatId: string }>()
    const chatId = params.chatId

    const userListFunc = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-user-list`)

            return res.data.data.user

        } catch (error) {
            console.error('Error fetching user list:', error);
            return [];
        }
    }

    const groupListFunc = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/groups/all-groups`)

            return res.data.data.list

        } catch (error) {
            console.error('Error fetching user list:', error);
            return [];
        }
    }



    useEffect(() => {
        if (selectedMenu.menuTitle == "Arkadaşlar") {
            if (searchTerm?.username == "") {
                const fetchFriendList = async () => {

                    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-friends`, { username: stateUser?.username })

                    setUserList(res.data.data.list);
                };
                fetchFriendList();

                const fetchUserList = async () => {

                    const data = await userListFunc();
                 
                    setSearchFriendList(data);
                };

                fetchUserList();
            }



        } if (selectedMenu.menuTitle == "Gruplar") {

            const fetchGroupList = async () => {
                const data = await groupListFunc();

                setGroupList(data);
            };
            fetchGroupList();
        }
    }, [selectedMenu, searchTerm, stateUser])





    useEffect(() => {
        if (searchTerm?.username != "") {
          
            if (selectedMenu.menuTitle == "Arkadaşlar") {

                const findList = searchFriendList.filter( user  =>
                    user.username.toLowerCase().includes(searchTerm?.username.toLowerCase())
                );

                const filteredList = findList.filter(user =>
                    user.username.toLowerCase() !== stateUser?.username?.toLowerCase()
                );


                const ids = new Set(userList.map(item => item.username));

                // İkinci array'i filtrele ve ilk array'de olmayan öğeleri al
                const result = filteredList.filter(item => !ids.has(item.username));

                setFilteredUsers(result);
                setFilteredGroups([]);

            } if (selectedMenu.menuTitle == "Gruplar") {

                const findGroupList = groupList.filter(({ group }: any) =>
                    group.group_name.toLowerCase().includes(searchTerm?.username.toLowerCase())
                );

                setFilteredGroups(findGroupList);
                setFilteredUsers([]);
            }

        } else {
            setFilteredUsers([]);
            setFilteredGroups([]);
        }

    }, [selectedMenu, searchTerm, userList, searchFriendList, stateUser?.username, groupList]);



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm({ id: "", username: e.target.value });
    };

    const modalOpen = () => {

        if (searchTerm?.username === "") return toast.error(`Lütfen ${selectedMenu.placeholder} Giriniz!`)
        const userExist = searchFriendList.filter(user => user.username == searchTerm?.username).length

        if (userExist == 0) {
            return toast.error(`${selectedMenu.placeholder} Bulunamadı!`)
        }
        setModalData({ id: searchTerm?.id, username: searchTerm?.username })
        setCloseModal(true)
    }


    const modalSubmit = async () => {
        try {
            const options = {
                senderId: stateUser?.id,
                senderUsername: stateUser?.username,
                receiverId: modalData?.id,
                slug: "friendship-invitation"
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/invite-friend`, options)
            if (res?.data?.data.success) {
                toast.success(res?.data?.data.message)
                sendNotification(options?.receiverId, options?.slug, options?.senderUsername);
                setCloseModal(false)
            } else {
                toast.error(res?.data?.data.message)
                setCloseModal(false)
            }
       
        } catch (error) {

        }
    }

    const newChat = async (ct: User) => {
        setSelected(ct.username);
        let chtId = ""
        ct.friends.forEach((item:any)=>{
            if (item.userId == stateUser?.id) {
                chtId = item.chatId
            }
        })
        console.log( ct.friends)
       router.push(`/sohbet/${chtId}`)
    }


    const iconMap = {
        AiOutlineUsergroupAdd,
        FaUsers,
        MdMeetingRoom,
    }

    const IconComponent = iconMap[selectedMenu.iconName as keyof typeof iconMap];

    return (
        <>
            {
                closeModal ? (<Modal onSubmit={modalSubmit} invite_name={modalData?.username} title="Arkadaşlık Daveti" icon={IconComponent} onClose={() => { setCloseModal(false) }} />) : ""
            }

            <div className='h-[700px] '>
                <div className="h-[90px]"></div>
                <div className='flex flex-col items-start justify-center mx-4 mb-2 w-fit'>

                    <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                        {(selectedMenu?.menuTitle).toUpperCase()}
                    </div>
                    <hr className='border border-user-menu  w-full' />
                </div>
                <div className={`${searchTerm?.username != "" ? "user-menu-area" : ""} pb-4 pt-1 rounded-md h-fit`}>
                    <div className=' bg-transparent w-full flex items-center flex-row justify-center my-4 px-2 gap-2'>

                        <div className='w-9/12'>
                            <input type="text" value={searchTerm?.username} onChange={handleSearch} className='w-full rounded-md h-auto px-4 py-2 outline-none bg-input' placeholder={`${selectedMenu.placeholder}`} />
                        </div>
                        <div className='w-3/12 bg-transparent flex items-center justify-center'>
                            <button onClick={modalOpen} className="flex items-center justify-center px-2 py-1 gap-1 w-full bg-mediumBlue text-lightGray rounded-md cursor-pointer transition-all hover:bg-darkModeBlue">
                                <IconComponent className="text-lg" />
                                <div >{selectedMenu.btnTitle}</div>
                            </button>

                        </div>
                    </div>
                    <div className='w-full h-[fit] bg-transparent flex items-center flex-col overflow-y-auto'>

                        {
                            selectedMenu.menuTitle === "Arkadaşlar" ? (
                                searchTerm?.username === "" ? (
                                    userList.length === 0 ? (
                                        <div>Arkadaşınız Bulunamadı!</div>
                                    ) : (
                                        userList.map((ct, i) => (
                                            <FriendItem
                                                key={i}
                                                id={ct._id}
                                                username={ct.username}
                                                imageUrl={ct.imageUrl}
                                                bioDesc={ct.bioDesc}
                                                selected={selected}
                                                chatId={ct.friends.find((item:any) => item.userId == stateUser?.id)?.chatId}
                                                onButtonClick={() => { newChat(ct) }}
                                            />
                                        ))
                                    )
                                ) : (
                                    filteredUsers.length === 0 ? (
                                        <div>Kullanıcı Bulunamadı!</div>
                                    ) : (
                                        filteredUsers.map((ct, i) => (
                                            <FriendItem
                                                key={i}
                                                username={ct.username}
                                                imageUrl={ct.imageUrl}
                                                bioDesc={ct.bioDesc}
                                                onButtonClick={() => { setSearchTerm({ id: ct._id.toString(), username: ct.username }) }}
                                            />
                                            
                                        ))
                                     
                                    )
                                )
                            ) : selectedMenu.menuTitle === "Gruplar" ? (
                                searchTerm?.username !== "" && filteredGroups.length === 0 ? (
                                    <div>Grup Bulunamadı!</div>
                                ) : (
                                    filteredGroups.map((ct, i) => (
                                        <FriendItem
                                            key={i}
                                            username={ct.group_name}
                                            imageUrl={ct.group_profile_img}
                                            bioDesc={ct.group_desc}
                                            onButtonClick={() => { setSearchTerm({ id: ct.id.toString(), username: ct.group_name }) }}
                                        />
                                    ))
                                )
                            ) : null
                        }








                    </div>
                </div>

            </div>
        </>
    )
}

export default FriendList