import { QueryResult } from "pg";
import { CourseUser } from "../Interfaces";
import { client } from "../database";
import { AppError } from "../Errors";

const addUserCourse = async (
  courseId: string,
  userId: string
): Promise<string> => {
  try {
    const existingQuery: QueryResult = await client.query(
      'SELECT * FROM "userCourses" WHERE "userId" = $1 AND "courseId" = $2;',
      [userId, courseId]
    );

    if (existingQuery.rowCount !== 0) {
      throw new AppError("User already registered in this course", 409);
    }
    await client.query(
      'INSERT INTO "userCourses" ("userId", "courseId", "active") VALUES ($1, $2, true);',
      [userId, courseId]
    );
    return "User successfully vinculed to course";
  } catch (error) {
    throw new AppError("Failed to vinculed user in course", 500);
  }
};

const readUserCourses = async (courseId: string): Promise<CourseUser[]> => {
  const query: string = `
  SELECT u."id" "userId", u."name" "userName", c."id" "courseId", c."name" "courseName", c."description" "courseDescription", uc."active" "userActiveInCourse"
  FROM "users" u
  INNER JOIN "userCourses" uc ON u."id" = uc."userId"
  INNER JOIN "courses" c ON uc."courseId" = c."id"
  WHERE uc."courseId" = $1;
`;

  const queryResult: QueryResult<CourseUser> = await client.query(query, [
    courseId,
  ]);

  return queryResult.rows;
};

const deleteUserCourse = async (developerId: string): Promise<void> => {
  const queryString: string = `
    UPDATE "userCourses" SET "active" = false WHERE id = $1;
    `;

  await client.query(queryString, [developerId]);
};

export default { addUserCourse, readUserCourses, deleteUserCourse };
