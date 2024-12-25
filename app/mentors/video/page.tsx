import VideoCall from "@/components/video/VideoCall";
type tParams = Promise<{
  name: string;
  roomName: string;
}>;
export const dynamic = "force-dynamic";
export default async function Page(props: { searchParams: tParams }) {
  const slug = await props.searchParams;
  console.log(slug);
  const roomName = slug.name;
  const name = slug.roomName;

  return <VideoCall roomName={roomName} userName={name} />;
}
