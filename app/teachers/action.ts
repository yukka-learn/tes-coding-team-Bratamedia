"use server";

import { db } from "@/lib/db";
import { teacherSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTeacher(prevState: unknown, formData: FormData) {
  const validatedFields = teacherSchema.safeParse({
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

  // check class only one teacher
  const checkClassTeacher = await db.teacher.findFirst({
    where: {
      classId: {
        equals: checkClass.id,
      },
    },
  });

  if (checkClassTeacher) {
    return { message: "Class already has a teacher" };
  }

  const checkTeacher = await db.teacher.findFirst({
    where: {
      name: {
        equals: validatedFields.data.name,
      },
    },
  });

  if (checkTeacher) {
    return { message: "Teacher already exists" };
  }

  const newTeacher = await db.teacher.create({
    data: {
      name: validatedFields.data.name,
      classId: checkClass.id,
    },
  });

  console.log(newTeacher);

  revalidatePath("/teacher");

  return {
    message: "Teacher created successfully",
  };
}

export async function updateTeacher(prevState: unknown, formData: FormData) {
  
  const validatedFields = teacherSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    class: formData.get("class"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }

  const currentTeacher = await db.teacher.findFirst({
    where: {
      id: validatedFields.data.id,
    },
    include: {
      class: true,
    },
  });

  if (!currentTeacher) {
    return { message: "Teacher not found" };
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

  if (checkClass.id !== currentTeacher.classId) {
    const checkClassTeacher = await db.teacher.findFirst({
      where: {
        classId: {
          equals: checkClass.id,
        },
      },
    });

    if (checkClassTeacher) {
      return { message: "Class already has a teacher" };
    }
  }

  const updateTeacher = await db.teacher.update({
    where: {
      id: validatedFields.data.id,
    },
    data: {
      name: validatedFields.data.name,
      classId: checkClass.id,
    },
  });

  console.log(updateTeacher);

  revalidatePath("/teacher");
  redirect("/teachers");

  return {
    message: "Teacher updated successfully",
  };
}

export async function deleteTeacher(id: string) {
  const teacherId = id;

  const teacher = await db.teacher.findUnique({
    where: { id: teacherId },
  });

  if (!teacher) {
    return {
      message: "Teacher not found",
    };
  }

  await db.teacher.delete({
    where: { id: teacherId },
  });

  revalidatePath("/teachers");

  return {
    message: "Teacher deleted successfully",
  };
}
