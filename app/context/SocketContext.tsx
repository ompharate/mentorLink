"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data } = useSession();

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      autoConnect: true,
    });

    newSocket.emit("register", {
      userId: data?.user.id,
      name: data?.user.name,
    });

   
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [data?.user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
