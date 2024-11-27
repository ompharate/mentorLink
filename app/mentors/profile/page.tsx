'use client'

import { MentorProfile } from "@/components/mentor/profile/mentor-profile"
import { UserProfile } from "@/components/mentor/profile/user-profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
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
  )
}

