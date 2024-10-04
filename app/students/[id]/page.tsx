import { db } from "@/lib/db";
import StudentFormComponentDymanic from "../student-form";

export default async function StudentEditPage({
  params,
}: {
  params: { id: string };
}) {
  const student = await db.student.findFirst({
    where: {
      id: params.id,
    },
    include: {
      class: true,
    },
  });

  return (
    <div>
      {student && (
        <StudentFormComponentDymanic
          update
          updateData={{
            id: params.id,
            name: student?.name || "",
            classes: student?.class.name || "",
          }}
        />
      )}
    </div>
  );
}
