import { Request, Response } from "express";
import { Course, UserRead, UserReturn } from "../Interfaces";
import { userServices } from "../Services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createUser(req.body);
  return res.status(201).json(user);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id;

  try {
    const courses: Course[] = await userServices.readAll(userId);
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: "Failed to list user courses" });
  }
};

const readAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const clients: UserRead = await userServices.readAllUsers();
  return res.status(200).json(clients);
};

export default { create, readAll, readAllUsers };
