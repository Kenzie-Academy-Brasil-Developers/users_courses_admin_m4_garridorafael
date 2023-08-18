import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../Errors";
import { User, UserResult, loginCreate, loginReturn } from "../Interfaces";
import { client } from "../database";

const create = async (payload: loginCreate): Promise<loginReturn> => {
  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [payload.email]
  );

  if (query.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user: User = query.rows[0];
  const samePassword: boolean = await compare(payload.password, user.password);

  if (!samePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { name: user.name, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

export default { create };
