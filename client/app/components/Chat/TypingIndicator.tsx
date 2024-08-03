"use client"

import { useCallback, useEffect, useState } from 'react';
import socket from "@/app/socket/socket"
import axios from 'axios';

interface Typing {
  chatId: string;
  userId: string;
  senderId: string;
  isTyping: boolean;
}

interface InChat {
  status: boolean;
  userId: string;

}

interface TypingIndicatorProps {
  chatId: string | undefined;
  authUser: any;
  chatUser: any
}

const TypingIndicator = ({ chatId, authUser, chatUser }: TypingIndicatorProps) => {
  const [typingUser, setTypingUser] = useState<Typing | null>(null);
  const [users, setUsers] = useState<InChat[]>([]);

  const fetchFriendsStatus = useCallback(async (userId: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get-friends`, { id: userId });
      const friends = response.data.data.list;

      setUsers(friends.map((friend: any) => ({
        userId: friend._id,
        status: friend.userStatus,
      })));
    } catch (error) {
      console.error('Arkadaş durumu çekilemedi:', error);
    }
  }, []);

  useEffect(() => {

    socket.emit('joinRoom', chatId);

    fetchFriendsStatus(authUser.id);
    const handleStatus = ({ userId, status }: any) => {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        const userIndex = updatedUsers.findIndex((user) => user.userId === userId);

        if (userIndex !== -1) {
          updatedUsers[userIndex].status = status;
        } else {
          updatedUsers.push({ userId, status });
        }

        return updatedUsers;
      });
    };

    socket.on('user-status', handleStatus);

    console.log(`users: `, users);
    return () => {
      socket.off('user-status', handleStatus);
    };
  }, [fetchFriendsStatus, authUser.id]);

  // const updateStatus = (status: boolean) => {
  //   socket.emit('update-status', { userId: authUser.id, status });
  // };


  useEffect(() => {

    socket.emit('joinRoom', chatId);


    const handleTyping = (isTyping: Typing) => {
      console.log('Typing event:', isTyping);
      setTypingUser(isTyping);
    };
    socket.on('typing', handleTyping);


    return () => {
      socket.off('typing', handleTyping);
    };
  }, [chatId]);


  //&& users?.userId != authUser.id 
  const renderText = () => {
    if (typingUser?.isTyping && typingUser?.userId == authUser.id && typingUser.senderId == chatUser) {
      return <div className="typing-text-2 text-xs">Yazıyor...</div>;
    }
    if (users?.find((item) => item.userId === chatUser)?.status === true) {
      return <div className="typing-text-2 text-xs">Çevrimiçi</div>;
    }

    return <div className="typing-text text-xs">Son Görülme: Bugün 14.30</div>;

  };

  return <div className="font-normal text-sm">{renderText()}</div>;
};

export default TypingIndicator;
