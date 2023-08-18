import { QueryResult } from "pg";
import { z } from "zod";
import { courseCreateSchema, courseReadSchema, courseSchema } from "../Schema";

type Course = z.infer<typeof courseSchema>;

type CourseResult = QueryResult<Course>;
type CourseReturn = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof courseCreateSchema>;
type CourseRead = z.infer<typeof courseReadSchema>;

export { Course, CourseResult, CourseReturn, CourseCreate, CourseRead };
