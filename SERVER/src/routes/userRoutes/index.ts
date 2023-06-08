import { Request, Response } from "express";
import AppRouter from "../../utils/AppRouter";
import { createUser } from "../../Controllers/userControl";

const userRoutes = AppRouter.getInstance();

userRoutes.get("/createuser", createUser);

export default userRoutes;
