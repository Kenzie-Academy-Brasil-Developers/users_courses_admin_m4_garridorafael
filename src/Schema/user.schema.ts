import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }).max(50),
  password: z.string().max(120).nonempty({ message: "Password is required" }),
  admin: z.boolean(),
});

const userCreateSchema = userSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({ password: true });
const userReadSchema = userReturnSchema.array();

export { userSchema, userCreateSchema, userReturnSchema, userReadSchema };
