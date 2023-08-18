import { NextFunction, Request, Response } from "express";
import { User, UserResult } from "../Interfaces";
import { client } from "../database";
import { AppError } from "../Errors";
import { z } from "zod";

const checkEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  const queryResult: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [email]
  );

  if (queryResult.rowCount > 0) {
    const error = new AppError("Email already registered", 409);
    res.status(error.status).json({ message: error.message });
    return;
  }

  const foundUserEmail: User = queryResult.rows[0];
  res.locals = { ...res.locals, foundUserEmail };

  return next();
};

const userIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1;',
    [id]
  );

  if (!queryResult.rowCount) {
    const error = new AppError("User not found.", 404);
    res.status(error.status).json({ message: error.message });
    return;
  }

  const foundUser: User = queryResult.rows[0];
  res.locals = { ...res.locals, foundUser };

  return next();
};

const validateBody =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string[]> = {};

        error.issues.forEach((issue) => {
          const field = issue.path[0];
          const message = issue.message;

          if (!formattedErrors[field]) {
            formattedErrors[field] = [];
          }

          formattedErrors[field].push(message);
        });

        const filteredErrors = {
          name: formattedErrors.name,
          email: formattedErrors.email,
          password: formattedErrors.password,
        };
        res.status(400).json(filteredErrors);
      } else {
        next(error);
      }
    }
  };

export { checkEmailExists, userIdExists, validateBody };
