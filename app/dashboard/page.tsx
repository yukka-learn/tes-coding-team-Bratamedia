import { db } from "@/lib/db";
import { LogoutButton } from "@/components/btn-logout";
import DashboardList from "./dashboard-list";

export default async function DashboardPage() {
  const students = await getStudents();
  const filteredStudents = students.map((student) => ({
    ...student,
    class: {
      ...student.class,
      teacher: student.class.teacher || { id: "", name: "" },
    },
  }));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <LogoutButton />
      <DashboardList students={filteredStudents} />
    </div>
  );
}

async function getStudents() {
  const students = await db.student.findMany({
    include: {
      class: {
        include: {
          teacher: true,
        },
      },
    },
  });
  return students;
}
