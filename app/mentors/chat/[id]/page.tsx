import { CustomSession, options } from "@/app/api/auth/[...nextauth]/options";
import Chat from "@/components/chat/Chat";
import SendButton from "@/components/chat/SendButton";
import { getServerSession } from "next-auth";

export default async function ChatWithCard({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  const session: CustomSession | null = await getServerSession(options);
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <Chat/>
      <SendButton userId={session?.user!.id!} partnerId={id} />
    </div>
  );
}
