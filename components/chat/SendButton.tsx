"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "flowbite-react";
import { useSocket } from "@/app/context/SocketContext";

const SendButton = ({
  userId,
  partnerId,
}: {
  userId: string;
  partnerId: string;
}) => {
  const [message, setMessage] = useState<string | null>();

  const socket = useSocket();

  const onClick = () => {
    socket?.emit("message", {
      userId,
      partnerId,
      message,
    });

    // return () => {
    //   setMessage(null);
    //   socket?.disconnect();
    // };
  };

  return (
    <div className="flex items-center space-x-2 absolute bottom-5 w-[50%]">
      <Input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
      />
      <Button onClick={onClick}>Send</Button>
    </div>
  );
};

export default SendButton;
