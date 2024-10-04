"use server";

import { db } from "@/lib/db";
import { classSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createClass(prevState: unknown, formData: FormData) {
  const validatedFields = classSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors[0].message,
    };
  }

  // Check if class already exists
  const checkClass = await db.class.findFirst({
    where: {
      name: {
        equals: validatedFields.data.name,
      },
    },
  });

  if (checkClass) {
    return { message: "Class already exists" };
  }

  await db.class.create({
    data: {
      name: validatedFields.data.name,
    },
  });

  revalidatePath("/class");

  return {
    message: "Class created successfully",
  };
}

export async function updateClass(prevState: unknown, formData: FormData) {
  const validatedFields = classSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
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
        equals: validatedFields.data.name,
      },
    },
  });

  if (checkClass) {
    return { message: "Class already exists" };
  }

  await db.class.update({
    where: {
      id: validatedFields.data.id,
    },
    data: {
      name: validatedFields.data.name,
    },
  });

  revalidatePath("/class");

  redirect("/class");

  return {
    message: "Class updated successfully",
  };
}

export async function deleteClass(id: string) {
  const checkUser = await db.class.findFirst({
    where: {
      id: id,
    },
  });

  if (!checkUser) {
    return {
      message: "Class does not exist",
    };
  }

  await db.class.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/class");

  return {
    message: "Class deleted successfully",
  };
}
