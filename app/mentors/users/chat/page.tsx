import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/button/Button";
import { MessagesSquare, RadioTower } from "lucide-react";
import { fetchMyMentors, fetchMyUsers } from "@/lib/api";
import { CustomSession, options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
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

export default async function MyMentors() {
  const session: CustomSession | null = await getServerSession(options);
  const { userLinks } = await fetchMyUsers(session?.user!.id!);
  console.log(userLinks);
  return (
    <div className="max-w-7xl mx-auto my-5">
      <h1 className="text-2xl font-bold mb-6">My Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userLinks.map(({ user }: any) => (
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={""} alt={user.name} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm">Rating: 6/5</p>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-center gap-5">
              <Button text="Join Meeting" variant="Red">
                <RadioTower size={20} />
              </Button>
              <Link href={`/mentors/chat/${user.id}`}>
                <MessagesSquare size={20} />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}