import { z } from "zod";

const studentsSchemaFetch = z.object({
  id: z.string(),
  name: z.string(),
  class: z.object({
    id: z.string(),
    name: z.string(),
    teacher: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
});

const teacherSchemaFetch = z.object({
  id: z.string(),
  name: z.string(),
  class: z.object({
    id: z.string(),
    name: z.string(),
    students: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  }),
});

const classSchema = z.object({
  teacher: z.object({
    name: z.string(),
    id: z.string(),
    classId: z.string(),
  }),
  students: z.array(
    z.object({
      name: z.string(),
      id: z.string(),
      classId: z.string(),
    })
  ),
  name: z.string(),
  id: z.string(),
});

export type StudentFetch = z.infer<typeof studentsSchemaFetch>;
export type TeacherFetch = z.infer<typeof teacherSchemaFetch>;
export type ClassFetch = z.infer<typeof classSchema>;
