"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/button/Button";
import {  MessagesSquare, RadioTower } from "lucide-react";
const teachers = [
  {
    id: 1,
    name: "John Doe",
    expertise: "JavaScript",
    rating: 4.8,
    hourlyRate: 50,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "UX Design",
    rating: 4.9,
    hourlyRate: 60,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Bob Johnson",
    expertise: "Python",
    rating: 4.7,
    hourlyRate: 45,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Alice Brown",
    expertise: "Digital Marketing",
    rating: 4.6,
    hourlyRate: 55,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
];

export default function MyMentors() {
  return (
    <div className="max-w-7xl mx-auto my-5">
      <h1 className="text-2xl font-bold mb-6">My Mentors</h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 100,
        }}
        transition={{
          duration: 1,
        }}
      >
        {teachers.map(({ avatarUrl, name, expertise, hourlyRate, rating }) => (
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">{expertise}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm">Rating: {rating}/5</p>
                <p className="text-sm font-semibold mt-1">${hourlyRate}/hour</p>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-center gap-5">
              <Button  text="Join Meeting" variant="Red">
                <RadioTower size={20}/>
              </Button>
              <Button  text="Chat" variant="Red">
                <MessagesSquare size={20}/>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
