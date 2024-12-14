import { TeacherCard } from "./teacher-card";

export function TeacherGrid() {

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      // initial={{
      //   opacity: 0,
      // }}
      // animate={{
      //   opacity: 100,
      // }}
      // transition={{
      //   duration: 1,
      // }}
    >
      <TeacherCard />

    </div>
  );
}
