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
      <div className="container mx-auto py-20 px-20">
        <h1 className="text-2xl font-bold pb-2">Class Data</h1>
        <ClassTable classess={classess} />
      </div>
    </div>
  );
}
