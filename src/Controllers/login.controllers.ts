import { Request, Response } from "express";
import { loginReturn } from "../Interfaces";
import { loginServices } from "../Services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token: loginReturn = await loginServices.create(req.body);
  return res.status(200).json(token);
};

export default { create };
