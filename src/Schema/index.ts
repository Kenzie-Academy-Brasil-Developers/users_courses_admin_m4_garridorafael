import {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
} from "./user.schema";
import { loginCreate } from "./login.schema";
import {
  courseSchema,
  courseCreateSchema,
  courseReadSchema,
} from "./course.schema";
import {
  userCoursesSchema,
  createUserCourse,
  readUserCourse,
} from "./userCourses.schema";

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userReadSchema,
  loginCreate,
  courseSchema,
  courseCreateSchema,
  courseReadSchema,
  userCoursesSchema,
  createUserCourse,
  readUserCourse,
};
