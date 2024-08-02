"use client"

import { useEffect, useState } from 'react';
import socket from "@/app/socket/socket"

interface Typing {
  chatId: string;
  userId: string;
  senderId: string;
  isTyping: boolean;
}

interface InChat {
  chatId: string;
  userId: string;
  senderId: string;
  inChat: boolean;
}

interface TypingIndicatorProps {
  chatId: string | undefined;
  authUser: any;
  chatUser:any
}

const TypingIndicator = ({ chatId, authUser, chatUser }: TypingIndicatorProps) => {
  const [typingUser, setTypingUser] = useState<Typing | null>(null);
  const [inChatUser, setInChatUser] = useState<InChat | null>(null);

  useEffect(()=>{
    
  })

  useEffect(() => {
    
    socket.emit('joinRoom', chatId);


    const handleTyping = (inChatUser: InChat) => {
      console.log('Typing event:', inChatUser);
      setInChatUser(inChatUser);
    };
    socket.on('inChatUser', handleTyping);

  
    return () => {
      socket.off('inChatUser', handleTyping);
    };
  }, [chatId]);




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



  const renderText = () => {
    if (typingUser?.isTyping && typingUser?.userId == authUser.id && typingUser.senderId == chatUser) {
      return <div className="typing-text-2 text-xs">Yazıyor...</div>;
    } else {
      return <div className="typing-text text-xs">Son Görülme: Bugün 14.30</div>;
    }
  };

  return <div className="font-normal text-sm">{renderText()}</div>;
};

export default TypingIndicator;
