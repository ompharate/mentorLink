import VideoCall from "@/components/video/VideoCall";
type tParams = Promise<{ slug: string[] }>;
export const dynamic = 'force-dynamic'
export default async function Page(props: { params: tParams }) {
  const { slug } = await props.params;
  const roomName = slug[0];
  const name = slug[1];
  return <VideoCall roomName={roomName} userName={name} />;
}
