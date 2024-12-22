"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/app/context/SocketContext";

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = React.useState<string[]>([]); // Updated to an array of strings

  useEffect(() => {
    if (socket) {
      socket.on("message", ({userId,message}: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log(message); // You can log data for debugging purposes
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  return (
    <div>
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            avatar={
              index % 2 === 0
                ? "/avatars/user-1.png"
                : "/avatars/ai-assistant.png"
            } // Toggle avatars for demo
            name={index % 2 === 0 ? "You" : "AI Assistant"}
            message={message}
          />
        ))}
      </div>
    </div>
  );
};

function ChatMessage({
  avatar,
  name,
  message,
}: {
  avatar: string;
  name: string;
  message: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <Avatar>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="bg-white p-3 rounded-lg shadow">
        <p className="font-semibold mb-1">{name}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Chat;
