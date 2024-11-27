import { MainNavbar } from "../../components/mentor/main-navbar";
import { SecondaryNavbar } from "../../components/mentor/secondary-navbar";
import { Sidebar } from "../../components/mentor/sidebar";
import { TeacherGrid } from "../../components/mentor/teacher-grid";


export default function MentorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <SecondaryNavbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Mentor</h1>
          <TeacherGrid />
        </main>
      </div>
    </div>
  )
}

