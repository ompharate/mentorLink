import type { Metadata } from "next";
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
import { SocketProvider } from "@/app/context/SocketContext";

export const metadata: Metadata = {
  title: "mentorLink - share skill",
  description: "skillsharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <SocketProvider>{children}</SocketProvider>
      <div className="w-full md:w-1/3 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Your personal AI helper</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src="/avatars/ai-assistant-large.png"
                  alt="AI Assistant"
                />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Features:</h3>
                <ul className="list-disc list-inside text-sm">
                  <li>24/7 Availability</li>
                  <li>Instant Responses</li>
                  <li>Wide Knowledge Base</li>
                  <li>Personalized Assistance</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Schedule a meeting</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
