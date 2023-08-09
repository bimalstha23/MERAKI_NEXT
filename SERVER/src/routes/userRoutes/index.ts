import { Request, Response } from "express";
import AppRouter from "../../utils/AppRouter";
import {
  createUser,
  getMe,
  loginUser,
  refreshWebToken,
} from "../../Controllers/userControl";
import { userRoutesPath } from "../../constants/Api";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { requireAuth } from "../../middlewares/authMiddlewares";

const userRoutes = AppRouter.getInstance();

userRoutes.post(userRoutesPath.createUser, createUser);
userRoutes.post(userRoutesPath.loginUser, loginUser);
userRoutes.get(userRoutesPath.refresh, refreshWebToken);
userRoutes.get(userRoutesPath.getme, deserializeUser, requireAuth, getMe);
export default userRoutes;
