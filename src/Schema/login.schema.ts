import { userSchema } from "./user.schema";

const loginCreate = userSchema.pick({
  email: true,
  password: true,
});

export { loginCreate };
