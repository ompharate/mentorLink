import { CustomSession, options } from "@/app/api/auth/[...nextauth]/options";
import MeetingCard from "@/components/chat/Card";
import Chat from "@/components/chat/Chat";
import SendButton from "@/components/chat/SendButton";
import { getServerSession } from "next-auth";
type tParams = Promise<{ id: string }>;
export default async function ChatWithCard(props: { params: tParams }) {
  const params = await props.params;
  const id = params.id;
  const session: CustomSession | null = await getServerSession(options);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="flex flex-col flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-md p-4">
          <Chat userId={session?.user?.id!} />
        </div>
        <div className="sticky bottom-0 bg-gray-100 py-4">
          <SendButton
            userId={session?.user?.id!}
            partnerId={id}
            name={session?.user?.name!}
            image={session?.user?.image!}
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 p-4 md:p-6">
        <MeetingCard
          partnerId={id}
          name={session?.user?.name!}
          image={session?.user?.image!}
          userId={session?.user?.id!}
        />
      </div>
    </div>
  );
}
