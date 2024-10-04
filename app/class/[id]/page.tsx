import { db } from "@/lib/db";
import CreateClassForm from "../class-form";

export default async function ClassPage({
  params,
}: {
  params: { id: string };
}) {
  const classes = await db.class.findFirst({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <CreateClassForm
        update
        updateData={{
          id: params.id,
          name: classes?.name || "",
        }}
      />
    </div>
  );
}
