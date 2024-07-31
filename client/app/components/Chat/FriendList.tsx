"use client"
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/navigation';

type User = {
    id: number;
    username: string;
    imageUrl: string;
    bioDesc: string;
    friends: any;
};

type Group = {
    group_name: string,
    group_desc: string,
    group_profile_img: string,
    members: Array<[]>,
}

type Chat = {
    _id: string;
   
  };


const FriendList = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [searchFriendList, setSearchFriendList] = useState<User[]>([]);
    const [groupList, setGroupList] = useState<Group[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    const [modalUsername, setModalUsername] = useState<string>("")
    const [closeModal, setCloseModal] = useState(false)
    const [selected, setSelected] = useState("")
    const [newChats, setNewChats] = useState<Chat|null>(null)

    const selectedMenu = useAppSelector(state => state.menu.activeMenu) as any
    const stateUser = useAppSelector((state) => state.user.user)

    const dispatch = useAppDispatch()
    const router = useRouter()

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
            if (searchTerm == "") {
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
        if (searchTerm != "") {

            if (selectedMenu.menuTitle == "Arkadaşlar") {

                const findList = searchFriendList.filter(user =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
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

                const findGroupList = groupList.filter(group =>
                    group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        setSearchTerm(e.target.value);
    };

    const modalOpen = () => {

        if (searchTerm === "") return toast.error(`Lütfen ${selectedMenu.placeholder} Giriniz!`)
        const userExist = searchFriendList.filter(user => user.username == searchTerm).length

        if (userExist == 0) {
            return toast.error(`${selectedMenu.placeholder} Bulunamadı!`)
        }
        setModalUsername(searchTerm)
        setCloseModal(true)
    }


    const modalSubmit = async () => {
        try {
            const options = {
                fromId: stateUser?.id,
                fromName: stateUser?.username,
                to: modalUsername,
                slug: "friendship-invitation"
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/invite-friend`, options)
            if (res?.data?.data.success) {
                toast.success(res?.data?.data.message)
                setCloseModal(false)
            } else {
                toast.error(res?.data?.data.message)
                setCloseModal(false)
            }
        } catch (error) {

        }
    }

    const newChat = async (ct: any) => {
        setSelected(ct.username);
        const chatUser = { id: ct._id, username: ct.username, imageUrl: ct.imageUrl, bioDesc: ct.bioDesc };
        dispatch(chatUserFunc(chatUser));
        router.push(`/sohbet?chatId=${ct.friends[0].chatId}`) 
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
                closeModal ? (<Modal onSubmit={modalSubmit} invite_name={modalUsername} title="Arkadaşlık Daveti" icon={selectedMenu.iconName} onClose={() => { setCloseModal(false) }} />) : ""
            }

            <div className='h-[700px] '>
                <div className="h-[90px]"></div>
                <div className='flex flex-col items-start justify-center mx-4 mb-2 w-fit'>

                    <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                        {(selectedMenu?.menuTitle).toUpperCase()}
                    </div>
                    <hr className='border border-user-menu  w-full' />
                </div>
                <div className={`${searchTerm != "" ? "user-menu-area" : ""} pb-4 pt-1 rounded-md h-fit`}>
                    <div className=' bg-transparent w-full flex items-center flex-row justify-center my-4 px-2 gap-2'>

                        <div className='w-9/12'>
                            <input type="text" value={searchTerm} onChange={handleSearch} className='w-full rounded-md h-auto px-4 py-2 outline-none bg-input' placeholder={`${selectedMenu.placeholder}`} />
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
                                searchTerm === "" ? (
                                    userList.length === 0 ? (
                                        <div>Arkadaşınız Bulunamadı!</div>
                                    ) : (
                                        userList.map((ct, i) => (
                                            <FriendItem
                                                key={i}
                                                username={ct.username}
                                                imageUrl={ct.imageUrl}
                                                bioDesc={ct.bioDesc}
                                                selected={selected}
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
                                                onButtonClick={() => { setSearchTerm(ct.username) }}
                                            />
                                        ))
                                    )
                                )
                            ) : selectedMenu.menuTitle === "Gruplar" ? (
                                searchTerm !== "" && filteredGroups.length === 0 ? (
                                    <div>Grup Bulunamadı!</div>
                                ) : (
                                    filteredGroups.map((ct, i) => (
                                        <FriendItem
                                            key={i}
                                            username={ct.group_name}
                                            imageUrl={ct.group_profile_img}
                                            bioDesc={ct.group_desc}
                                            onButtonClick={() => { setSearchTerm(ct.group_name) }}
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