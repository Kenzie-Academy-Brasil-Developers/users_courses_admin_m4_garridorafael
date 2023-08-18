import { NextFunction, Request, Response } from "express";
import { AppError } from "../Errors";
import { verify } from "jsonwebtoken";
import { z } from "zod";

const verifyUserPermission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId } = req.params;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (userId !== sub) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) throw new AppError("Missing bearer token", 401);

  const token: string = authorization.split(" ")[1];
  const decoded = verify(token, process.env.SECRET_KEY!);

  res.locals = { ...res.locals, decoded };

  return next();
};

const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals.decoded;
  if (!admin) throw new AppError("Insufficient permission", 403);

  return next();
};

const validateBodyCourse =
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
          description: formattedErrors.description,
        };
        res.status(400).json(filteredErrors);
      } else {
        next(error);
      }
    }
  };

export { verifyUserPermission, verifyToken, validateAdmin, validateBodyCourse };
