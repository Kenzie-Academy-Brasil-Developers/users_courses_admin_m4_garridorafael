import { handleErrors } from "./handleError.middleware";
import {
  checkEmailExists,
  userIdExists,
  validateBody,
} from "./user.middleware";
import {
  verifyToken,
  verifyUserPermission,
  validateAdmin,
  validateBodyCourse,
} from "./courses.middleware";
import {
  validateUserIdExists,
  validateCourseIdExists,
} from "./userCourse.middleware";

export {
  handleErrors,
  checkEmailExists,
  userIdExists,
  validateBody,
  verifyToken,
  verifyUserPermission,
  validateAdmin,
  validateBodyCourse,
  validateUserIdExists,
  validateCourseIdExists,
};
