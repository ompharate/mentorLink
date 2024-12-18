import { SecondaryNavbar } from "../../components/mentor/secondary-navbar";
import { Sidebar } from "../../components/mentor/sidebar";
import { TeacherGrid } from "../../components/mentor/teacher-grid";
import { getServerSession } from "next-auth";
import { CustomSession, options } from "../api/auth/[...nextauth]/options";

export default async function MentorPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const session: CustomSession | null = await getServerSession(options);
  const query = await searchParams;
  return (
    <div className="min-h-screen flex flex-col">
      <SecondaryNavbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {session?.user?.name} - Find Your Perfect Mentor
          </h1>
          <TeacherGrid user={session?.user!} query={query}/>
        </main>
      </div>
    </div>
  );
}
