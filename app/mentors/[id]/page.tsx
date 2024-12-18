import { CourseDetails } from "@/components/mentor/course-details";
import { FloatingCard } from "@/components/mentor/floating-card";
import { fetchMentorId } from "@/lib/api";

export default async function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const mentorId = await params.id;
  const mentorDetails = await fetchMentorId(mentorId);
  console.log("->", mentorDetails);
  const course = {
    title: mentorDetails.title,
    description: mentorDetails.description,
    instructor: mentorDetails.name,
    duration: "10 hours",
    level: "Advanced",
    price: mentorDetails.hourlyRate,
    originalPrice: 199.99,
    enrolledStudents: 1234,
    rating: 4.8,
    topics: [
      "Advanced React Hooks",
      "Server Components",
      "Next.js App Router",
      "API Routes and Middleware",
      "Performance Optimization",
      "Testing and Deployment",
    ],
    syllabus: [
      {
        title: "Introduction to Advanced React",
        description: "Overview of modern React features and best practices.",
      },
      {
        title: "Deep Dive into Hooks",
        description:
          "Explore advanced use cases for React Hooks and custom hook creation.",
      },
      {
        title: "Server Components in Next.js",
        description:
          "Learn how to leverage server components for improved performance.",
      },
      {
        title: "Routing with Next.js App Router",
        description: "Master the new file-based routing system in Next.js.",
      },
      {
        title: "Building and Optimizing API Routes",
        description: "Create efficient API routes and implement middleware.",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
