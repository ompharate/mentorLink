"use client";
import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
} from "@livekit/components-react";
import "@livekit/components-styles";

interface VideoCallProps {
  roomName: string;
  userName: string;
}

const VideoCall = ({ roomName, userName }: VideoCallProps) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, userName }),
      });
      const data = await response.json();
      setToken(data.token);
    };
    getToken();
  }, [roomName, userName]);
 
  if (!token) return <div>Loading...</div>;
  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default VideoCall;
