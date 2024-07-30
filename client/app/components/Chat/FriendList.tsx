"use client"
import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import FriendItem from './FriendItem';
import axios from 'axios';
import { useAppSelector } from '@/app/redux/hooks';
import { useSelector } from 'react-redux';

type User = {
    id: number;
    username: string;
    imageUrl: string;
    bioDesc: string;
};


const FriendList = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    const stateUser = useAppSelector((state) => state.user.user)
    console.log(stateUser)

    const testList = [
        {
            username: "atahanhalici",

        }
    ]

    const userListFunc = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-user-list`)
        
            return res.data.data.user

        } catch (error) {
            console.error('Error fetching user list:', error);
            return [];
        }
    }

    useEffect(() => {
        const fetchUserList = async () => {
            const data = await userListFunc();
            setUserList(data);
        };

        fetchUserList();
    }, [])

    useEffect(() => {
        if(searchTerm != ""){
            const findList = userList.filter(user =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            const filteredList = findList.filter(user =>
                user.username.toLowerCase() !== stateUser?.username?.toLowerCase() 
            );
            setFilteredUsers(filteredList);
        }else{
            setFilteredUsers([]);
        }
        
    }, [searchTerm, userList, stateUser]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


 
  
    return (
        <div className='h-[610px] '>
            <div className='flex flex-col items-start justify-center mx-4 mb-4'>

                <div className='text-center text-3xl font-bold title-text tracking-wider mx-1 w-fit'>
                    ARKADAŞLAR
                </div>
                <hr className='border border-user-menu  w-4/6 ' />
            </div>
            <div className=' bg-transparent w-full flex items-center flex-row justify-center my-4 px-2 gap-2'>

                <div className='w-9/12'>
                    <input type="text" value={searchTerm} onChange={handleSearch} className='w-full rounded-md h-auto px-4 py-2 outline-none bg-input' placeholder='Kullanıcı Adı' />
                </div>
                <div className='w-3/12 bg-transparent flex items-center justify-center'>
                    <button type="submit" className="flex items-center justify-center px-2 py-1 gap-1 w-full bg-mediumBlue text-lightGray rounded-md cursor-pointer transition-all hover:bg-darkModeBlue">
                        <FaUserPlus className="text-lg" />
                        <div >Ekle</div>
                    </button>

                </div>
            </div>
            <div className='w-full h-[500px] bg-main flex items-center flex-col overflow-y-auto'>
                {
                    filteredUsers?.map((ct, i) => (
                        <FriendItem key={i} username={ct.username} imageUrl={ct.imageUrl} bioDesc={ct.bioDesc} onButtonClick={()=>{setSearchTerm(ct.username)}}/>
                    ))
                }


            </div>
        </div>
    )
}

export default FriendList