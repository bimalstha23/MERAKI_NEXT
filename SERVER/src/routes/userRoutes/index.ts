import { Request, Response } from "express";
import AppRouter from "../../utils/AppRouter";
import { createUser, loginUser } from "../../Controllers/userControl";
import { userRoutesPath } from "../../constants/Api";

const userRoutes = AppRouter.getInstance();

userRoutes.post(userRoutesPath.createUser, createUser);
userRoutes.post(userRoutesPath.loginUser, loginUser);

export default userRoutes;
