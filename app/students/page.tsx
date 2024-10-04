import { db } from "@/lib/db";
import { TableDemo } from "./student-list";
import StudentForm from "./student-form";

export default async function StudentsPage() {
  const students = await db.student.findMany({
    include: {
      class: {
        include: {
          teacher: true,
        },
      },
    },
  });

  console.log(students);
  return (
    <div>
      <StudentForm />
      <div className="container mx-auto py-20 px-20">
        <h1 className="text-2xl font-bold pb-2">Students Data</h1>
        <TableDemo
          students={students.map((student) => ({
            ...student,
            class: {
              ...student.class,
              teacher: student.class.teacher || { id: "", name: "" },
            },
          }))}
        />
      </div>
    </div>
  );
}
