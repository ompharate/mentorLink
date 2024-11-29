"use client";

import Button from "@/components/button/Button";
import { MentorProfile } from "@/components/mentor/profile/mentor-profile";
import { UserProfile } from "@/components/mentor/profile/user-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const onLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <Button onClick={onLogout} text="Logout" variant="Red">
          <LogOut />
        </Button>
      </div>
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">My Profile</TabsTrigger>
          <TabsTrigger value="mentor">My Mentor Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserProfile />
        </TabsContent>
        <TabsContent value="mentor">
          <MentorProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
}
