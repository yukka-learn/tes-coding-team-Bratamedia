import { db } from "@/lib/db";
import CreateClassForm from "./class-form";
import ClassTable from "./class-list";

export default async function ClassPage() {
  const classess = await db.class
    .findMany({
      include: {
        students: true,
        teacher: true,
      },
    })
    .then((classes) =>
      classes.map((cls) => ({
        ...cls,
        teacher: cls.teacher || { id: "", name: "", classId: "" },
      }))
    );

  return (
    <div>
      <CreateClassForm />
      <ClassTable classess={classess} />
    </div>
  );
}
