import { Router } from "express";
import { loginCreate } from "../Schema";
import { loginControllers } from "../Controllers";
import { validateBody } from "../Middlewares";

const loginRouter: Router = Router();

loginRouter.post("", validateBody(loginCreate), loginControllers.create);

export default loginRouter;
