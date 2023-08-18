import "express-async-errors";
import express, { Application, json } from "express";
import "dotenv/config";
import { handleErrors } from "./Middlewares";
import {
  courseRouter,
  loginRouter,
  userCourseRouter,
  userRouter,
} from "./Routes";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/courses", courseRouter, userCourseRouter);
app.use(handleErrors);

export default app;
