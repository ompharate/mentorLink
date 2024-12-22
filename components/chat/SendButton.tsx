"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button"; // Replaced with your existing button component
import { useSocket } from "@/app/context/SocketContext";

const SendButton = ({
  userId,
  partnerId,
  name,
  image,
}: {
  userId: string;
  partnerId: string;
  name: string;
  image: string;
}) => {
  const [message, setMessage] = useState<string>("");

  const socket = useSocket();

  const onSendMessage = () => {
    if (!message.trim()) return;

    socket?.emit("message", {
      userId,
      partnerId,
      message,
      name,
      image,
    });

    setMessage(""); 
  };

  return (
    <div className="w-full bg-gray-100 border-t p-4">
      <div className="flex items-center space-x-3 max-w-3xl mx-auto">
     
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
       
        <Button
          onClick={onSendMessage}
          disabled={!message.trim()} // Disable the button when the input is empty
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SendButton;
