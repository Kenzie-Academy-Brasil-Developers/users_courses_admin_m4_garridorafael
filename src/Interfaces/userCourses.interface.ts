import { z } from "zod";
import { createUserCourse, readUserCourse, userCoursesSchema } from "../Schema";
import { QueryResult } from "pg";

type CourseUser = {
  userId: number;
  userName: string;
  courseId: number;
  courseName: string;
  courseDescription: string;
  userActiveInCourse: boolean;
};

type UserCourse = z.infer<typeof userCoursesSchema>;
type UserCourseCreate = z.infer<typeof createUserCourse>;
type userCourseRead = z.infer<typeof readUserCourse>;

type userCourseResult = QueryResult<UserCourse>;

export {
  UserCourse,
  UserCourseCreate,
  userCourseRead,
  userCourseResult,
  CourseUser,
};
