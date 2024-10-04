import { z } from "zod";

export const studentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  class: z.string().min(1, "Class is required"),
});

export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Class name is required"),
});

export const teacherSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  class: z.string().min(1, "Class is required"),
});

export type Student = z.infer<typeof studentSchema>;
export type Class = z.infer<typeof classSchema>;
export type Teacher = z.infer<typeof teacherSchema>;
