import { db } from "@/lib/db";
import TeacherForm from "../teacher-form";

export default async function TeacherEditPage({
  params,
}: {
  params: { id: string };
}) {
  const teacher = await db.teacher.findFirst({
    where: {
      id: params.id,
    },
    include: {
      class: true,
    },
  });

  return (
    <div>
      {teacher && (
        <TeacherForm
          update
          updateData={{
            id: params.id,
            name: teacher.name,
            classes: teacher.class.name,
          }}
        />
      )}
    </div>
  );
}
