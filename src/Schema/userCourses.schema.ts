import { z } from "zod";

const userCoursesSchema = z.object({
  id: z.number().positive(),
  active: z.boolean(),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

const createUserCourse = userCoursesSchema.omit({
  id: true,
});

const readUserCourse = userCoursesSchema.array();

export { userCoursesSchema, createUserCourse, readUserCourse };
