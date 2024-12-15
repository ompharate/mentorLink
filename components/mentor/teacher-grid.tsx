import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "../button/Button";
import { ChevronRight } from "lucide-react";
import { fetchMentors } from "@/lib/api";
interface TeacherCardProps {
  name: string;
  id: string;
  title: string;
  expertise: string;
  rating: number;
  hourlyRate: number;
  avatarUrl: string;
  image: string;
}

export async function TeacherGrid({
  query,
}: {
  query: {
    maxrate?: string;
    category?: string;
    search?: string;
  };
}) {
  const mentors: TeacherCardProps[] = await fetchMentors(query);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentors.map((mentor: TeacherCardProps) => {
        return (
          <Card className="w-full" key={mentor.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.image} alt={mentor.title} />
                  <AvatarFallback>{mentor.name}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{mentor?.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold mt-1">
                  ₹{mentor.hourlyRate}/hour
                </p>
              </div>
            </CardContent>
            <CardFooter className="w-full flex justify-center">
              <Button text="Book a Session" variant="Blue">
                <ChevronRight />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
