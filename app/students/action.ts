"use server";

import { db } from "@/lib/db";
import { studentSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStudent(prevState: unknown, formData: FormData) {
  const validatedFields = studentSchema.safeParse({
    name: formData.get("name"),
    class: formData.get("class"),
  });

  console.log(formData);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }

  const checkClass = await db.class.findFirst({
    where: {
      name: {
        equals: validatedFields.data.class,
      },
    },
  });

  if (!checkClass) {
    return { message: "Class not found" };
  }

  const checkStudent = await db.student.findFirst({
    where: {
      name: {
        equals: validatedFields.data.name,
      },
    },
  });

  if (checkStudent) {
    return { message: "Student already exists" };
  }

  const data = await db.student.create({
    data: {
      name: validatedFields.data.name,
      classId: checkClass.id,
    },
  });

  console.log(data);

  revalidatePath("/students");
}

export async function updateStudent(prevState: unknown, formData: FormData) {
  const validatedFields = studentSchema.safeParse({
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    class: formData.get("class") as string,
  });

  console.log(formData);

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }

  const studentId = validatedFields.data.id;

  const student = await db.student.findUnique({
    where: { id: studentId },
    include: { class: true },
  });

  if (!student) {
    return {
      message: "Student not found",
    };
  }

  const checkClass = await db.class.findFirst({
    where: {
      name: {
        equals: validatedFields.data.class,
      },
    },
  });

  if (!checkClass) {
    return { message: "Class not found" };
  }

  const updatedData = {
    name: validatedFields.data.name,
    classId: checkClass.id,
  };

  const updatedStudent = await db.student.update({
    where: {
      id: studentId,
    },
    data: updatedData,
  });

  revalidatePath("/students");
  redirect("/students");

  return {
    message: "Student updated successfully",
    student: updatedStudent,
  };
}

export async function deleteStudent(id: string) {
  const studentId = id;

  const student = await db.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    return {
      message: "Student not found",
    };
  }

  await db.student.delete({
    where: { id: studentId },
  });

  revalidatePath("/students");

  return {
    message: "Student deleted successfully",
  };
}
