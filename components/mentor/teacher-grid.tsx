"use client"
import { TeacherCard } from "./teacher-card";
import { motion } from "framer-motion";
const teachers = [
  {
    id: 1,
    name: "John Doe",
    expertise: "JavaScript",
    rating: 4.8,
    hourlyRate: 50,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "UX Design",
    rating: 4.9,
    hourlyRate: 60,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Bob Johnson",
    expertise: "Python",
    rating: 4.7,
    hourlyRate: 45,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Alice Brown",
    expertise: "Digital Marketing",
    rating: 4.6,
    hourlyRate: 55,
    avatarUrl: "/placeholder.svg?height=50&width=50",
  },
];

export function TeacherGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 100,
      }}
      transition={{
        duration: 1,
      }}
    >
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} {...teacher} />
      ))}
    </motion.div>
  );
}
