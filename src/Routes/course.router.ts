import { Router } from "express";
import { coursesController } from "../Controllers";
import { validateAdmin, validateBodyCourse, verifyToken } from "../Middlewares";
import { courseCreateSchema } from "../Schema";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  verifyToken,
  validateAdmin,
  validateBodyCourse(courseCreateSchema),
  coursesController.create
);
courseRouter.get("", coursesController.readAll);

export default courseRouter;
