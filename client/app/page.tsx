"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import Navbar from "./components/Navbar/Navbar"
import { signOut } from "next-auth/react";
import axios from "axios";

export default function Home() {

  // const serverURL = process.env.NEXT_PUBLIC_SERVER_URL as string
  // const socket = io(serverURL)

  const [isConnected, setIsConnected] = useState(false);


  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);

  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);

  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);


  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, [socket]);

  return (
    <div>

      <h1>Socket Status  {isConnected}</h1>
      <p>{isConnected ? "Bağlandı!" : "Bağlantı Yok!"}</p>
      <button onClick={() => signOut()}>Çıkış Yap</button>
      <br />
      <button onClick={async () => await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/send`, {
        email: "ahmetselimboz46@gmail.com",
        link: "www.ahmetselimboz.com.tr"
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })}> Mail</button>
    </div >
  );
}
