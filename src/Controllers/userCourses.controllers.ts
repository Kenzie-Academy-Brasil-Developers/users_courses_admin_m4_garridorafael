import { NextFunction, Request, Response } from "express";
import { Course, CourseUser } from "../Interfaces";
import { userCourseServices, userServices } from "../Services";
import { AppError } from "../Errors";

const read = async (req: Request, res: Response): Promise<Response> => {
  try {
    const courseId = req.params.id;
    const users: CourseUser[] = await userCourseServices.readUserCourses(
      courseId
    );

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch course users" });
  }
};

const addUserCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { courseId } = req.params;
    const userId: string = res.locals.decoded.sub;

    const message: string = await userCourseServices.addUserCourse(
      courseId,
      userId
    );

    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const readAllUserCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const courses: Course[] = await userServices.readAll(userId);

    if (courses.length === 0) {
      const error = new AppError("No course found", 404);
      throw error;
    }

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const deleteUserCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseId = req.params.id;
    await userCourseServices.deleteUserCourse(courseId);

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to deactivate user course" });
  }
};

export default { read, addUserCourse, readAllUserCourses, deleteUserCourse };
