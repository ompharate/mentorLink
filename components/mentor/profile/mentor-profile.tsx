import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMentor } from "@/lib/api";

export async function MentorProfile({ userId }: { userId: String }) {
  const mentor = await fetchMentor(userId);
  if (mentor.message) {
    return (
      <h2 className="font-semibold text-center py-5">Please register first.</h2>
    );
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Mentor Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage src={mentor.avatarUrl} alt={mentor.name} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
              <h2 className="text-2xl font-bold">{mentor.name}</h2>
              <p className="text-muted-foreground">{mentor.expertise}</p>
              <p className="mt-2">{mentor.bio}</p>
              <p className="mt-2 font-semibold">${mentor.hourlyRate}/hour</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
