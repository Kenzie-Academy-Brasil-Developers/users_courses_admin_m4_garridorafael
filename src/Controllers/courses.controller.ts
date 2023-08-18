import { Request, Response } from "express";
import { CourseRead, CourseReturn } from "../Interfaces";
import { courseServices } from "../Services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: CourseReturn = await courseServices.createCourse(req.body);
  return res.status(201).json(user);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
  const courses: CourseRead = await courseServices.readAll();
  return res.status(200).json(courses);
};

export default { create, readAll };
