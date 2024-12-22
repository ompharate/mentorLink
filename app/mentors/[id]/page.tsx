import { CourseDetails } from "@/components/mentor/course-details";
import { FloatingCard } from "@/components/mentor/floating-card";
import { fetchMentorId } from "@/lib/api";

export default async function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const mentorDetails = await fetchMentorId(id);
  console.log("->", mentorDetails);
  const course = {
    title: mentorDetails.title,
    description: mentorDetails.description,
    keyPoints: mentorDetails.keyPoints,
    tags: mentorDetails.tags,
    instructor: mentorDetails.name,
    mentorId: id,
    duration: "10 hours",
    level: "Advanced",
    price: mentorDetails.hourlyRate,
    originalPrice: mentorDetails.hourlyRate + 100,
    enrolledStudents: 1234,
    rating: 4.8,
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CourseDetails course={course} />
        </div>
        <div className="lg:w-1/3">
          <FloatingCard course={course} />
        </div>
      </div>
    </div>
  );
}
