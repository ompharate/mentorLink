import { CustomSession, options } from "@/app/api/auth/[...nextauth]/options";
import LogoutBtn from "@/components/mentor/profile/Logout";
import { MentorProfile } from "@/components/mentor/profile/mentor-profile";
import UserProfile from "@/components/mentor/profile/user-profile";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session: CustomSession | null = await getServerSession(options);

  const user = session?.user
    ? {
        id: session?.user.id!,
        name: session?.user.name!,
        email: session?.user.email!,
        image: session?.user.image!,
      }
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <LogoutBtn />
      </div>
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">My Profile</TabsTrigger>
          <TabsTrigger value="mentor">My Mentor Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <UserProfile user={user!} />
        </TabsContent>
        <TabsContent value="mentor">
          <MentorProfile userId={session?.user?.id!} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
