import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "../button/Button";
import { ChevronRight } from "lucide-react";

interface TeacherCardProps {
  name: string;
  expertise: string;
  rating: number;
  hourlyRate: number;
  avatarUrl: string;
}

export function TeacherCard({
  name,
  expertise,
  rating,
  hourlyRate,
  avatarUrl,
}: TeacherCardProps) {
  return (
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
      <CardFooter className="w-full flex justify-center">
        <Button text="Book a Session" variant="Blue" >
          <ChevronRight/>
        </Button>
      </CardFooter>
    </Card>
  );
}
