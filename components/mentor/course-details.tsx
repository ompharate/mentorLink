import { Badge } from "@/components/ui/badge";

interface Course {
  title: string;
  description: string;
  instructor: string;
  duration: string;
  mentorId: string;
  level: string;
  tags: string[];
  keyPoints: string[];
  
}

export function CourseDetails({ course }: { course: Course }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        {course.tags.map((tag) => (
          <Badge variant="secondary" className="text-sm">
            {tag}
          </Badge>
        ))}
        <Badge variant="secondary" className="text-sm">
          By {course.instructor}
        </Badge>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course.keyPoints.map((topic, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Course content</h2>
        <pre className="text-xl text-muted-foreground text-wrap">{course.description}</pre>
      </div>
    </div>
  );
}
