"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchMentorId } from "@/lib/api";
import { Camera, Video } from "lucide-react";
import { useSocket } from "@/app/context/SocketContext";
import { useRouter } from "next/navigation";

const MeetingCard = ({
  partnerId,
  name,
  image,
  userId,
}: {
  partnerId: string;
  name: string;
  image: string;
  userId: string;
}) => {
  const socket = useSocket();
  const router = useRouter();
  useEffect(() => {
    if (socket) {
      socket.on("video", ({ id }) => {
        router.push(`/mentors/video?name=${name}&roomName=${id}`);
      });
      return () => {
        socket.off("video");
      };
    }
  }, [socket]);

  return (
    <div className="w-full p-4 md:p-6">
      <Card className="shadow-lg rounded-xl border border-gray-200">
        <CardHeader className="text-center bg-blue-50 rounded-t-xl p-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Schedule your meeting
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="text-lg font-bold">AI</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h3 className="text-base font-medium text-gray-800 mb-2">
                Rules:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Do not share private details</li>
                <li>This meeting is only for skill sharing</li>
                <li>provided by mentorlink</li>
                <li>Personalized Assistance</li>
              </ul>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4">
          <Button
            onClick={() => {
              socket?.emit("registerVideo", {
                partnerId,
                name,
                userId,
              });
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
          >
            Join Meeting <Video />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MeetingCard;
