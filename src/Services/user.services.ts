import format from "pg-format";
import { client } from "../database";
import {
  Course,
  UserCreate,
  UserRead,
  UserResult,
  UserReturn,
} from "../Interfaces";
import { hash } from "bcryptjs";
import { userReturnSchema } from "../Schema";
import { AppError } from "../Errors";
import { QueryResult } from "pg";

const createUser = async (payload: UserCreate): Promise<UserReturn> => {
  const hashedPassword = await hash(String(payload.password), 10);
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult = await client.query(queryFormat);

  if (queryResult.rows.length > 0) {
    return userReturnSchema.parse(queryResult.rows[0]);
  } else {
    throw new AppError("Error creating user.", 500);
  }
};

const readAllUsers = async (): Promise<UserRead> => {
  const query: string = 'SELECT id, name, email, admin FROM "users";';
  const queryResult: UserResult = await client.query(query);

  return queryResult.rows;
};

const readAll = async (userId: string): Promise<Course[]> => {
  const query: string = `
    SELECT c."id" "courseId", c."name" "courseName", c."description" "courseDescription", uc."active" "userActiveInCourse", u."id" "userId",u."name" "userName"
    FROM "courses" c
    INNER JOIN "userCourses" uc ON c."id" = uc."courseId"
    INNER JOIN "users" u ON uc."userId" = u."id"
    WHERE uc."userId" = $1;
  `;

  const queryResult: QueryResult<Course> = await client.query(query, [userId]);

  return queryResult.rows;
};

export default { createUser, readAll, readAllUsers };
