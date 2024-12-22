import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface props {
  user: {
    name: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
  };
}

const UserProfile: React.FC<props> = ({ user }) => {
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
                src={user?.image?.toString()}
                alt={user?.name?.toString()}
              />
              <AvatarFallback>
                {user?.name?.toString().charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center sm:mt-0 sm:ml-6 sm:text-left">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
