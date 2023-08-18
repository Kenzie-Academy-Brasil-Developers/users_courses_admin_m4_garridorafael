import format from "pg-format";
import { Course, CourseCreate, CourseRead, CourseResult } from "../Interfaces";
import { client } from "../database";

const createCourse = async (payload: CourseCreate): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: CourseResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const readAll = async (): Promise<CourseRead> => {
  const query: string = 'SELECT * FROM "courses";';
  const queryResult: CourseResult = await client.query(query);

  return queryResult.rows;
};

export default { createCourse, readAll };
