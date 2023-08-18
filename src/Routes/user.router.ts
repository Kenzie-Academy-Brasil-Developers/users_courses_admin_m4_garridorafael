import { Router } from "express";
import {
  checkEmailExists,
  userIdExists,
  validateAdmin,
  validateBody,
  verifyToken,
  verifyUserPermission,
} from "../Middlewares";
import { userController, userCoursesControllers } from "../Controllers";
import { userCreateSchema } from "../Schema";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(userCreateSchema),
  checkEmailExists,
  userController.create
);
userRouter.get(
  "",
  verifyToken,
  validateAdmin,
  verifyUserPermission,
  userController.readAllUsers
);
userRouter.get(
  "/:id/courses",
  verifyToken,
  validateAdmin,
  verifyUserPermission,
  userIdExists,
  userCoursesControllers.readAllUserCourses
);

export default userRouter;
