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
    <div className="py-10">
      <StudentForm />
      <div>
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
