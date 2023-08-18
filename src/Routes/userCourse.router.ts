import { Router } from "express";
import {
  validateAdmin,
  verifyToken,
  verifyUserPermission,
} from "../Middlewares";
import { userCoursesControllers } from "../Controllers";
import { validateCourseIdExists, validateUserIdExists } from "../Middlewares";

const userCourseRouter: Router = Router();

userCourseRouter.post(
  "/:courseId/users/:userId",
  verifyToken,
  verifyUserPermission,
  validateAdmin,
  validateUserIdExists,
  validateCourseIdExists,
  userCoursesControllers.addUserCourse
);
userCourseRouter.get(
  "/:id/users",
  verifyToken,
  validateAdmin,
  verifyUserPermission,
  userCoursesControllers.read
);
userCourseRouter.delete(
  "/:courseId/users/:userId",
  verifyToken,
  validateAdmin,
  verifyUserPermission,
  validateUserIdExists,
  validateCourseIdExists,
  userCoursesControllers.deleteUserCourse
);

export default userCourseRouter;
