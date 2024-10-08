import TeacherListTable from "./teacher-list";
import TeacherForm from "./teacher-form";
import { db } from "@/lib/db";

export default async function TeacherPage() {
  const teachers = await db.teacher.findMany({
    include: {
      class: {
        include: {
          students: true,
        },
      },
    },
  });

  return (
    <div>
      <TeacherForm />
      <div className="container mx-auto py-20 px-20">
        <h1 className="text-2xl font-bold pb-2">Teachers Data</h1>
        <TeacherListTable teachers={teachers} />
      </div>
    </div>
  );
}
