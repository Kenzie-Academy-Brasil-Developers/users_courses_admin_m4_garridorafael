import { QueryResult } from "pg";
import { z } from "zod";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
} from "../Schema";

type User = z.infer<typeof userSchema>;

type UserResult = QueryResult<User>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserUpdate = Partial<UserCreate>;

export { User, UserResult, UserCreate, UserRead, UserUpdate, UserReturn };
