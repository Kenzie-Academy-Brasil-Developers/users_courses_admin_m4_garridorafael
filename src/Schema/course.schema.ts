import { z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15).nonempty({ message: "Required" }),
  description: z
    .string()
    .nonempty({ message: "Expected string, received number" }),
});

const courseCreateSchema = courseSchema.omit({ id: true });
const courseReadSchema = courseSchema.array();

export { courseSchema, courseCreateSchema, courseReadSchema };
