"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PastMeetingsList } from "./past-meetings-list";

import { useSession } from "next-auth/react";

export function UserProfile() {
  const { data } = useSession();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={data?.user?.image?.toString()}
                alt={data?.user?.name?.toString()}
              />
              <AvatarFallback>
                {data?.user?.name?.toString().charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center sm:mt-0 sm:ml-6 sm:text-left">
              <h2 className="text-2xl font-bold">{data?.user?.name}</h2>
              <p className="text-muted-foreground">{data?.user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Past Meetings</h3>
        <PastMeetingsList />
      </div>
    </div>
  );
}