"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSocket } from "@/app/context/SocketContext";
import { fetchChat } from "@/lib/api";

const Chat = ({ userId }: { userId: string }) => {
  const socket = useSocket();
  const [messages, setMessages] = React.useState<
    {
      userId: string;
      message: string;
      name: string;
      image: string;
      senderId?: string;
    }[]
  >([]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "message",
        ({ userId: senderId, message, name, image }: any) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { userId: senderId, message, name, image },
          ]);
        }
      );

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const fetchUserChat = async () => {
    const chat = await fetchChat(userId);
    console.log(chat);
    setMessages(chat);
  };

  useEffect(() => {
    fetchUserChat();
  }, []);

  return (
    <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
      {messages.map(
        (
          { userId: senderId, message, name, image, senderId: senderIdM },
          index
        ) => (
          <ChatMessage
            key={index}
            isMine={senderId === userId || senderIdM === userId}
            avatar={image}
            name={name}
            message={message}
          />
        )
      )}
    </div>
  );
};

function ChatMessage({
  avatar,
  name,
  message,
  isMine,
}: {
  avatar: string;
  name: string;
  message: string;
  isMine: boolean;
}) {
  console.log("isMine", isMine);
  return (
    <div
      className={`flex items-start space-x-3 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
     
      {!isMine && (
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`p-3 rounded-lg shadow max-w-xs text-sm ${
          isMine ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
        }`}
      >
        <p className="font-semibold text-gray-700">{name}</p>
        <p className="text-gray-800">{message}</p>
      </div>
      
      {isMine && (
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default Chat;
