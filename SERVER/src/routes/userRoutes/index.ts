import AppRouter from "../../utils/AppRouter";

import {
  createUser,
  getMe,
  googleAuthHandler,
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
userRoutes.get(userRoutesPath.googleAuth, googleAuthHandler);
export default userRoutes;
